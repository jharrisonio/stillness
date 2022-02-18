type Task = {
    name: string;
    isComplete: boolean;
}

type TaskIdentifier = number | void;

/**
* Creates a new task and saves it to the database
*
* @param source The details of the task to insert
* @returns The ID of the task after it is saved in the database
*/
const CreateTask = function(source: Task): TaskIdentifier {
    // perform some logic
}