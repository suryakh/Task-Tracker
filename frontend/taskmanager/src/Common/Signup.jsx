import React, { Component } from 'react'
import { connect } from 'react-redux'
import { singupUser } from '../Redux/Actions'

export class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            mobile: ""
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
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile
        }
        if (this.state.username !== "" && this.state.password !== "") {
            this.props.singupUser(temp)
        }
        else {
            alert("please fill all details")
        }
        this.setState({
            username: "",
            email: "",
            password: "",
            mobile: ""
        })
    }
    render() {
        return (
            <div className="container">
                    <div className="inputHolder">
                        <div>
                            <label>Username</label>
                        </div>
                        <div>
                            <input className="col-12 form-control" name="username" placeholder="enter username" value={this.state.username} type="text" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Email</label>
                        </div>
                        <div>
                            <input className="col-12 form-control" name="email" placeholder="enter email" value={this.state.email} type="text" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Password</label>
                        </div>
                        <div>
                            <input className="col-12 form-control" type="text" name="password" placeholder="enter password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label>Mobile</label>
                        </div>
                        <div>
                            <input type="text" name="mobile" placeholder="enter mobile no." value={this.state.mobile} onChange={this.handleChange} />
                        </div>
                        <div className="btn">
                            <button  onClick={this.handleClick}>Signup</button>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    value: state.loginreducer
})

const mapDispatchToProps = dispatch => {
    return {
        singupUser: (data) => dispatch(singupUser(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
