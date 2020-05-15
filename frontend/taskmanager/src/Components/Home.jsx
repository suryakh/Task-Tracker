import React, { Component } from 'react'
import { connect } from 'react-redux'
import  AddTask from './AddTask'
import {Link, Redirect} from 'react-router-dom'
import './component.scss'

export class Home extends Component {
    render() {
        if(this.props.user){
        return (
            <div>
                <div className="addTaskDiv">
                    <h2>Add New Task </h2>
                    <div>
                    <AddTask />
                    </div>
                </div>
                    <div className="mainDiv">
                    <div>
                    <Link to ='/currTask'><button style={{backgroundColor:"blue"}}>Show current task</button></Link>
                    </div>
                    <div>
                    <Link to ='/allTasks'><button style={{backgroundColor:"blue"}}>Show All tasks</button></Link>
                    </div>
                    </div>
            </div>
        )
        }
        else {
            return ( 
            <Redirect to="/login" />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.userReducers.loginStatus
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
