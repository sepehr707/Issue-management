import express from "express";
import { Agent } from "../../models/Agent";
import * as utils from "../../mock/utils.service";

export const router = express.Router();

interface AgentResponse {
     agent: Agent | null,
     issueId: number
}

router.post('/assigntoagent/:id/:agentId', (req, res) => {
     let issueId: number = +req.params.id
     let agentId: number = +req.params.agentId
     utils.assignToAgent(issueId, agentId,res)
})

router.post('/taskdone/:id', (req, res) => {
     let taskId: number = +req.params.id
     let agentId = utils.finishTask(taskId)

     if(agentId > 0){
          utils.assignIssue(agentId, res)
     } else {
          res.json('Undefined or finished task')
     }
})

router.get('/agentstask', (req, res) => {
     res.json(utils.getAgentsTasks())
})

router.get('/tasks', (req, res) => {
     res.json(utils.readAlltasks().filter(val => !val.finishedDate))
})


