// EXTERNAL IMPORTS
import React from 'react'
import dateFormat from 'dateformat'

// MATERIAL UI IMPORTS
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers'
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
    startDate: dateFormat(new Date(), 'isoUtcDateTime'),
    endDate: dateFormat(new Date(), 'isoUtcDateTime'),
    display: 'all',
    contributorLogin: '',
    contributor: {}
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ classes.root }>
        <AppBar position="fixed" color="default" className={ classes.appBar }>
          <Toolbar className={ classes.toolbar }>
            { !this.props.owner ? (
              <React.Fragment>
                <div className={classes.left}>
                  <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className={ classes.radioGroup }
                    value={ this.state.display }
                    onChange={() => {
                      console.log('CHANGED')
                    }}
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
                        {`${this.state.contributor.totalCommits} COMMITS`}
                      </Typography>
                      <Avatar
                        src={ this.state.contributor.avatar }
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
                    {[].map(contributor => (
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

export default withStyles(styles)(Footer)
