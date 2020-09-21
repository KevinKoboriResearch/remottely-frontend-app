import user from '../user'

export function toggleMenu (state, isVisible) {
  if (user.user) {
    state.isMenuVisible = false
    return
  }

  if (isVisible === undefined) {
    state.isMenuVisible = !state.isMenuVisible
  } else {
    state.isMenuVisible = isVisible
  }
}
