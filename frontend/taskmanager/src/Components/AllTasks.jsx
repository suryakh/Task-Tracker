import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllTasks, allTasksFilter } from '../Redux/Actions'
import { Redirect } from 'react-router-dom'

export class AllTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectName: ""
        }
    }
    componentDidMount() {
        this.props.getAllTasks(this.props.userLoginInfo.token)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        this.props.allTasksFilter(this.state.projectName)
    }
    render() {
        console.log(this.props.task.allTasks)
        if (this.props.userLoginInfo.loginStatus) {
            return (
                <div className="container">
                    <div className="inputDiv">
                        <select name='projectName' className="dropDown" value={this.state.projectName} onChange={this.handleChange} onClick={() => this.handleClick()}>
                            <option value="All">All</option>
                            {this.props.task.reqSent && this.props.task.projectList.map((ele) => <option key={ele.id} value={ele.name}>{ele.name}</option>)}
                        </select>
                    </div>
                    <div className="tableDiv">
                        <table>
                            <thead>
                                <tr>
                                    <th>TaskName</th><th>ProjectName</th><th>Status</th><th>Start Time</th><th>End Time</th ><th>Time Spent(hh:mm:ss)</th><th>Time Allocated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.task.reqSent && this.props.task.displayTasks.map((ele) => <tr><td>{ele.taskName}</td><td>{ele.projectName}</td><td>{ele.currStatus ? "completed" : "Not completed"}</td><td>{ele.startTime}</td><td>{ele.endTime}</td><td>{ele.overalTime}</td><td>{ele.timeAllocated}</td></tr>)}
                            </tbody>
                        </table>
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
        userLoginInfo: state.userReducers,
        task: state.taskReducers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllTasks: (token) => dispatch(getAllTasks(token)),
        allTasksFilter: (data) => dispatch(allTasksFilter(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTask)
