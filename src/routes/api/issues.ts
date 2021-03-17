import express from "express";
import { Issue } from "../../models/Issue";
import * as utils from "../../mock/utils.service";

export const router = express.Router();

router.post('/', (req, res) => {
     new Promise((resolve, reject) => {
          try {
               let issue: Issue = {
                    id: 0,
                    title: req.body.title,
                    description: req.body.description,
                    createDate: new Date(),
                    done: false
               }
               
               let issueId = utils.insertIssue(issue)

               resolve(issueId)
          } catch (error) {
               reject(error)
          }
     })
     .then(result => utils.assignToAgent(result as number, 0, res))
     .catch(err => res.json(err))
})


router.get('/unassignedissues', (req, res) => {
     res.json(utils.getUnassignedIssues())
})



