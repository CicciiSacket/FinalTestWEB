import request from 'supertest'
const app = require('../app');
let testToken = ""

describe("Post auth required",async () => {
    it('new user [201]',(done)=>{//ok
        request(app).post('/users').send({name: "testName", username:'testUsername',password:'testPassword'}).expect(201,done);
    });
    it('new user fail',(done)=>{//ok
        request(app).post('/users').send({password:'testPassword'}).expect(400,done);
    });
    it('new username already exist [403]',(done)=>{//ok
        request(app).post('/users').send({name: "testName", username:'testUsername',password:'testPassword'}).expect(400,done);
    });
    it('login user not found[404]',(done)=>{//ok
        request(app).post('/users/login').send({username:'_',password:'_'}).expect(404,done);
    }); 
    it('login user and set token [200]',async ()=>{//ok
        const {body} = await request(app).post('/users/login').send({username:'testUsername',password:'testPassword'}).expect(201)
        testToken = body
    });
    it('user to admin', (done) => {//ok
        request(app).put('/users/testUsername').send({admin:true}).expect(201,done);
    });
    it('buy ticket not found', (done) => {//ok
        request(app).post('/users/testUsername/tickets').set("token", `${testToken}`).send({eventId:"__"}).expect(404,done); 
    });
    it('buy new ticket', (done) => {//ok
        request(app).post('/users/testUsername/tickets').set("token", `${testToken}`).send({eventId:"beda3f20-4321-4cd9-a969-b89c9969149f"}).expect(201,done);
    });
    it('get user details[200]', (done) => {//ok
        request(app).get('/users/testUsername').set("token", `${testToken}`).expect(200,done);
    });
    it('buy ticket invalid token', (done) => {//ok
        request(app).post('/users/pincpall/tickets').set("token", "_").send({eventId:"fc86c927-020b-446a-a329-049bd3b20395"}).expect(401,done);
    });
});
describe('get auth required',()=>{
    it('invalid token user [401]', (done) => {//ok
        request(app).get('/users/testUsername').set("token", "_").expect(401,done);
    });
    
    it('get all users [200]', () => { 
        request(app).get('/users').expect(200)
    });
});

describe("change details and delete",()=>{
    it('change details, username already in use', (done) => {//ok
        request(app).put('/users/testUsername/details').set("token",`${testToken}`).send({name: "newtestName", username:'pincpall',password:'newtestPassword'}).expect(400,done);
    });
    it('change details', (done) => {//ok
        request(app).put('/users/testUsername/details').set("token",`${testToken}`).send({name: "newtestName", username:'NtestUsername',password:'newtestPassword'}).expect(201,done);
    });
    it('/delete invalid token [401]',(done)=>{//ok
        request(app).delete('/users/NtestUsername').set("token","_").expect(401,done)
    });
    it('/delete user not found [404]',(done)=>{//ok
        request(app).delete('/users/_').set("token",`${testToken}`).expect(404,done)
    });
    it('delete success [201]',(done)=>{//ok
        request(app).delete('/users/NtestUsername').set("token",`${testToken}`).expect(201,done)
    });  
    
    
    
})