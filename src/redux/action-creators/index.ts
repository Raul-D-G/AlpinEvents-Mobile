import {MarkerModel, CalendarAction} from './../actions/calendarActions';
import {EvenimentModel} from './../actions/evenimentActions';
import {Dispatch} from 'redux';
import {BASE_URL} from '../../utils/AppConst';
import {ActionType} from '../action-type';
import {EvenimentAction} from '../actions/evenimentActions';
import {UserAction, UserModel} from '../actions/userActions';

import axios from 'axios';

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
export const onLogin = (
  email: string,
  displayName: string,
  uid: string,
  idToken: string,
) => {
  return (dispatch: Dispatch<UserAction>) => {
    const user: UserModel = {
      email: email,
      displayName: displayName,
      uid: uid,
      idToken: idToken,
    };

    dispatch({
      type: ActionType.ON_LOGIN,
      payload: user,
    });
  };
};

export const setEvents = (evenimente: Array<EvenimentModel> | []) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENTS,
      payload: evenimente,
    });
  };
};

export const getEvents = (uid: string, idToken: string) => {
  return async (dispatch: Dispatch<EvenimentAction>) => {
    const result = await axios
      .get(BASE_URL + `evenimente/${uid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + idToken,
        },
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });

    if (result) {
      result.data.forEach((event: EvenimentModel) => {
        event.data = new Date(event.data);
      });
      dispatch({
        type: ActionType.GET_EVENTS,
        payload: result.data,
      });
    }
  };
};

// EVENIMENT

export const setEvent = (eveniment: EvenimentModel) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT,
      payload: eveniment,
    });
  };
};

export const setEventOrganizator = (organizator: string) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_ORGANIZATOR,
      payload: organizator,
    });
  };
};

export const setEventNume = (nume: string) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_NUME,
      payload: nume,
    });
  };
};

export const setEventData = (data: Date) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_DATA,
      payload: data,
    });
  };
};

export const setEventNrPersoane = (nrPersoane: number) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_NRPERSOANE,
      payload: nrPersoane,
    });
  };
};

export const setEventIdMeniu = (idMeniu: number) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_IDMENIU,
      payload: idMeniu,
    });
  };
};

export const setEventPret = (pret: number) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_PRET,
      payload: pret,
    });
  };
};

export const setEventAvans = (avans: boolean) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_AVANS,
      payload: avans,
    });
  };
};

export const setEventPlata = (plata: number) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_PLATA,
      payload: plata,
    });
  };
};

export const setEventImg = (image: string) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_IMG,
      payload: image,
    });
  };
};

export const setEventUid = (uid: string) => {
  return (dispatch: Dispatch<EvenimentAction>) => {
    dispatch({
      type: ActionType.SET_EVENT_UID,
      payload: uid,
    });
  };
};

// CALENDAR
export const setMarker = (marker: MarkerModel) => {
  return (dispatch: Dispatch<CalendarAction>) => {
    dispatch({
      type: ActionType.SET_MARKED_DATE_CALENDAR,
      payload: marker,
    });
  };
};
