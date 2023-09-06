import React from "react";
import "./HeaderHomePage.scss";
import Button from "../button/Button";
import { BsTrello } from 'react-icons/bs';
import { MdOutlineExitToApp } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { exitUserAction } from "../../store/reducers/usersReducer";
import { BiDownArrow } from 'react-icons/bi';
import UserMenu from "../userMenu/UserMenu";
import AdditionalProfileInfo from "../additionalProfileInfo/AdditionalProfileInfo";

interface HeaderHomePageProps {
    setVisibleModal: (visibleModal: boolean) => void,
    userMenu: boolean,
    setUserMenu: (userMenu: boolean) => void,
    visibleProfileInfo: boolean,
    setVisibleProfileInfo: (visibleProfileInfo: boolean) => void
}


const HeaderHomePage: React.FC<HeaderHomePageProps> = ({ setVisibleModal, userMenu, setUserMenu, visibleProfileInfo, setVisibleProfileInfo }) => {


    const navigate = useNavigate()
    const { users } = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch()

    const exit = () => {
        for (let a of users) {
            if (a.authorization) {
                dispatch(exitUserAction(a))
                console.log(a, "a");
            }
        }
        navigate("/")
    }

    const visibleUserMenu = () => {
        setUserMenu(!userMenu)
        setVisibleProfileInfo(false)
    }

    return (
        <div className="headerHomePageContainer">
            <div className="logo">
                <BsTrello className="icon" />
            </div>
            <h2>Trello</h2>
            <div className="btnHeader" onClick={() => setVisibleModal(true)}>
                <Button buttonName={"Create project"} />
            </div>
            {users.map(user =>
                <div className="nameUser">
                    {user.authorization
                        ? <div className={`user ${userMenu ? "userArrow" : ""}`}>
                            <h4>{user.firstName} {user.lastName}</h4>
                            <BiDownArrow className={`arrow ${userMenu ? "arrowRotate" : ""}`} onClick={() => visibleUserMenu()} onMouseEnter={() => setUserMenu(true)} />
                        </div>
                        : <div></div>
                    }
                </div>
            )}
            {userMenu
                ? <UserMenu visibleProfileInfo={visibleProfileInfo} setVisibleProfileInfo={setVisibleProfileInfo} />
                : <div></div>
            }
            {users.map(user =>
                <div>
                    {user.authorization
                        ? <div>
                            {visibleProfileInfo
                                ? <AdditionalProfileInfo user={user} />
                                : <div></div>
                            }
                          </div>
                        : <div></div>
                    }
                </div>
            )}

            {/* {visibleProfileInfo
                ? <AdditionalProfileInfo users={users} />
                : <div></div>
            } */}
            <MdOutlineExitToApp className="exitIcon" onClick={() => exit()} />
        </div>
    )
}

export default HeaderHomePage;