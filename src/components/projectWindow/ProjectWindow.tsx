import React, { useState } from "react";
import { TProcesses, TProject } from "../../types/typesProjectsReducer";
import "./ProjectWindow.scss";
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from "react-redux";
import { BiWindows } from 'react-icons/bi';
import { BiWindow } from 'react-icons/bi';
import { noProcessesActiveAction, removeProjectsAction } from "../../store/reducers/projectsReducer";
import InfoProject from "../infoProject/InfoProject";
import ProcessWindow from "../processWindow/ProcessWindow";
import TaskExecutor from "../taskExecutor/TaskExecutor";
import UserChoice from "../userChoice/UserChoice";
import { RootState } from "../../store";
import { TUsers } from "../../types/typesUsersReducer";



interface ProjectWindowProps {
    project: TProject,
    currentWindow: number | null,
    setCurrentWindow: (currentWindow: number | null) => void
}

export type DataForm = {
    title: string
}

const ProjectWindow: React.FC<ProjectWindowProps> = ({ project, currentWindow, setCurrentWindow }) => {


    const [sizeWindow, setSizeWindow] = useState<boolean>(false)
    const [visibleUserChoice, setVisibleUserChoice] = useState<boolean>(false)


    const { users } = useSelector((state: RootState) => state.users) as { users: TUsers[] }


    const dispatch = useDispatch()

    const removeProjects = (project: TProject) => {
        dispatch(removeProjectsAction(project))
    }

    const newSizeForClickOnProcess = (process?: TProcesses) => {

        if (currentWindow === project.id) {
            if (process?.is_active) {
                setCurrentWindow(null)
                setSizeWindow(false)
            }
        } else {
            setCurrentWindow(project.id)
            setSizeWindow(true)
        }
    }

    const newSizeForClickonIcon = () => {
        currentWindow === project.id ? setCurrentWindow(null) : setCurrentWindow(project.id)
        setSizeWindow(!sizeWindow)
        dispatch(noProcessesActiveAction(project))
    }

    const projectVisible = () => {
        if (currentWindow === null || currentWindow === project.id) {
            return { opacity: "1" }
        } else {
            return { opacity: "0" }
        }
    }




    return (
        <div style={projectVisible()} className={`projectWindowContainer ${sizeWindow ? "bigWindow" : ""}`} >
            <div className="windowControl">
                {sizeWindow
                    ? <BiWindows className="smallIcon" onClick={() => newSizeForClickonIcon()} />
                    : <BiWindow className="smallIcon" onClick={() => newSizeForClickonIcon()} />
                }
                <RxCross2 className="smallIcon" onClick={() => removeProjects(project)} />
            </div>
            <div className={`windowContant ${visibleUserChoice ? "windowContantOpacity" : ""}`}>
                <InfoProject project={project} newSizeForClickOnProcess={newSizeForClickOnProcess}
                    sizeWindow={sizeWindow} setSizeWindow={setSizeWindow}
                    visibleUserChoice={visibleUserChoice} setVisibleUserChoice={setVisibleUserChoice}
                />
                {project.processes.map(process =>
                    <div className={process.is_active && sizeWindow ? "processBlock" : "processNone"}>
                        {process.is_active
                            ? <ProcessWindow project={project} process={process} />
                            : <div></div>
                        }
                        {process.is_active && users.map(user =>
                            user.executorProcess === process.title
                                ? <TaskExecutor user={user}/>
                                : <div></div>
                        )}
                    </div>

                )}
            </div>
            <div className={`userChoice ${visibleUserChoice ? "" : "userChoiceNone"} ${sizeWindow ? "userChoiceActive" : ""}`}>
                {visibleUserChoice
                    ? <UserChoice visibleUserChoice={visibleUserChoice} setVisibleUserChoice={setVisibleUserChoice} />
                    : <div></div>
                }
            </div>
        </div>
    )
}

export default ProjectWindow;