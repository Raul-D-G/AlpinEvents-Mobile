import {ActionType} from '../action-type';
import {UserAction, UserModel} from '../actions/userActions';

type UserState = {
  user: UserModel;
  email: string;
  password: string;
};

const initialState = {
  user: {} as UserModel,
  email: '',
  password: '',
};

const UserReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionType.ON_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.ON_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionType.SET_USER_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case ActionType.SET_USER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};

export {UserReducer};
