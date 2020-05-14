import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Switch, Route, Link} from 'react-router-dom'
import Login  from '../Common/Login'
import Signup  from '../Common/Signup'
import Home from '../Components/Home'

export class Routers extends Component {
    render() {
        return (
            <>
            <div className="Nav">
            <div className="navBar">
                <ul>
                    <li>
                <Link to ='/'> Home</Link>
                </li>
                <li>
                <Link to ='/login'> Login</Link>
                </li>
                <li>
                <Link to ='/signup'>signup</Link>
                </li>
                <li>
                    <Link to="logout"> <button>Logout</button></Link>
                </li>
                </ul>
            </div>
            </div>
            <div>
                <Switch>
                <Route path='/' exact render={(props)=><Home {...props}/>}/>
                <Route path='/login' exact render={(props)=><Login  {...props}/>}/>
                <Route path='/signup' exact render={(props)=><Signup {...props}/>}/>
                </Switch>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers)
