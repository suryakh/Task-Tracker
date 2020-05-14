import {LOGIN ,LOGOUT,PROJECTLIST,PROJ_REQ}  from './Action_types'

let initialState = {
    loginStatus:false,
    user: "",
    token: ""
}

let taskDataState= {
    projectList:[],
    projectReq:false
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
                projectReq:true
            }
        }
        case PROJ_REQ:{
            return {
                ...state,
                projectReq:false
            }
        }
        default :{
            return state
        }
    }
}

export {userReducers,taskReducers}