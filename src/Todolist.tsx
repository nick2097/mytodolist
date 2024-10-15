import React, {useState} from 'react';
import {type} from "os";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type FilterValuesType = 'all' | 'active' | 'completed';


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type TodolistPropsType = {
    todolistId: string,
    title: string,
    tasks: Array<TaskType>,
    addTask: (todolistId: string, newTaskTitle: string) => void,
    removeTask: (todolistId: string, taskId: string) => void,
    changeStatus: (todolistId: string, taskId: string, newIsDone: boolean) => void,
    changeFilter: (todolistId: string, filter: FilterValuesType) => void,
    removeTodolist: (todolistId: string) => void,
    filter: FilterValuesType,
    updateTask: (todolistId: string, taskId: string, title: string) => void,
    updateTodolistTitle: (todolistId: string, title: string) => void,
}
export const Todolist: React.FC<TodolistPropsType> = ({
                                                          todolistId,
                                                          title,
                                                          tasks,
                                                          addTask,
                                                          removeTask,
                                                          changeStatus,
                                                          removeTodolist,
                                                          updateTask,
                                                          updateTodolistTitle
                                                      }) => {

    const [filter, setFilter] = useState<FilterValuesType>('all')
    /*const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);*/


    const getTasksForTodolist = (allTasks: TaskType[], filter: FilterValuesType) => {
        switch (filter) {
            case 'active':
                return allTasks.filter(t => t.isDone === false);
            case 'completed':
                return allTasks.filter(t => t.isDone === true);
            default:
                return allTasks;
        }
    }
    const tasksForTodolist = getTasksForTodolist(tasks, filter);

    const updateTaskHandler = ( taskId:string,newTitle: string) => {
        updateTask(todolistId,taskId, newTitle);
    }

    const tasksItems = tasks.length ? tasksForTodolist.map(task => {
        const onTaskTitleRemoveHandler = () => {
            removeTask(todolistId, task.id);
        }
        /*const updateTaskHandler = (newTitle: string) => {
            updateTask(todolistId, task.id, newTitle)
        }*/


        return (
            <li className={task.isDone ? 'task-done' : 'task'} key={task.id}>
                <input type={"checkbox"}
                       checked={task.isDone}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeStatus(todolistId, task.id, e.currentTarget.checked)}/>

                {/*<span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>*/}
                <EditableSpan updateItem={(newTitle)=>updateTaskHandler(task.id, newTitle)} oldTitle={task.title}/>
                <button onClick={onTaskTitleRemoveHandler}>X</button>
            </li>
        )
    }) : <div>No tasks</div>
    /*const AddTaskHandler = () => {
        const newTaskTitle = taskTitle.trim();
        if (newTaskTitle === '') {
            setError('Title is required');
        } else if (newTaskTitle.length > 15) {
            setError('Your title is too long');
        } else {
            addTask(todolistId, newTaskTitle);
            setTaskTitle('');
            setError(null);

        }
    }*/
    /*const onTaskTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTaskTitle(e.currentTarget.value);
    }*/
    /* const onKeyTaskTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') AddTaskHandler();
     }*/
    const onTaskStatusFilter = (filter: FilterValuesType) => {
        return () => {
            setFilter(filter);
        }
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title)
    }
    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolistTitle(todolistId, newTitle)
    }

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan updateItem={updateTodolistTitleHandler} oldTitle={title} />
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
                {tasksForTodolist.length === 0 && filter === 'active' &&
                    <div>No active tasks for now</div>}
                {tasksForTodolist.length === 0 && filter === 'completed' &&
                    <div>No completed tasks for now</div>}


                <ul>{tasksItems}</ul>
                <div className={'filterButtons'}>
                    <button
                        className={`${filter === 'all' ? 'filter-btn-active button-extend' : ''}`}
                        onClick={onTaskStatusFilter('all')}>All
                    </button>
                    <button
                        className={`${filter === 'active' ? 'filter-btn-active button-extend' : ''}`}
                        onClick={onTaskStatusFilter('active')}>Active
                    </button>

                    <button
                        className={`${filter === 'completed' ? 'filter-btn-active button-extend' : ''}`}
                        onClick={onTaskStatusFilter('completed')}>Completed
                    </button>
                    .
                </div>
            </div>

        </div>
    );
};

