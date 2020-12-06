import express from "express";
import { Agent } from "../../models/Agent";
import * as utils from "../../mock/utils.service";

export const router = express.Router();

interface AgentResponse {
     agent: Agent | null,
     issueId: number
}

router.post('/assigntoagent/:id/:agentId', (req, res) => {
     new Promise((resolve, reject) => {
          try {
               let issueId: number = +req.params.id
               let agentId: number = +req.params.agentId
               let assignedAgent = agentId > 0 ? utils.getAgent(agentId) : utils.getFirstAvailableAgent();

               if(assignedAgent){
                    utils.insertTask(assignedAgent.id, issueId)
               }
               resolve({agent: assignedAgent, issueId})

          } catch (error) {
               reject(error)
          }
     }).then(result => {
          let response = result as AgentResponse
          if(response.agent){
               res.json(`Issue with Id = ${response.issueId} assigned to ${response.agent.name}`)
          } else {
               res.json(`No agent available to be assigned for issue with Id = ${response.issueId} `)
          }
     }).catch(err => res.json(err))
     
})

router.post('/taskdone/:id', (req, res) => {
     let taskId: number = +req.params.id
     let agentId = utils.finishTask(taskId)

     if(agentId > 0){
          res.redirect(307,`/api/issues/assignissue/${agentId}`)
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


