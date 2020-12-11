import request from 'supertest';
import { app } from "../app";

const JSON_TYPE = 'application/json'

describe('Adding new Issue recieve status 307 or 200', () => {
     it('new Issue', async () => {
          const result  = await request(app).post('/api/issues/')
          .send({
               title: "test issue",
               description: "Test new Issue"
          })

          expect(result.status).toEqual(307 || 200)
     })
})

describe('Adding second issue', () => {
     it('new Issue', async () => {
          const result  = await request(app).post('/api/issues/')
          .send({
               title: "test issue 2",
               description: "Test new Issue"
          })

          expect(result.status).toEqual(307 || 200)
     })
})


describe('Create new task', () => {
     it('Post new task to agents router', async () => {
          const result = await request(app).post('/api/agents/assigntoagent/1/0')

          expect(result.status).toEqual(200)
          expect(result.type).toEqual(JSON_TYPE)
     })
})

describe('Assign Agent to Issue', () => {
     it('Assign Agent to Issue', async () => {
          const result = await request(app).post('/api/issues/assignissue/1')

          expect(result.status).toEqual(307 || 200)
     })
})

describe('Fetch unassigned issues', () => {
     it('get unassignedissues', async () => {
          const result = await request(app).get('/api/issues/unassignedissues')

          expect(result.type).toEqual(JSON_TYPE)
     })
})

describe('Task is done', () => {
     it('Post Taskdone', async () => {
          const result = await request(app).post('/api/agents/taskdone/1')
          expect(result.status).toEqual(200)
     })
})

describe('Fetch All agents task', () => {
     it('Get agentstask', async () => {
          const result = await request(app).get('/api/agents/agentstask')
          expect(result.type).toEqual(JSON_TYPE)
     })
})

describe('Fetch undone tasks', () => {
     it('get undone tasks', async () => {
          const result = await request(app).get('/api/agents/tasks')
          expect(result.type).toEqual(JSON_TYPE)
     })
})


