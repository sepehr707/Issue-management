import { Agent } from "../models/Agent";
import { Task } from "../models/Task";
import { Issue } from "../models/Issue";
import fs from "fs";
import path from "path";

var folderName = process.env.MOCK ?? 'mock-test'
var fileAddress = path.join(__dirname, '../../','src', folderName as string)

var agentsFile = 'agents.json'
var tasksFile = 'tasks.json'
var issueFile = 'issues.json'

var agentsAddress = path.join(fileAddress, agentsFile)
var tasksAddress = path.join(fileAddress, tasksFile);
var issuesAddress = path.join(fileAddress, issueFile)


export const insertTask = (agentId: number, issueId: number) => {
     let tasks = readAlltasks()
     
     let task : Task = {
          id: getLastTaskId(tasks),
          agentId: agentId,
          issueId: issueId,
          assignedDate: new Date()
     }

     tasks.push(task)
     writeToTasks(tasks)
}

export const finishTask = (id: number): number => {
     let tasks = readAlltasks()
     let index = tasks.findIndex(val => val.id === id)

     if(index === -1){
          return 0
     }

     if(tasks[index].finishedDate){
          return 0
     }

     tasks[index].finishedDate = new Date()
     writeToTasks(tasks)

     finishIssue(tasks[index].issueId)

     return tasks[index].agentId
}

export const finishIssue = (issueId : number) => {
     let issues = readAllIssues()
     let index = issues.findIndex(val => val.id === issueId)

     if(index > -1){
          issues[index].done = true
     }

     writeToIssues(issues)
}

export const writeToTasks = (tasks: Task[]) => {
     fs.writeFileSync(tasksAddress, JSON.stringify(tasks))
}

export const writeToIssues = (issues: Issue[]) => {
     fs.writeFileSync(issuesAddress,JSON.stringify(issues))
}

export const getFirstAvailableAgent = () : Agent | null => {

     let tasks = readAlltasks()
     console.log(tasks)

     let notAvailableAgents = readAlltasks().filter(val => !val.finishedDate).map(val => val.agentId)

     let availableAgents = readAllAgents().filter(val => !notAvailableAgents.includes(val.id))
     return availableAgents.length > 0 ? availableAgents[0] : null
}

export const readAlltasks = () : Task[] => {
     let tasks = new Array<Task>()
     if(fs.existsSync(tasksAddress)){
          tasks = JSON.parse(fs.readFileSync(tasksAddress, {encoding: 'utf8'}))
     }

     return tasks
}

export const readAllAgents = (): Agent[] => {
     let agents = new Array<Agent>()
     if(fs.existsSync(agentsAddress)){
           agents = JSON.parse(fs.readFileSync(agentsAddress, {encoding: 'utf8'}))
     }

     return agents

}

export const readAllIssues = (): Issue[] => {
     let issues = new Array<Issue>()
     if(fs.existsSync(issuesAddress)){
          issues = JSON.parse(fs.readFileSync(issuesAddress,{encoding: 'utf-8'}))
     }

     return issues
}

export const getAgent = (id: number): Agent | undefined => {
     return readAllAgents().find(val => val.id === id)
}

export const getTask = (id: number): Task | undefined => {
     return readAlltasks().find(val => val.id === id)
}

export const getLastTaskId = (tasks: Task[]): number => {
     return Math.max(...tasks.map(val => val.id), 0) + 1
}

export const insertIssue = (issue: Issue): number => {
     let issues = new Array<Issue>()
     if(fs.existsSync(issuesAddress)){
          issues = JSON.parse(fs.readFileSync(issuesAddress, {encoding: 'utf8'}))
     }

     issue.id = getNewId(issues)

     issues.push(issue)

     writeToIssues(issues)
     return issue.id;
}

// const getunAssignedIssue

export const getNewId = (issues: Issue[]) : number => {
     return Math.max(...issues.map((val) => val.id), 0) + 1
}

export const getFirstUnassignedIssueId = (): number => {
     let taskIssueIds = readAlltasks().map(val => val.issueId)
     
     let issue = readAllIssues().find(val => val.done === false && !taskIssueIds.includes(val.id))

     if(!issue){
          return 0
     }

     return issue.id
}


export const getAgentsTasks = () : string[] => {
     let tasks = readAlltasks().filter(val => !val.finishedDate)
     let agents = readAllAgents()

     let agentsTask = new Array<string>()
     agents.forEach( agent => {
          let taskId = tasks.find(val => val.agentId === agent.id)?.issueId ?? 0

          agentsTask.push(
               taskId > 0 ? `Agent ${agent.name} is resolving task ${taskId}` : `Agent ${agent.name} is free`
          )
     })

     return agentsTask
}

export const getUnassignedIssues = (): string[] => {
     let taskIssueIds = readAlltasks().map(val => val.issueId)
     
     return readAllIssues().filter(val => val.done === false && !taskIssueIds.includes(val.id)).map(val => val.title)


}