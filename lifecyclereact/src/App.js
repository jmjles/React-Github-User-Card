import React, { Component } from 'react'
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

   user = ({avatar_url,bio,name,url}) => {
    this.setState({
      user:{
        avatar:avatar_url,
        bio,
        name,
        link:url
      }
    })
 }

 followers = (myFollowers) => {
   myFollowers.map(({avatar_url,url,login})=>{
    this.setState((prevState)=>({
      followers:[...prevState.followers,
        {
          avatar:avatar_url,
          link:url,
          name:login
        }
        ]})
    )
   })
}
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
export default App;