import axios from 'axios'

export function setUser (state, user) {
  state.user = user
  state.isConnectedFacebook = user
  if (user) {
    axios.defaults.headers.common.Authorization = `bearer ${user.token}`
    state.isMenuVisible = true
  } else {
    delete axios.defaults.headers.common.Authorization
    state.isMenuVisible = false
  }
}

export function setFacebookUser (state, isConnected) {
  state.isConnectedFacebook = isConnected
}
