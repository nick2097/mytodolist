import React, {useState} from "react";
import {type} from "os";
import {FilterValuesType, TaskType} from "./Todolist";

export type AddItemProps = {
    addItem: (title: string) => void

}

export const AddItemForm = ({addItem}: AddItemProps) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const addItemHandler = () => {
        const newTaskTitle = title.trim();
        if (newTaskTitle === '') {
            setError('Title is required');
        } else if (newTaskTitle.length > 15) {
            setError('Your title is too long');
        } else {
            addItem(newTaskTitle);
            setTitle('');
            setError(null);

        }
    }

    const changeItemTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    }
    const onKeyItemTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItemHandler();
    }
    
    return (
      <div>
          <input
              type={"text"} placeholder={"Write your task..."}
              onChange={changeItemTitleHandler} value={title}
              onKeyDown={onKeyItemTitleHandler}
              className={`${error ? 'task-input-error' : ''} mainUserInput`}
          />
          <button onClick={addItemHandler}>Add Task</button>

          {title.length > 15 && error === null && <div>Max length must be 15 symbols</div>}
          {error && <div className={'task-input-error-message'}>{error}</div>}
      </div>  
    )
}