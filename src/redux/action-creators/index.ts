import axios from 'axios';
import {Dispatch} from 'redux';
import {BASE_URL} from '../../utils/AppConst';
import {ActionType} from '../action-type';
import {UserAction, UserModel} from '../actions/userActions';

export const setEmail = (email: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: ActionType.SET_USER_EMAIL,
      payload: email,
    });
  };
};

export const setPassword = (password: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: ActionType.SET_USER_PASSWORD,
      payload: password,
    });
  };
};

// we need to dispatch action
export const onLogin = (email: string, displayName: string, uid: string) => {
  return (dispatch: Dispatch<UserAction>) => {
    const user: UserModel = {
      email: email,
      displayName: displayName,
      uid: uid,
    };

    dispatch({
      type: ActionType.ON_LOGIN,
      payload: user,
    });
  };
};
