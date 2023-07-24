import User from '../../types/user.types'

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
    case 'LOGIN_USER':
      return { ...state, currentUser: action.playload, isAuthenticated: true }
    case 'LOGOUT_USER':
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
