import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {type} from "os";
import {AddItemForm, AddItemProps} from "./AddItemForm";


type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();



  /*  const tasks1: TaskType[] = [
        {id: v1(), title: 'Create Web-site with TypeScript', isDone: false},
        {id: v1(), title: 'Learn HTML&CSS and Java Script', isDone: true},
        {id: v1(), title: 'Learn React', isDone: true}
    ]


    const [tasks, setTasks] = useState<TaskType[]>(tasks1);*/
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const addTask = (todolistId: string, newTaskTitle: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
       /* const newTasks = [newTask, ...tasks];
        setTasks(newTasks);*/
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const removeTask = (todolistId: string, taskId: string) => {
       /* const newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks);*/
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t =>t.id!==taskId)})
    }
    const changeStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
       /* const newTasks = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t);
        setTasks(newTasks);*/
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id===taskId ? {...t, isDone: newIsDone} : t)})
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
       /* const currentTodolist = todolists.find(tl => tl.id===todolistId)
        if(currentTodolist) {
            currentTodolist.filter=filter;
            setTodolists([...todolists])
        }*/
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl =>tl.id!==todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
        console.log(tasks)
    }
    React.useEffect(() => {
        console.log(todolists);
    }, [todolists]);

    const updateTask = (todolistId: string, taskID: string, title: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(el =>el.id === taskID
            ? {...el, title}
            : el
            )
        })
    }
    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId
        ? {...tl, title}
            : tl
        ))
    }



    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(tl => {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeFilter={changeFilter}
                        removeTodolist={removeTodolist}
                        filter={tl.filter}
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}

                    />
                })
            }
        </div>
    );
}

export default App;
