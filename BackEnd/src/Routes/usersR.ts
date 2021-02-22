import express from 'express' 
import {IUser} from '../Interfaces/IUser'
import { checkTokenHeader, findUserIndex, writeOnJson , readFromJson, newUserValidator, myValidationResult, validateUsername, validateUpdateUsername} from '../middle/middlewere';
import { ITicket } from '../Interfaces/ITicket';
import { v4 as uuidv4 } from 'uuid';
import bluebird  from "bluebird";
export const router = express.Router()
const TokenGenerator = require('uuid-token-generator');
const token = new TokenGenerator()
var users_list = require ('../../users_list.json')
let fs = bluebird.promisifyAll(require('fs'));
router.get('', (_, res) =>{
    res.status(200).json(users_list)
})
router.get('/:username',checkTokenHeader, findUserIndex, async (_, res) =>{
    const readList: any = await readFromJson('users_list.json', res)
    const {usernameIndex} = res.locals
    res.json(readList[usernameIndex])
})
router.put('/:username', findUserIndex,async ({body: {admin}}, res) =>{
    const {usernameIndex} = res.locals
    const readList: any = await readFromJson('users_list.json', res)
    readList[usernameIndex].admin = admin
    writeOnJson('users_list.json',readList,res)
})
router.post('',newUserValidator,myValidationResult,validateUsername,async ({body: {name,username,password,tickets=[],admin}}: any,res: any)=>{
    let user : IUser = {
        name,
        username,
        password,
        tickets,
        admin 
    }
    users_list = users_list.concat(user)
    await fs.writeFileSync('users_list.json', JSON.stringify(users_list, null, 2));
    return res.status(201).json({message:"writed"})
})
router.put('/:username/details',checkTokenHeader,findUserIndex,validateUpdateUsername,newUserValidator[3],myValidationResult,
        async ({body: {name="",username="",password=""}}: any,res: any)=>{
    const {usernameIndex} = res.locals
    const readList: any = await readFromJson('users_list.json', res)
    readList[usernameIndex].name = name == "" ? readList[usernameIndex].name : name
    readList[usernameIndex].username = username == "" ? readList[usernameIndex].username : username
    readList[usernameIndex].password = password == "" ? readList[usernameIndex].password : password
    await fs.writeFileSync('users_list.json', JSON.stringify(readList, null, 2));
    return res.status(201).json({message:"writed"})
})
router.post('/login',async ({body: {username, password}}, res) =>{
    const newtoken = token.generate() 
    const readList = await JSON.parse(fs.readFileSync('users_list.json'))
    const userIndex = readList.findIndex((item: { username: string, password: string }) => 
                        item.username === username && item.password === password)
    if(userIndex == -1) return res.status(404).json("user not found")
    readList[userIndex].token = newtoken
    const new_users_list = JSON.stringify(readList,null, 2);
    await fs.writeFileSync('users_list.json', new_users_list);
    res.status(201).json(newtoken)
})

router.post('/:username/tickets',checkTokenHeader, findUserIndex, async ({body: {eventId}}, res) =>{
    const readEventList = await JSON.parse(fs.readFileSync('events_list.json'))
    const readUserList = await JSON.parse(fs.readFileSync('users_list.json'))
    const event = readEventList.find((item: { id: string }) => item.id == eventId)
    if(!event) return res.status(404).json({message: "event not found"})
    const {usernameIndex} = res.locals
    let newticket: ITicket ={
        id: uuidv4(usernameIndex),
        event
    }
    readUserList[usernameIndex].tickets.push(newticket)
    await writeOnJson('users_list.json',readUserList,res)
})
router.delete('/:username/tickets/:ticketId',checkTokenHeader,findUserIndex, async ({params: {ticketId}}, res) =>{
    const {usernameIndex} = res.locals
    const readList: any = await readFromJson('users_list.json', res)
    const ticket = readList[usernameIndex].tickets.findIndex((item:{ id: any;}) => item.id == ticketId)
    if(ticket === -1) return res.status(404).json({message: "ticket not found"})
    readList[usernameIndex].tickets.splice(ticket,1)
    writeOnJson('users_list.json',readList,res)
})
router.get('/:username/tickets',checkTokenHeader,findUserIndex, async(_, res) =>{
    const readList: any = await readFromJson('users_list.json', res)
    const {usernameIndex} = res.locals
    res.json(readList[usernameIndex].tickets)
})
router.delete('/:username',checkTokenHeader,findUserIndex,(_,res)=>{
    const {usernameIndex} = res.locals
    users_list.splice(usernameIndex,1)
    writeOnJson('users_list.json',users_list,res)
})