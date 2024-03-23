import { combineReducers } from 'redux'
import authReducer from './userReducer'
import sidebarReducer from './sidebarReducer'
import langReducer from './langReducer'

const rootReducer = combineReducers({
  user: authReducer,
  sidebar: sidebarReducer,
  lang: langReducer,
})

export default rootReducer
