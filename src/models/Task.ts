export interface Task {
     id: number,
     issueId: number,
     agentId: number,
     assignedDate: Date,
     finishedDate?: Date
}
