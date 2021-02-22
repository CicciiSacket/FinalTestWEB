import {ITicket} from './ITicket'

export interface IUser{
    name: string,
    username: string,
    password: string,
    tickets : [],
    token?: string,
    admin: boolean
}