import { actionTypesUsers, addUser, Iusers, TUsers, usersActionsTypes } from "../../types/typesUsersReducer"

const defaultState: Iusers = {
    users: [
        { id: 1, login: "ignatovoleg", password: "ignatovOleg!", confirmPassword: "ignatovOleg!", firstName: "Oleg", lastName: "Ignatov", middleName: "Volodimirovich", email: "08623.ignatovoleg@gmail.com", phone: "380934352419", authorization: false },
        { id: 2, login: "savchenkoserhiy", password: "savchenkoSerhiy!", confirmPassword: "savchenkoSerhiy!", firstName: "Serhiy", lastName: "Savchenko", middleName: "Anatolievich", email: "08623.ignatovoleg@gmail.com", phone: "38095432830", authorization: false },
        { id: 3, login: "ignatovaVika", password: "цй", confirmPassword: "ignatovaVika!", firstName: "Vika", lastName: "Ignatova", middleName: "Olexandrovna", email: "08623.ignatovoleg@gmail.com", phone: "380934352419", authorization: false },
    ]
}




export const usersReducer = (state = defaultState, action: actionTypesUsers) => {
    switch (action.type) {
        case usersActionsTypes.ADD_USER:
            return {
                ...state, users: [...state.users, action.payload]
            }
        case usersActionsTypes.AUTHORIZATION_USER:
            const currentUserForAuthorization = state.users.findIndex(u => u.id === action.payload.id)
            const newArray = [...state.users]
            newArray[currentUserForAuthorization].authorization = true
            return { ...state, users: newArray }
        case usersActionsTypes.EXIT_USER:
            const currentUserForExit = state.users.findIndex(u => u.id === action.payload.id)
            const newA = [...state.users]
            newA[currentUserForExit].authorization = false
            return { ...state, users: newA}
        default:
            return { ...state }
    }
}

export const addUserAction = (payload: TUsers) => ({ type: usersActionsTypes.ADD_USER, payload })
export const authorizationAction = (payload: TUsers) => ({ type: usersActionsTypes.AUTHORIZATION_USER, payload })
export const exitUserAction = (payload: TUsers) => ({ type: usersActionsTypes.EXIT_USER, payload })