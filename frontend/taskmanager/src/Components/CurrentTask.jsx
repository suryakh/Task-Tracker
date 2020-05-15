import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getCurrTask} from '../Redux/Actions'
import {Link} from 'react-router-dom'

export class CurrentTask extends Component {
    componentDidMount(){
        this.props.getCurrTask(this.props.value.token)
    }
    handlechange =()=>"hello"
    render() {
        console.log(this.props.task)
        return (
            <div>
                {this.props.task.reqSent&& this.props.task.currTaskList.map((ele)=><div><Link to ={`/task/${ele.id}`}><div>{ele.taskName}</div></Link></div>)}
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

const mapDispatchToProps = dispatch => {
    return{
        getCurrTask:(token)=>dispatch(getCurrTask(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTask)
