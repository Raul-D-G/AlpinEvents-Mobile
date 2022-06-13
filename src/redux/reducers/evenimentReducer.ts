import {EvenimentAction, EvenimentModel} from '../actions/evenimentActions';
import {ActionType} from '../action-type';

type EvenimentState = {
  eveniment: EvenimentModel;
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
};

const initialState = {
  eveniment: {} as EvenimentModel,
  organizator: '',
  nume: '',
  data: new Date(),
  nrPersoane: 0,
  idMeniu: 0,
  pret: 0,
  avans: false,
  plata: 0,
  image: '',
  uid: '',
  id: '',
};

const EvenimentReducer = (
  state: EvenimentState = initialState,
  action: EvenimentAction,
) => {
  switch (action.type) {
    case ActionType.SET_EVENT:
      return {
        ...state,
        eveniment: action.payload,
      };
    case ActionType.SET_EVENT_ORGANIZATOR:
      return {
        ...state,
        organizator: action.payload,
      };
    case ActionType.SET_EVENT_NUME:
      return {
        ...state,
        nume: action.payload,
      };
    case ActionType.SET_EVENT_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ActionType.SET_EVENT_NRPERSOANE:
      return {
        ...state,
        nrPersoane: action.payload,
      };
    case ActionType.SET_EVENT_IDMENIU:
      return {
        ...state,
        idMeniu: action.payload,
      };
    case ActionType.SET_EVENT_PRET:
      return {
        ...state,
        pret: action.payload,
      };
    case ActionType.SET_EVENT_AVANS:
      return {
        ...state,
        avans: action.payload,
      };
    case ActionType.SET_EVENT_PLATA:
      return {
        ...state,
        plata: action.payload,
      };
    case ActionType.SET_EVENT_IMG:
      return {
        ...state,
        image: action.payload,
      };
    case ActionType.SET_EVENT_UID:
      return {
        ...state,
        uid: action.payload,
      };
    default:
      return state;
  }
};

export {EvenimentReducer};
