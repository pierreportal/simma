import React, { Component } from 'react'
// import axios from 'axios'

export default class Profile extends Component {
    state = {
        user: this.props.user
    }
    componentDidMount = () => {
        // axios.get('/user/:userName').then((user) => {
        //     this.setState({ user: user.data }, () => console.log(this.state.user))
        // }).catch(err => console.log(err))
    }
    render() {
        console.log(this.state.user)
        return (
            <div>
                <h2>{this.state.user.username}</h2>
            </div>
        )
    }
}
