import { Reducer } from "react";
import {
  EventListState,
  EventsActions,
  EventsAvailableActions,
  initialState,
} from "./types";

export const AI_Event_ContentReducer: Reducer<EventListState, EventsActions> = (
  state = initialState,
  action
) => {
  console.log(action.type);
  switch (action.type) {
    case EventsAvailableActions.FETCH_AI_EVENT_REQUEST:
      return { ...state, isLoading: true };
    case EventsAvailableActions.FETCH_AI_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        event_Content: { ...action.payload },
      };
    case EventsAvailableActions.FETCH_AI_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
