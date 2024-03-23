const initialState = {
  lang: 'AR',
  direction: 'ltr',
}

const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANG':
      return {
        ...state,
        lang: action.payload,
        direction: action.payload === 'AR' ? 'ltr' : 'rtl',
      }
    default:
      return state
  }
}

export default langReducer
