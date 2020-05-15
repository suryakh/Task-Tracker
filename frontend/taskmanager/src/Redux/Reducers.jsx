import { LOGIN, LOGOUT, PROJECTLIST, PROJ_REQ, CURR_TASK, ALL_TASKS,PROJ_FILLTER } from './Action_types'

let initialState = {
    loginStatus: false,
    user: "",
    token: ""
}

let taskDataState = {
    projectList: [],
    reqSent: false,
    currTaskList: [],
    allTasks: [],
    displayTasks:[]
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                loginStatus: true,
                user: action.payload.username,
                token: action.payload.token
            }
        }
        case LOGOUT: {
            return {
                ...state,
                loginStatus: false,
                user: "",
                token: ""
            }
        }
        default: {
            return state
        }
    }
}

const taskReducers = (state = taskDataState, action) => {
    switch (action.type) {
        case PROJECTLIST: {
            return {
                ...state,
                projectList: action.payload,
                reqSent: true
            }
        }
        case PROJ_REQ: {
            return {
                ...state,
                reqSent: false
            }
        }
        case CURR_TASK: {
            return {
                ...state,
                currTaskList: action.payload,
                reqSent: true
            }
        }
        case ALL_TASKS: {
            return {
                ...state,
                allTasks: action.payload,
                displayTasks:action.payload,
                reqSent: true
            }
        }
        case PROJ_FILLTER:{
            let temp  = []
            console.log(action.payload)
            if(action.payload == "All"){
                return{
                    ...state,
                    displayTasks:state.allTasks
                }
            }
            else {
            temp = state.allTasks.filter((ele)=>{
                if (ele.projectName == action.payload){
                    return ele
                }
            })
            return {
                ...state,
                displayTasks:temp
            }
        }
        }
        default: {
            return state
        }
    }
}

export { userReducers, taskReducers }