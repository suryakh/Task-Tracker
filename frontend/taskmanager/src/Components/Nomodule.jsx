import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Nomodule extends Component {
    render() {
        return (
            <div>
                <h1>404 Page Not Found</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Nomodule)
