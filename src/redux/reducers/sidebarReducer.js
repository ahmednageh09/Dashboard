const initialState = {
  sidebarShow: true,
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SIDEBAR_VISIBILITY':
      return {
        ...state,
        sidebarShow: action.payload,
      }
    default:
      return state
  }
}

export default sidebarReducer
