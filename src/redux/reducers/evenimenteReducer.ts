import {EvenimentAction, EvenimentModel} from '../actions/evenimentActions';
import {ActionType} from '../action-type';

type EvenimenteState = {
  evenimente: Array<EvenimentModel>;
};

const initialState = {
  evenimente: [] as Array<EvenimentModel>,
};

const EvenimenteReducer = (
  state: EvenimenteState = initialState,
  action: EvenimentAction,
) => {
  switch (action.type) {
    case ActionType.GET_EVENTS:
      return {
        ...state,
        evenimente: action.payload,
      };
    case ActionType.SET_EVENTS:
      return {
        ...state,
        evenimente: action.payload,
      };
    default:
      return state;
  }
};

export {EvenimenteReducer};
