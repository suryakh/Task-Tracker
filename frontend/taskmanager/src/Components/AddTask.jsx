import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProjects, addTask } from '../Redux/Actions'

export class AddTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskName: "",
            projectName: "",
            endDate: "",
            endTime: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        //  caluculating Time to finish the task
        if (this.state.taskName !== "") {
            let endTime = this.state.endDate + "T" + this.state.endTime
            let currdate = new Date()
            let res = Math.floor(Math.abs(currdate - new Date(endTime)) / 1000)
            var days = Math.floor(res / 86400);
            var hours = Math.floor(res / 3600) % 24;
            var minutes = Math.floor(res / 60) % 60;
            var seconds = res % 60;
            let timeToFinish = hours + ":" + minutes + ":" + seconds

            let temp = {
                taskName: this.state.taskName,
                projectName: this.state.projectName,
                endTime: endTime,
                timeToFinish: timeToFinish
            }
            this.props.addTask(temp, this.props.userLoginInfo.token)
        }
        else {
            alert('please enter Task details')
        }
    }
    componentDidMount() {
        this.props.getProjects(this.props.userLoginInfo.token)
    }
    render() {
        // console.log(this.props.projectList)
        console.log(this.state)
        return (
            <div className="container formHolder">
                <div>
                    <label>Enter Task Name</label>
                </div>
                <div>
                    <input type='text' name='taskName' placeholder="Enter TaskName" value={this.state.taskName} onChange={this.handleChange} />
                </div>
                <div>
                    <div>
                        <label>Please select end Time and Date</label>
                    </div>
                    <input type='date' name='endDate' value={this.state.endDate} onChange={this.handleChange} />
                    <input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
                </div>
                <div>
                    <div>
                        <label>Project Name</label>
                    </div>
                    <select name='projectName' className="dropDown" value={this.state.projectName} onChange={this.handleChange}>
                        <option>--select--</option>
                        {this.props.projects.reqSent && this.props.projects.projectList.map((ele) => <option key={ele.id} value={ele.name}>{ele.name}</option>)}
                    </select>
                </div>
                <div>
                    <button style={{ backgroundColor: "green" }} onClick={() => this.handleClick()}>Start Task</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLoginInfo: state.userReducers,
        projects: state.taskReducers
    }
}

const mapDispatchToProps = dispatch => ({
    getProjects: (token) => dispatch(getProjects(token)),
    addTask: (data, token) => dispatch(addTask(data, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTask)
