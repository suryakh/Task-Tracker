import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Timer extends Component {
    componentDidMount(){
        console.log(this.props.currTime)
        // let temp = this.props.currTime.replace("GMT","")
        // console.log(temp)
        // let startdate = new Date(temp)
        // let currdate = new Date()
        // let res = Math.floor(Math.abs(currdate - startdate) / 1000)
        
        // var days = Math.floor(res / 86400);
        // var hours = Math.floor(res / 3600) % 24;  
        // var minutes = Math.floor(res / 60) % 60;
        // var seconds = res % 60;
        // console.log(days,hours,minutes,seconds)
    }
    render() {
        console.log(this.props.currTime)
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
