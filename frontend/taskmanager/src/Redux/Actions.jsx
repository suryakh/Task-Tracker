import  { LOGIN,LOGOUT,PROJECTLIST,PROJ_REQ } from './Action_types'
import axios from 'axios'

const login = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}
const logout = () => {
    return {
        type: LOGOUT
    }
}

const projectList =(data)=>{
    return {
        type:PROJECTLIST,
        payload:data
    }
}
const projectReqSent=()=>{
    return{
        type:PROJ_REQ
    }
}

const loginUser = (data) => {
    return dispatch => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/login',
            data: data
        })
            .then(res => {
                if (res.data.token) {
                    dispatch(login(res.data))
                }
                else {
                    alert("invalid credentials")
                }
            }
            )
    };
}
const singupUser = (data) => {
    return dispatch => {
        axios({
            method: "POST",
            url: "http://localhost:5000/auth/signup",
            data: data,
        })
            .then((res) => {
                alert("user suceessfully registered")
            })
            .catch((res) => {
                console.log("error")
            })
    }
}
const getProjects = (token)=>{
    return dispatch=>{
        dispatch(projectReqSent())
        axios({
            method:'GET',
            url:"http://localhost:5000/projects/list",
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then((res)=>dispatch(projectList(res.data)))
        .catch((err)=>console.log(err))
    }

}

const addTask = (data,token)=>{
    return dispatch=>{
        axios({
            method:'POST',
            url:"http://localhost:5000/task/add",
            headers: { 'Authorization': `Bearer ${token}` },
            data:data
        })
        .then((res)=>alert("successfully added"))
        .catch((err)=>console.log(err))
    }
}


export {loginUser,singupUser,logout,getProjects,addTask}