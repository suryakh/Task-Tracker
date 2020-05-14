import React, { Component } from 'react'
import { connect } from 'react-redux'
import  AddTask from './AddTask'
import './component.css'

export class Home extends Component {
    render() {
        return (
            <div className="mainDiv">
                <div>
                    <AddTask />
                </div>
                <div></div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
