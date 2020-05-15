import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrTask } from '../Redux/Actions'
import { Link, Redirect } from 'react-router-dom'

export class CurrentTask extends Component {
    componentDidMount() {
        this.props.getCurrTask(this.props.value.token)
    }
    handlechange = () => "hello"
    render() {
        console.log(this.props.task)
        if (this.props.value.loginStatus) {
            return (
                <div className="container">
                    <div className="dataHolder">
                        <h3>Current Tasks</h3>
                        {this.props.task.reqSent && this.props.task.currTaskList.map((ele) => <div className="items"><Link to={`/task/${ele.id}`}><div>{ele.taskName}</div></Link></div>)}
                    </div>
                </div>
            )
        }
        else {
            return (
                <Redirect to='/login' />
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        value: state.userReducers,
        task: state.taskReducers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrTask: (token) => dispatch(getCurrTask(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTask)
