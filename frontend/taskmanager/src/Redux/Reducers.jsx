import {LOGIN ,LOGOUT,PROJECTLIST,PROJ_REQ,CURR_TASK,ALL_TASKS}  from './Action_types'

let initialState = {
    loginStatus:false,
    user: "",
    token: ""
}

let taskDataState= {
    projectList:[],
    reqSent:false,
    currTaskList:[],
    allTasks:[]
}

const userReducers = (state = initialState,action)=>{
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

const taskReducers = (state=taskDataState,action)=>{
    switch(action.type){
        case PROJECTLIST:{
            return{
                ...state,
                projectList:action.payload,
                reqSent:true
            }
        }
        case PROJ_REQ:{
            return {
                ...state,
                reqSent:false
            }
        }
        case CURR_TASK:{
            return {
                ...state,
                currTaskList:action.payload,
                reqSent:true
            }
        }
        case ALL_TASKS:{
            return{
                ...state,
                allTasks:action.payload,
                reqSent:true
            }
        }
        default :{
            return state
        }
    }
}

export {userReducers,taskReducers}