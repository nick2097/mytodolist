import {ChangeEvent, useState} from "react";


type EditableSpanProps = {
    oldTitle: string;
    updateItem: (newTitle: string) => void;
};

export const EditableSpan = ({oldTitle, updateItem}: EditableSpanProps) => {
    const[editMode, setEditMode] = useState(false);
    const[newTitle,setNewTitle] = useState(oldTitle)

    const activationEditModeHandler = () => {
        setEditMode(!editMode);
        if(editMode) {
            updateItem(newTitle);
        }

    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    return (
        editMode
        ? <input value={newTitle} onChange={changeTitleHandler} onBlur={activationEditModeHandler} autoFocus/>
      : <span onDoubleClick={activationEditModeHandler}>{oldTitle}</span>
    );
}