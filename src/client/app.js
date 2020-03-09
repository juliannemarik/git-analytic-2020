import React from 'react'
import { Content, Header, Footer } from './components'

// MATERIAL UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  }
})

const App = (props) => {
  const {classes} = props
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default withStyles(styles)(App)
