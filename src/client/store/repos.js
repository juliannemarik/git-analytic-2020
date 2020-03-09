
// ACTION TYPES

// INITIAL STATE
const initialState = {}

// ACTION CREATORS

// THUNK CREATORS

// HANDLERS
const handlers = {}

// REDUCER
export default function(state = initialState, action) {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  } else {
    return handlers[action.type](state, action)
  }
}
