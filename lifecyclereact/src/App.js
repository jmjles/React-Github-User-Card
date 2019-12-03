import React, { Component } from 'react'
import UserCard from './components/userCard'
import { Container, Grid } from '@material-ui/core';

const axios = require('axios');

 class App extends Component {
   state={
     user:{},
     followers:[]
   }

   async componentDidMount(){
     const res = await axios('https://api.github.com/users/jmjles')
     this.user(res.data)
     const followersRes = await axios(res.data.followers_url)
     this.followers(followersRes.data)
   }

   user = ({avatar_url,bio,name,html_url}) => {
    this.setState({
      user:{
        avatar:avatar_url,
        bio,
        name,
        link:html_url
      }
    })
 }

 followers = (myFollowers) => {
   myFollowers.map(({avatar_url,url,login})=>
    this.setState((prevState)=>({
      followers:[...prevState.followers,
        {
          avatar:avatar_url,
          name:login,
          link:url,
        }
        ]})
    )
   )
}
  render() {
    return (
      <Container>
        <Grid container justify='center'>
          <UserCard user={this.state.user}/>
        </Grid>
        <Grid container justify='space-around'>
          <UserCard user={this.state.followers}/>
        </Grid>
      </Container>
    )
  }
}
export default App;