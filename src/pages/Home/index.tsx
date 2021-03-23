import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import SideBar from '../../components/Home/SideBar'

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
  },
})

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          {<SideBar />}
        </Grid>
        <Grid item xs={9} />
      </Grid>
    </div>
  )
}
