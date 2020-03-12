// EXTERNAL IMPORTS
import React from 'react'
import { connect } from 'react-redux'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { scatterConfig } from './configs/scatterConfig';

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

class ScatterPlot extends React.Component {
  render() {
    const { classes } = this.props
    const chartOptions = {
      ...scatterConfig,
      series: [ {...this.props.commits, color: "#0080FF", opacity: 0.5 }, { ...this.props.pulls, color: "#FFC423", opacity: 0.5 } ]
    }
    return (
      <div>
        <HighchartsReact
          className={ classes.root }
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    commits: state.repos.commits,
    pulls: state.repos.pulls,
    contributors: state.repos.contributors
  }
}

const styles = () => ({
  root: {
    height: "100vh"
  }
})

ScatterPlot.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState)(ScatterPlot))
