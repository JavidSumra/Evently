import React from "react";

export interface Events {
  title: string;
  category: string;
  description: string;
  Image: File | null;
  URL: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: Boolean;
  location: string;
}

export interface EventListState {
  Events: Events[];
  errorMessage: string;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: EventListState = {
  Events: [],
  errorMessage: "",
  isError: false,
  isLoading: false,
};

export enum EventsAvailableActions {
  FETCH_EVENT_REQUEST = "FETCH_EVENT_REQUEST",
  FETCH_EVENT_SUCCESS = "FETCH_EVENT_SUCCESS",
  FETCH_EVENT_FAILURE = "FETCH_EVENT_FAILURE",
  CREATE_EVENT_REQUEST = "CREATE_EVENT_REQUEST",
  CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS",
  CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE",
  DELETE_EVENT_REQUEST = "DELETE_EVENT_REQUEST",
  DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS",
  DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE",
}

export type EventsActions =
  | { type: EventsAvailableActions.FETCH_EVENT_REQUEST }
  | { type: EventsAvailableActions.FETCH_EVENT_SUCCESS; payload: Events[] }
  | { type: EventsAvailableActions.FETCH_EVENT_FAILURE; payload: string }
  | { type: EventsAvailableActions.CREATE_EVENT_REQUEST }
  | { type: EventsAvailableActions.CREATE_EVENT_SUCCESS; payload: Events[] }
  | { type: EventsAvailableActions.CREATE_EVENT_FAILURE; payload: string }
  | { type: EventsAvailableActions.DELETE_EVENT_REQUEST }
  | { type: EventsAvailableActions.DELETE_EVENT_SUCCESS }
  | { type: EventsAvailableActions.DELETE_EVENT_FAILURE; payload: string };

export type EventsDispatch = React.Dispatch<EventsActions>;
