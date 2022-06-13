import {ActionType} from './../action-type/index';

export interface EvenimentModel {
  organizator: string;
  nume: string;
  data: Date;
  nrPersoane: number;
  idMeniu: number;
  pret: number;
  avans: boolean;
  plata: number;
  image: string;
  uid: string;
  id: string;
}

// EVENIMENTE
export interface GetEvents {
  readonly type: ActionType.GET_EVENTS;
  payload: Array<EvenimentModel> | [];
}

export interface SetEvents {
  readonly type: ActionType.SET_EVENTS;
  payload: Array<EvenimentModel> | [];
}

// EVENIMENT
export interface SetEvent {
  readonly type: ActionType.SET_EVENT;
  payload: EvenimentModel;
}

export interface SetEventOrganizator {
  readonly type: ActionType.SET_EVENT_ORGANIZATOR;
  payload: string;
}
export interface SetEventNume {
  readonly type: ActionType.SET_EVENT_NUME;
  payload: string;
}
export interface SetEventData {
  readonly type: ActionType.SET_EVENT_DATA;
  payload: Date;
}
export interface SetEventNrPersoane {
  readonly type: ActionType.SET_EVENT_NRPERSOANE;
  payload: number;
}
export interface SetEventIdMeniu {
  readonly type: ActionType.SET_EVENT_IDMENIU;
  payload: number;
}
export interface SetEventPret {
  readonly type: ActionType.SET_EVENT_PRET;
  payload: number;
}
export interface SetEventAvans {
  readonly type: ActionType.SET_EVENT_AVANS;
  payload: boolean;
}
export interface SetEventPlata {
  readonly type: ActionType.SET_EVENT_PLATA;
  payload: number;
}
export interface SetEventImg {
  readonly type: ActionType.SET_EVENT_IMG;
  payload: string;
}
export interface SetEventUid {
  readonly type: ActionType.SET_EVENT_UID;
  payload: string;
}

export type EvenimentAction =
  | GetEvents
  | SetEvents
  | SetEvent
  | SetEventOrganizator
  | SetEventNume
  | SetEventData
  | SetEventNrPersoane
  | SetEventIdMeniu
  | SetEventPret
  | SetEventAvans
  | SetEventPlata
  | SetEventImg
  | SetEventUid;
