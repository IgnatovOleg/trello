import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../../store/reducers/projectsReducer";
import { TProcesses, TProject, TTask } from "../../types/typesProjectsReducer";
import Button from "../button/Button";
import Task from "../task/Task";
import "./ProcessWindow.scss";


interface ProcessWindowProps {
    project: TProject,
    process: TProcesses,
}

const ProcessWindow: React.FC<ProcessWindowProps> = ({ project, process }) => {

    const dispatch = useDispatch()


    const addNewTask = (): void => {
        const newTask: TTask = {
            id: Date.now(),
            title: "",
            visibleTitle: false,
        }
        dispatch(addTaskAction(project, process, newTask))
    }


    return (
        <div className="processWindowContainer">
            <h3>{process.title} tasks</h3>
            <Button buttonName={"Add task"} click={addNewTask} />
            <div className="tasks">
                {process.tasks.map(task => 
                    <Task project={project} process={process} task={task}/>
                    )}
            </div>
        </div>
    )
}

export default ProcessWindow;