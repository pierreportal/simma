import React, { Component } from 'react'
import axios from 'axios'
import SpaceRow from '../edit-mode/SpaceRow';

export default class Profile extends Component {
    state = {
        user: this.props.user,
        portfolio: []
    }
    componentDidMount = () => {
        axios.get(`/user/${this.props.user.username}`).then((response) => {
            this.setState({
                portfolio: this.state.portfolio.concat(response.data)
            })
        }).catch(err => console.log(err))
    }
    render() {

        const portfolio = this.state.portfolio.map(x => {
            // return <li key={x._id}>{x.title}</li>
            return <SpaceRow key={x._id} space={x} username={this.state.user.username} />
        })

        console.log(this.state.portfolio)
        return (
            <div>
                <h2>{this.state.user.username}</h2>
                <div>
                    <h3>My spaces</h3>

                    {portfolio}

                </div>

            </div>
        )
    }
}
