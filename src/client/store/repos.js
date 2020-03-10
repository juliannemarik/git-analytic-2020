import axios from 'axios'
import { commitsByRepoQuery } from './queries';

// ACTION TYPES
const SET_OWNER = 'SET_OWNER'
const SET_REPOSITORY = 'SET_REPOSITORY'
const SET_COMMITS = 'SET_COMMITS'
const SET_PULLS = 'SET_PULLS'
const SET_CONTRIBUTORS = 'SET_CONTRIBUTORS'
const TOGGLE_COMMITS = 'TOGGLE_COMMITS'
const TOGGLE_PULLS = 'TOGGLE_PULLS'
const RESET_DATA_VISIBILITY = 'RESET_DATA_VISIBILITY'

// INITIAL STATE
const initialState = {
  owner: '',
  repository: '',
  commits: {
    data: [],
    visible: true
  },
  pulls: {
    data: [],
    visible: true
  },
  contributors: {
    data: []
  }
}

// ACTION CREATORS
export const setOwner = owner => ({type: SET_OWNER, owner})
export const setRepository = repository => ({type: SET_REPOSITORY, repository})
const setCommits = commits => ({type: SET_COMMITS, commits})
const setPulls = pulls => ({type: SET_PULLS, pulls})
const setContributors = contributors => ({type: SET_CONTRIBUTORS, contributors})
export const toggleCommits = (visible) => ({type: TOGGLE_COMMITS, visible})
export const togglePulls = (visible) => ({type: TOGGLE_PULLS, visible})
export const resetDatavisible = () => ({type: RESET_DATA_VISIBILITY})

// THUNK CREATORS
export const fetchCommits = (owner, repo) => async dispatch => {
  try {
    const { data: { data: { commitsByRepo } } } = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      url: '/graphql',
      data: {
        query: commitsByRepoQuery,
        variables: { owner, repo },
      }
    })

    dispatch(setCommits(commitsByRepo))
  } catch (err) {
    console.error(err)
  }
}
export const fetchCommitsByDate = (owner, repo, since, until) => async dispatch => {
  try {
    const {data: commits} = await axios.get(
      `api/repos/${owner}/${repo}/commits/${since}/${until}`
    )
    dispatch(setCommits(commits))
  } catch (err) {
    console.error(err)
  }
}
export const fetchPulls = (owner, repo) => async dispatch => {
  try {
    const {data: pulls} = await axios.get(`api/repos/${owner}/${repo}/pulls`)
    dispatch(setPulls(pulls))
  } catch (err) {
    console.error(err)
  }
}
export const fetchPullsByDate = (owner, repo, since, until) => async dispatch => {
  try {
    const {data: pulls} = await axios.get(
      `api/repos/${owner}/${repo}/pulls/${since}/${until}`
    )
    dispatch(setPulls(pulls))
  } catch (err) {
    console.error(err)
  }
}
export const fetchContributors = (owner, repo) => async dispatch => {
  try {
    const {data: contributors} = await axios.get(`api/repos/${owner}/${repo}/stats/contributors`)
    dispatch(setContributors(contributors))
  } catch (err) {
    console.error(err)
  }
}

// HANDLERS
const handlers = {
  [SET_OWNER]: (state, action) => {
    return {...state, owner: action.owner}
  },
  [SET_REPOSITORY]: (state, action) => {
    return {...state, repository: action.repository}
  },
  [SET_COMMITS]: (state, action) => {
    return { ...state, commits: { data: action.commits, visible: true } }
  },
  [SET_PULLS]: (state, action) => {
    return {...state, pulls: { data: action.pulls, visible: true } }
  },
  [SET_CONTRIBUTORS]: (state, action) => {
    return {...state, contributors: { data: action.contributors } }
  },
  [TOGGLE_COMMITS]: (state, action) => {
    return {...state, commits: {...state.commits, visible: action.visible}}
  },
  [TOGGLE_PULLS]: (state, action) => {
    return {...state, pulls: {...state.pulls, visible: action.visible}}
  },
  [RESET_DATA_VISIBILITY]: (state, action) => {
    return {...state, commits: {...state.commits, visible: true}, pulls: {...state.pulls, visible: true}}
  }
}

// REDUCER
export default function(state = initialState, action) {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  } else {
    return handlers[action.type](state, action)
  }
}
