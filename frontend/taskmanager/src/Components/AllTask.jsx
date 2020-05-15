import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getAllTasks} from '../Redux/Actions'

export class AllTask extends Component {
    componentDidMount(){
        this.props.getAllTasks(this.props.value.token)
    }
    render() {
        console.log(this.props.task.allTasks)
        return (
            <div>
                {this.props.task.reqSent && this.props.task.allTasks.map((ele)=><div>{ele.taskName}</div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        value:state.userReducers,
        task:state.taskReducers
    }
}

const mapDispatchToProps = dispatch=> {
    return{
        getAllTasks:(token)=>dispatch(getAllTasks(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTask)
