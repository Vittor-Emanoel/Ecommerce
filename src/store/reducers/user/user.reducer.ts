import User from '../../../types/user.types'
import UserActionTypes from './user.action-types'

interface InitialState {
  currentUser: User | null
  isAutheticated: boolean
}

const initialState: InitialState = {
  currentUser: null,
  isAutheticated: false
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return { ...state, currentUser: action.playload, isAuthenticated: true }
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducer
