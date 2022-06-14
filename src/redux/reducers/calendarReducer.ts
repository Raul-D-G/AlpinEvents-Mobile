import {MarkerModel, CalendarAction} from './../actions/calendarActions';
import {ActionType} from '../action-type';

type CalendarState = {
  marker: MarkerModel;
};

const initialState = {
  marker: {} as MarkerModel,
};

const CalendarReducer = (
  state: CalendarState = initialState,
  action: CalendarAction,
) => {
  switch (action.type) {
    case ActionType.SET_MARKED_DATE_CALENDAR:
      return {
        ...state,
        marker: action.payload,
      };

    default:
      return state;
  }
};

export {CalendarReducer};
