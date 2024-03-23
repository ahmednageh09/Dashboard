export default function sidebarAction(visible) {
  return {
    type: 'SET_SIDEBAR_VISIBILITY',
    payload: visible,
  }
}
