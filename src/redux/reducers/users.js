const initialState = {
    users: [
        {
            name: 'Sultan',
            age: 15,
            id: 1,
            isDone: false,
            isImportant: false,
            change: false
        },
        {
            name: 'Amir',
            age: 25,
            id: 2,
            isDone: false,
            isImportant: false,
            change: false
        },
        {
            name: 'Tilek',
            age: 14,
            id: 3,
            isDone: false,
            isImportant: false,
            change: false
        }
    ],
    usersCount : 3
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD' : {
            return {
                ...state,
                users: [...state.users, {
                    name: action.name,
                    age: action.age,
                    id: state.users.length ? state.users[state.users.length - 1].id + 1 : 1
                }],
                usersCount: state.usersCount + 1
            }
        }
        case 'DELETE' : {
            return {
                ...state,
                users: state.users.filter(item => {
                    return item.id !== action.id
                }),
                usersCount: state.usersCount - 1
            }
        }
        case 'DEL_ALL' : {
            return {
                ...state,
                users: [],
                usersCount: 0
            }
        }
        case 'COPY' : {
            return {
                ...state,
                users: [...state.users, {
                    ...state.users.filter(item => item.id !== action.id)[0],
                    id: state.users[state.users.length - 1].id + 1
                } ]
            }
        }
        case 'DONE' : {
            return {
                ...state,
                users: [
                    ...state.users.map(item => item.id === action.id ? {...item, isDone: !item.isDone} : item)
                ]
            }
        }
        case 'IMP' : {
            return {
                ...state,
                users: [
                    ...state.users.map(item => item.id === action.id ? {...item, isImportant: !item.isImportant} : item)
                ]
            }
        }
        case 'EDIT' : {
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.id) {
                        return {...item, name: action.name, change: !item.name}
                    } else {
                        return item
                    }
                })
            }
        }
        case 'EDIT2' : {
            return {
                ...state,
                users: state.users.map(item => {
                    if (item.id === action.id) {
                        return {...item, change: !item.change}
                    } else {
                        return item
                    }
                })
            }
        }
        default: return state
    }
}

export const addUsers = (name, age) => {
    return (dispatch) => {
        return dispatch({type: 'ADD' , name, age})
    }
}

export const deleteUsers = (id) => {
    return (dispatch) => {
        return dispatch({type: 'DELETE', id})
    }
}

export const deleteAllUsers = () => {
    return (dispatch) => {
        return dispatch({type: 'DEL_ALL'})
    }
}

export const copyUsers = (id) => {
    return (dispatch) => {
        return dispatch({type: 'COPY', id})
    }
}

export const doneUsers = (id, isDone) => {
    return (dispatch) => {
        return dispatch({type: 'DONE', id, isDone})
    }
}

export const isImportant = (id, isImportant) => {
    return (dispatch) => {
        return dispatch({type: 'IMP', id, isImportant})
    }
}

export const editUsers = (id, name, change) => {
    return (dispatch) => {
        if (change) {
            return dispatch({type: 'EDIT' , id, name})
        } else {
            return dispatch({type: 'EDIT2', id})
        }
    }
}
