import React, { Component } from 'react'
import axios from 'axios'
import SpaceRow from '../edit-mode/SpaceRow';
import LikedSpaces from '../edit-mode/LikedSpaces';

export default class Profile extends Component {
    state = {
        user: this.props.user,
        portfolio: [],
        otherSpaces: [],
    }
    componentDidMount = () => {
        axios.get(`/user/${this.props.user.username}`).then((response) => {
            this.setState({
                portfolio: this.state.portfolio.concat(response.data)
            })
        }).catch(err => console.log(err))
    }
    updateState = id => {
        this.setState({
            portfolio: this.state.portfolio.filter(x => x._id !== id)
        })
    }
    render() {

        const portfolio = this.state.portfolio.map(x => {
            return <SpaceRow key={x._id} space={x} username={this.state.user.username} updateState={this.updateState} />
        })


        return (
            <div>
                <h2>{this.state.user.username}</h2>
                <div>
                    <h3>My spaces</h3>
                    {portfolio}
                    <LikedSpaces user={this.state.user} />

                </div>
            </div>
        )
    }
}
