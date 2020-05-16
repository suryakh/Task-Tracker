import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import Login from '../Common/Login'
import Signup from '../Common/Signup'
import Home from '../Components/Home'
import { logout } from '../Redux/Actions'
import Logout from '../Common/Logout'
import CurrentTask from '../Components/CurrentTask'
import Task from '../Components/Task'
import AllTasks from '../Components/AllTasks'
import { Nomodule } from '../Components/Nomodule'

export class Routers extends Component {
    handleClick = () => {
        this.props.logout()
    }
    render() {
        console.log(this.props.value)
        return (
            <>
                <div className="Nav">
                    <div className="navBar">
                        <ul>
                            <li>
                                <Link to='/'> Home</Link>
                            </li>
                            <li>
                                {!this.props.value.loginStatus && <Link to='/login'> Login</Link>}
                            </li>
                            <li>
                                {!this.props.value.loginStatus && <Link to='/signup'>signup</Link>}
                            </li>
                            <li>
                                {this.props.value.loginStatus && <h3>{this.props.value.user}</h3>}
                            </li>
                            <li>
                                {this.props.value.loginStatus && <Link to="logout"> <button style={{ backgroundColor: "red" }} onClick={() => this.handleClick()}>Logout</button></Link>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Switch>
                        <Route path='/' exact render={(props) => <Home {...props} />} />
                        <Route path='/login' exact render={(props) => <Login  {...props} />} />
                        <Route path='/signup' exact render={(props) => <Signup {...props} />} />
                        <Route path='/logout' exact render={(props) => <Logout {...props} />} />
                        <Route path='/currTask' exact render={(props) => <CurrentTask {...props} />} />
                        <Route path='/allTasks' exact render={(props) => <AllTasks {...props} />} />
                        <Route path='/task/:id' exact render={(props) => <Task {...props} />} />
                        <Route exact component={Nomodule} />
                    </Switch>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    value: state.userReducers
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers)
