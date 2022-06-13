import {combineReducers} from 'redux';
import {EvenimenteReducer} from './evenimenteReducer';
import {EvenimentReducer} from './evenimentReducer';
import {UserReducer} from './userReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  evenimenteReducer: EvenimenteReducer,
  evenimentReducer: EvenimentReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
