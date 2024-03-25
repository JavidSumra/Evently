import { Reducer } from "react";
import {
  EventListState,
  EventsActions,
  EventsAvailableActions,
  initialState,
} from "./types";

export const EventReducer: Reducer<EventListState, EventsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case EventsAvailableActions.FETCH_EVENT_REQUEST:
      return { ...state, isLoading: true };
    case EventsAvailableActions.FETCH_EVENT_SUCCESS:
      return { ...state, isLoading: false, Events: action.payload };
    case EventsAvailableActions.FETCH_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case EventsAvailableActions.CREATE_EVENT_REQUEST:
      return { ...state, isLoading: true };
    case EventsAvailableActions.CREATE_EVENT_SUCCESS:
      return { ...state, isLoading: false, Events: action.payload };
    case EventsAvailableActions.CREATE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case EventsAvailableActions.DELETE_EVENT_REQUEST:
      return { ...state, isLoading: true };
    case EventsAvailableActions.DELETE_EVENT_SUCCESS:
      return { ...state, isLoading: false };
    case EventsAvailableActions.DELETE_EVENT_FAILURE:
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
