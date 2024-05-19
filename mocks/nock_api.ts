import superagent, { Agent } from  "superagent";
import supertest, { Agent as TestAgent } from  "supertest";

import nock from 'nock'

const fn1 = async() => {
    nock.cleanAll();
    nock('http://127.0.0.1:8080')
        .get('/user')
        .reply(200, {
            "name": "Krishna",
            "age": 21,
            "address": "Homeless"
        },
        {
            "Content-Type": "application/json"
        });

        const getReq = await supertest.agent('http://127.0.0.1:8080').get('/user');
        console.log(getReq);
        
}

fn1().then();