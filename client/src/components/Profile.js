import React, { Component } from 'react'
import axios from 'axios'
import SpaceRow from '../edit-mode/SpaceRow';
import LikedSpaces from '../edit-mode/LikedSpaces';

export default class Profile extends Component {
    state = {
        user: this.props.user,
        portfolio: [],
        otherSpaces: [],
        // likedSpaces: []
    }
    componentDidMount = () => {
        axios.get(`/user/${this.props.user.username}`).then((response) => {
            this.setState({
                portfolio: this.state.portfolio.concat(response.data)
            })
        }).catch(err => console.log(err))
        // axios.get(`/user/getall/${this.props.user.username}`).then(response => {
        //     this.setState({
        //         otherSpaces: this.state.otherSpaces.concat(response.data)
        //     })
        // })
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
        // const likedSpaces = this.state.user.favoriteSpaces.map(x => {
        //     return <li>{x}</li>
        // })


        // console.log(this.state.user.favoriteSpaces)

        // const otherSpaces = this.state.otherSpaces.map(x => {
        //     return <h4>{x.title}</h4>
        // })


        return (
            <div>
                <h2>{this.state.user.username}</h2>
                <div>
                    <h3>My spaces</h3>
                    {portfolio}
                    {/* <h3>Liked spaces</h3>
                    {likedSpaces} */}
                    <LikedSpaces user={this.state.user} />


                </div>

            </div>
        )
    }
}
