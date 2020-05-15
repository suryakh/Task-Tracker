import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../Redux/Actions'
import { Redirect, Link } from 'react-router-dom'
import './Form.scss'


export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        let temp = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.loginUser(temp)
    }
    render() {
        console.log(this.props.userLoginInfo)
        if (!this.props.userLoginInfo.loginStatus) {
            return (
                <div className="container">
                        <div  className="inputFormHolder">
                            <div>
                                <label>Username</label>
                            </div>
                            <div>
                                <input name="username"  placeholder="Enter username" value={this.state.username} type="text" onChange={this.handleChange} />
                            </div>
                            <div>
                                <label>Password</label>
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div ><p>If you don't have account <Link to="/signup">Signup here</Link></p></div>
                            <div className="btn">
                                <button style={{backgroundColor:"blue"}} onClick={this.handleClick}>Login</button>
                            </div>

                        </div>
                    </div>
            )
        }
        else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userLoginInfo: state.userReducers
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginUser: (a) => dispatch(loginUser(a))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
