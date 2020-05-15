import React, { Component } from 'react'
import { connect } from 'react-redux'
import  AddTask from './AddTask'
import {Link, Redirect} from 'react-router-dom'
import './component.css'

export class Home extends Component {
    render() {
        if(this.props.user){
        return (
            <div className="mainDiv">
                <div>
                    <AddTask />
                </div>
                <div>
                    <div>
                    <Link to ='/currtask'><button>Show current task</button></Link>
                    </div>
                    <div>
                    <Link to ='/alltask'><button>Show All task</button></Link>
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
