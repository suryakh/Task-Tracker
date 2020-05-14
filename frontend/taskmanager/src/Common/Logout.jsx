import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Logout extends Component {
    render() {
        return (
            <div>
                User successfullly logout
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
