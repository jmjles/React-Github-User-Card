import React, { Component } from 'react'
import UserCard from './components/userCard'
import { Container, Grid, Button, Grow } from '@material-ui/core';

const axios = require('axios');

 class App extends Component {
   state={
     user:{},
     followers:[],
     grow:false
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
   myFollowers.map(({avatar_url,html_url,login})=>
    this.setState((prevState)=>({
      followers:[...prevState.followers,
        {
          avatar:avatar_url,
          name:login,
          link:html_url,
        }
        ]})
    )
   )
} 
  handleClick =()=>{
    this.setState({
      followers:[],
      user:{}
    })
  }

  followersBtn = () => {
    this.setState(prevState => ({
      grow: !prevState.grow
    }))
  }
  render() {
    return (
      <Container align='center'>
        <Grid container justify='center'>
          <UserCard user={this.state.user}/>
        </Grid>
        <Button color='secondary' onClick={this.followersBtn} variant='contained'>
          Display the Followers!
        </Button>
        <Grow in={this.state.grow}>
          <Grid container justify='space-around'>
            <UserCard user={this.state.followers}/>
          </Grid>
        </Grow>
        
        <Button onClick={this.handleClick} variant='contained' color={"primary"}>
          Clear The STATE!
        </Button>
      </Container>
    )
  }
}
export default App;