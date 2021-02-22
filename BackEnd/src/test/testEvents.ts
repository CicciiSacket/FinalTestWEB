
const app = require('../app');
import request from 'supertest'
let testIdEvent = ""
let testToken = ""

describe("creo utente per i test",async () => {
    it('new user [201]',(done)=>{//ok
        request(app).post('/users').send({name: "testName", username:'testUsername',password:'testPassword'}).expect(201,done);
    });
    it('login user and set token [200]',async ()=>{//ok
        const {body} = await request(app).post('/users/login').send({username:'testUsername',password:'testPassword'}).expect(201)
        testToken = body
    });
});
describe('create event',()=>{
    it('/success creating event [201]',async ()=>{//ok
        const {body: {id}} = await request(app).post('/events').set("token",`${testToken}`).send({name:"testEvento",type:"music",place:"testPlace",dateTime:"1/1/2000",price:"10"}).expect(201)
        testIdEvent = id
    });
    it('/unsuccess creating event, missing param [400]',async ()=>{//ok
        await request(app).post('/events').set("token",`${testToken}`).send({type:"music",place:"testPlace",dateTime:"1/1/2000",price:"10"}).expect(400)
    });
    it('/unsuccess creating event, price NaN [400]',async ()=>{//ok
        await request(app).post('/events').set("token",`${testToken}`).send({name:"testEvento",type:"music",place:"testPlace",dateTime:"1/1/2000",price:"cento"}).expect(400)
    });
    it('/get created event', (done) => {//ok 
        request(app).get(`/events/${testIdEvent}`).expect(200,done);
    });
    it('/unauth creation', (done)=>{//ok
        request(app).post('/events').set("token",'_').send({name:"testEvento",type:"music",place:"testPlace",dateTime:"1/1/2000",price:"10"}).expect(401,done)
    });
    it('/events [400] wrong date format', (done)=>{//ok
        request(app).post('/events').set("token",`${testToken}`).send({name:"nomeevento",type:"music",place:"placeevento",dateTime:"null",price:"10"}).expect(400,done)
    });
    it('/events [400] wrong type format', (done)=>{//ok 
        request(app).post('/events').set("token",`${testToken}`).send({name:"nomeevento",type:"null",place:"placeevento",dateTime:"1/1/2000",price:"10"}).expect(400,done)
    });
});
describe(" Delete Event", ()=>{
    it('/delete success [201]',(done)=>{//ok
        request(app).delete(`/events/${testIdEvent}`).set("token",`${testToken}`).expect(201,done)
    });
    it('/delete event not found [404]',(done)=>{//ok
        request(app).delete(`/events/${testIdEvent}`).set("token",`${testToken}`).expect(404,done)
    });
    it('/delete unauthorized  [401]',(done)=>{//ok
        request(app).delete(`/events/${testIdEvent}`).set("token","_").expect(401,done)
    });
});
describe("elimino utente test",()=>{
    it('delete success [201]',(done)=>{//ok
        request(app).delete('/users/testUsername').set("token",`${testToken}`).expect(201,done)
    });  
})

