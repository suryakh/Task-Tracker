import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProjects, addTask } from '../Redux/Actions'

export class AddTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskName: "",
            projectName: "",
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        if(this.state.taskName !== " "){
        let temp = {
            taskName: this.state.taskName,
            projectName: this.state.projectName
        }
        this.props.addTask(temp, this.props.value.token)
    }
    else {
        alert('please enter Task details')
    }
    }
    componentDidMount() {
        this.props.getProjects(this.props.value.token)
    }
    render() {
        console.log(this.props.projectList)
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
                        <label>Project Name</label>
                    </div>
                    <select name='projectName' className="dropDown" value={this.state.projectName} onChange={this.handleChange}>
                        <option></option>
                        {this.props.projects.reqSent && this.props.projects.projectList.map((ele) => <option key={ele.id} value={ele.name}>{ele.name}</option>)}
                    </select>
                </div>
                <div>
                    <button style={{ backgroundColor: "green" }} onClick={() => this.handleClick()}>Start</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.userReducers,
        projects: state.taskReducers
    }
}

const mapDispatchToProps = dispatch => ({
    getProjects: (token) => dispatch(getProjects(token)),
    addTask: (data, token) => dispatch(addTask(data, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTask)
