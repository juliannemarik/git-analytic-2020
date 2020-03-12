// EXTERNAL IMPORTS
import React from 'react'
import ScatterPlot from './highcharts/ScatterPlot'
// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

class Content extends React.Component {
  state = {}

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        <ScatterPlot/>
      </div>
    )
  }
}

const styles = () => ({
  root: {
    backgroundColor: "blue",
    width: "100vw",
  }
})

Content.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Content)
