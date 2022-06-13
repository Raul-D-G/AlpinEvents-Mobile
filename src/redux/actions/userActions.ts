import {ActionType} from './../action-type/index';

export interface UserModel {
  email: string;
  displayName: string;
  uid: string;
  idToken: string;
}

export interface LoginAction {
  readonly type: ActionType.ON_LOGIN;
  payload: UserModel;
}

export interface ErrorAction {
  readonly type: ActionType.ON_ERROR;
  payload: any;
}

export interface SetEmail {
  readonly type: ActionType.SET_USER_EMAIL;
  payload: string;
}

export interface SetPassword {
  readonly type: ActionType.SET_USER_PASSWORD;
  payload: string;
}

export type UserAction = LoginAction | ErrorAction | SetEmail | SetPassword;
