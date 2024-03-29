import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addNewProcessAction, removeProjectTitleAction } from "../../store/reducers/projectsReducer";
import { assignProcessAction } from "../../store/reducers/usersReducer";
import { TProcesses, TProject } from "../../types/typesProjectsReducer";
import { TUsers } from "../../types/typesUsersReducer";
import Button from "../button/Button";
import Input from "../input/Input";
import Process from "../process/Process";
import { DataForm } from "../projectWindow/ProjectWindow";
import "./InfoProject.scss";

interface InfoProjectProps {
    project: TProject,
    newSizeForClickOnProcess: (process: TProcesses) => void,
    sizeWindow: boolean,
    setSizeWindow: (sizeWindow: boolean) => void,
    visibleUserChoice: boolean,
    setVisibleUserChoice: (visibleUserChoice: boolean) => void
}

const InfoProject: React.FC<InfoProjectProps> = ({ project, newSizeForClickOnProcess, sizeWindow, setSizeWindow, visibleUserChoice, setVisibleUserChoice }) => {

    const [titleProject, setTitleProject] = useState<boolean>(true)



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<DataForm>({
        mode: "onChange"
    })

    const dispatch = useDispatch()


    const renameProject = (data: DataForm) => {
        dispatch(removeProjectTitleAction(project, data))
        
        setTitleProject(true)
        reset()
    }
    const addNewProcess = () => {
        const newProcess = {
            id: Date.now(),
            title: "",
            tasks: [],
            is_active: false
        }
        dispatch(addNewProcessAction(project, newProcess))
        reset()
    }

    return (
        <div className="infoProjectContainer">
            <div className="topWindow">
                {titleProject
                    ? <h1 onClick={() => setTitleProject(false)}>{project.title}</h1>
                    : <div className="formNewTitle">
                        <form onSubmit={handleSubmit(renameProject)}>
                            <Input
                                register={register("title", {
                                    required: "Your project name?",
                                    pattern: {
                                        value: /^[a-zA-Z0-9]+$/,
                                        message: "Pleace enter valid project name",
                                    },
                                })}
                            />
                        </form>
                        <Button buttonName={"Cencel"} click={() => setTitleProject(true)} />
                    </div>
                }
            </div>
            <div className="btnNewProcess">
                <Button buttonName={"Add new process"} click={addNewProcess} />
            </div>
            <div className="processesContainer">
                {project.processes.map(process =>
                    <Process process={process} project={project} newSizeForClickOnProcess={newSizeForClickOnProcess}
                        sizeWindow={sizeWindow} setSizeWindow={setSizeWindow}
                        visibleUserChoice={visibleUserChoice} setVisibleUserChoice={setVisibleUserChoice}
                    />
                )}
            </div>
        </div>
    )
}

export default InfoProject;