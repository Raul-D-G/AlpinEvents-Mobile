import {EvenimentModel} from './evenimentActions';
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';
import {ActionType} from '../action-type/index';

export interface MarkerModel {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
    marked: boolean;
    dotColor: string;
    eveniment: EvenimentModel;
  };
}

export interface SetMarker {
  readonly type: ActionType.SET_MARKED_DATE_CALENDAR;
  payload: MarkerModel;
}

export type CalendarAction = SetMarker;
