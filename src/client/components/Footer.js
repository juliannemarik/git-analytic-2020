// EXTERNAL IMPORTS
import React from 'react'
import {connect} from 'react-redux'
import {
  toggleCommits,
  togglePulls,
  resetDataVisibility
} from '../store'

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

class Footer extends React.Component {
  state = {
    display: 'all',
    contributorLogin: '',
    contributor: {}
  }

  handleDisplayChange = event => {
    this.setState({display: event.target.value})
    if (event.target.value === 'all') {
      this.props.resetDataVisibility()
    } else if (event.target.value === 'commits') {
      this.props.togglePulls(false)
      this.props.toggleCommits(true)
    } else if (event.target.value === 'pulls') {
      this.props.toggleCommits(false)
      this.props.togglePulls(true)
    }
  }

  handleContributorChange = async event => {
    const contributorObj = this.props.contributors.data.find(
      contributor => contributor.login === event.target.value
    )
    await this.setState({
      contributorLogin: event.target.value,
      contributor: contributorObj
    })
  }

  render() {
    const { classes, contributors } = this.props
    return (
      <div className={ classes.root }>
        <AppBar position="fixed" color="default" className={ classes.appBar }>
          <Toolbar className={ classes.toolbar }>
            { this.props.owner ? (
              <React.Fragment>
                <div className={classes.left}>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className={ classes.radioGroup }
                    value={ this.state.display }
                    onChange={this.handleDisplayChange}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label={
                        <Typography className={ classes.buttonText }>
                          ALL
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="commits"
                      control={<Radio />}
                      label={
                        <Typography className={ classes.buttonText }>
                          COMMITS
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="pulls"
                      control={<Radio />}
                      label={
                        <Typography className={ classes.buttonText }>
                          PULL REQUESTS
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </div>
                <div className={ classes.right }>
                  { this.state.contributorLogin !== '' ? (
                    <React.Fragment>
                      <Typography
                        className={`${classes.buttonText} ${
                          classes.contributorText
                        }`}
                        color="inherit"
                      >
                        {`${this.state.contributor.contributions} COMMITS`}
                      </Typography>
                      <Avatar
                        src={ this.state.contributor.avatar_url }
                        className={ classes.avatar }
                      />
                    </React.Fragment>
                  ) : (
                    <div />
                  )}

                  <TextField
                    select
                    className={classes.textField}
                    onChange={this.handleContributorChange}
                    value={this.state.contributorLogin}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    InputProps={{
                      classes: {
                        input: `${classes.resizeDate} ${classes.contributors}`
                      }
                    }}
                    margin="normal"
                  >
                    <option>CONTRIBUTORS</option>
                    {contributors.data.map(contributor => (
                      <option key={contributor.login} value={contributor.login}>
                        {contributor.login}
                      </option>
                    ))}
                  </TextField>
                </div>
              </React.Fragment>
            ) : (
              <div />
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapState = state => {
  console.log("HERE", state.repos.contributors)
  return {
    owner: state.repos.owner,
    repository: state.repos.repository,
    commits: state.repos.commits,
    pulls: state.repos.pulls,
    contributors: state.repos.contributors
  }
}

const mapDispatch = dispatch => {
  return {
    toggleCommits: visibility => {
      dispatch(toggleCommits(visibility))
    },
    togglePulls: visibility => {
      dispatch(togglePulls(visibility))
    },
    resetDataVisibility: () => {
      dispatch(resetDataVisibility())
    }
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  bottomNavgation: {
    paddingLeft: '15px',
    paddingRight: '15px',
    boxShadow: 'none',
    width: '100%',
    borderTop: '1px solid #D8DEE2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {display: 'block'},
    fontWeight: 300,
    letterSpacing: theme.spacing.unit * 1 / 4
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  resizeDate: {
    padding: '5%',
    fontSize: '12px',
    width: '7vw',
    fontWeight: 300,
    color: 'inherit',
    letterSpacing: theme.spacing.unit * 1 / 4
  },
  contributors: {
    width: '9vw'
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    boxShadow: 'none',
    borderTop: '1px solid #D8DEE2'
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '55%'
  },
  left: {
    display: 'flex',
    alignItems: 'center'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: '12px',
    fontWeight: 300,
    color: 'inherit',
    letterSpacing: theme.spacing.unit * 1 / 4
  },
  contributorText: {
    marginRight: '15px'
  },
  avatar: {
    margin: 10,
    width: 35,
    height: 35
  }
})


Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Footer))
