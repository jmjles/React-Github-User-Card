import React from 'react'
import {Grid, Card, Typography as Font} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'  

const useStyles = makeStyles({
    root:{
        textDecoration:'none',
        '& div':{
            marginTop:30,
            '& div':{
                marginTop:0,
                padding:30,
                '& img':{
                    width:'80%'
                },
                '& h4':{
                    paddingBottom:'1.5rem'
                }
            }
        }
    }
})

function SimpleCard({props:{user}}) {
    const classes = useStyles();
    let users = []
    if(!Array.isArray(user)){
        users = [user]
    }else{
        users = user
    }
    console.log(users)
    return (
        <>
        {
            users.map(({avatar,bio,link,name})=>(
                <Grid item xs={5} md={3} key ={name}>
                    <a href={link} target='_blank' rel='noopener noreferrer' className={classes.root}>
                        <Card elevation={5} align='center' >
                            <div>
                                <Font variant='h4'>
                                    {name}
                                </Font>
                                <img src={avatar}/>
                                <Font variant='body1'>
                                    {bio}
                                </Font>
                            </div>
                        </Card>
                    </a>
                </Grid>
            ))
        }
        </>
    )
}

export default SimpleCard
