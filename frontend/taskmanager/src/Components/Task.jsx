import React, { Component } from 'react'
import { connect } from 'react-redux'
import { endTask } from '../Redux/Actions'
import { Link, Redirect } from 'react-router-dom'
export class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Task: {},
            Days: "",
            Hours: "",
            Minutes: "",
            Seconds: "",
            taskEnd:false
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id
        let temp = this.props.task.currTaskList.find((ele) => {
            if (ele.id == id) {
                return ele
            }
        })
        this.setState({
            Task: temp
        })
        let dateFromdb = temp.startTime.replace("GMT", "")

        //  calculating time spend on particular task
        let startdate = new Date(dateFromdb)
        console.log(startdate)
        let currdate = new Date()
        let res = Math.floor(Math.abs(currdate - startdate) / 1000)

        //  creating timer

        this.Timerinterval = setInterval(() => {
            res = res + 1
            var days = Math.floor(res / 86400);
            var hours = Math.floor(res / 3600) % 24;
            var minutes = Math.floor(res / 60) % 60;
            var seconds = res % 60;
            this.setState({
                Days: days,
                Hours: hours,
                Minutes: minutes,
                Seconds: seconds
            })
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.Timerinterval)
    }
    handleClick() {
        clearInterval(this.Timerinterval)
        let time = this.state.Hours +":"+this.state.Minutes+":"+this.state.Seconds
        this.props.endTask(this.props.match.params.id,time,this.props.userLoginInfo.token)
        this.setState({
            taskEnd:true
        })
    }
    render() {
        if(this.props.userLoginInfo.loginStatus){
        return (
            <div className="container">

                <div className="dataHolder">
                    <h2>Task Details</h2>
                    <div className="taskInfo">
                        <div>
                            <label>Task Name: <h3>{this.state.Task.taskName}</h3></label>
                        </div>
                        <div>
                            <label>Project Name: <h3>{this.state.Task.projectName}</h3></label>

                        </div>
                        <div>
                            <label>Start At: <h3>{this.state.Task.startTime}</h3></label>

                        </div>

                    </div>


                    <h1> {this.state.Hours}<span> hh </span>: {this.state.Minutes}<span> mm </span> : {this.state.Seconds}<span> sec</span></h1>
                        {!this.state.taskEnd && <button style={{backgroundColor:"red"}} onClick={() => this.handleClick()}>Finish task</button>}
                        {this.state.taskEnd && <Link to="/alltasks"><button style={{backgroundColor:"blue"}}>Show All Tasks</button></Link>}
                </div>
            </div>
        )
        }
        else {
            return (
                <Redirect to="/login"/>
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
        endTask: (id,time,token) => dispatch(endTask(id,time,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
