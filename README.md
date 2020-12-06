# Issue-management
This is a backend project to have a small demo of issue management. To run the assigment please type these lines in the terminal in the right order:
  
  -npm i
  
  -npm start
  
The APIs run on PORT 3000.

Quick overview about the project:

  In this project you can insert issues and the issues automatically will be assigned to an available agent. Once there is no more available agent the issue will be just stored and will be assigned automatically to an agent when the agent finished his task. It means that anytime that the agent finished the task, another unassigned task will be assign to the agent. If there is no tasks, agent will be available for the next coming task.
  
  This project stores data as JSON files in the 'mock' directory.
  
  In order to use the APIs in the postman you can use this URLs :
    
    -Insert new issue
        *URL: localhost:3000/api/issues
        *METHOD: POST
        *BODY: Must be JSON and the input is like this : { "title":"first issue" , "description" : "Have new problem" }
        *PARAMS: No params requires
        *Description: This method will store an Issue and automatically checks that if there is any available agent, will assign the issue to the agent. If there is not, just stores the isssue.
        
    -Finish the issue resolving
        *URL: localhost:3000/api/agents/taskdone/id
        *METHOD: POST
        *BODY: No body requires
        *PARAMS: The 'id' parameter is the id that stored in 'Task.json' file in the 'mock' directory.
        *Description: Once the URL called, the issue will be finished and the agent will be available to be assigned to another issue. This will work automatically and if there are no more issues, the agent will be free.
        
    -Get agents tasks:
        *URL: localhost:3000/api/agents/agentstask
        *METHOD: GET
        *BODY: No body requires
        *PARAMS: No Params requires
        *Description: This will show that agents are resolving which issue and which agents are free
        
    -Unassigned issues:
        *URL: localhost:3000/api/issues/unassignedissues
        *METHOD: GET
        *BODY: No body requires
        *PARAMS: No Params requires
        *Description: This will show unassigned issues names
