import React, { Component } from 'react'
import { connect } from 'react-redux'
import {endTask} from '../Redux/Actions'

export class Task extends Component {
    constructor(props){
        super(props)
        this.state={
            Task:{},
            Days:"",
            Hours:"",
            Minutes:"",
            Seconds:""
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id
        let temp = this.props.task.currTaskList.find((ele)=>{
            if(ele.id == id){
                return ele
            }
        })
        this.setState({
            Task:temp
        })
        let dateFromdb = temp.startTime.replace("GMT","")
        console.log(dateFromdb)
        let startdate = new Date(dateFromdb)
        let currdate = new Date()
        let res = Math.floor(Math.abs(currdate - startdate) / 1000)
        
        this.Timerinterval = setInterval(()=>{
            res = res+1
            var days = Math.floor(res / 86400);
            var hours = Math.floor(res / 3600) % 24;  
            var minutes = Math.floor(res / 60) % 60;
            var seconds = res % 60;
            this.setState({
                Days:days,
                Hours:hours,
                Minutes:minutes,
                Seconds:seconds
            })
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.Timerinterval)
    }
    handleClick(){
        clearInterval(this.Timerinterval)
        this.props.endTask(this.props.match.params.id,this.props.value.token)
    }
    render() {
        return (
            <div>
                <h1>D:{this.state.Days} H:{this.state.Hours} MM:{this.state.Minutes} sec:{this.state.Seconds}</h1>
                <button onClick={()=>this.handleClick()}>Stop task</button>
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
        endTask:(id,token)=>dispatch(endTask(id,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
