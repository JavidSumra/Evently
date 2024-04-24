import React from "react";

export interface AI_Event_Response {
  title: string;
  category: string;
  description: string;
  thumbnailImagePrompt: string;
  coverImage: string;
  startDateTime: string;
  endDateTime: string;
  price: string;
  isFree: boolean;
  location: string;
}

export interface EventListState {
  event_Content: AI_Event_Response;
  errorMessage: string;
  isLoading: boolean;
  isError: boolean;
}

export const initialEventData: AI_Event_Response = {
  title: "",
  category: "",
  description: "",
  thumbnailImagePrompt: "",
  coverImage: "",
  startDateTime: "",
  endDateTime: "",
  price: "",
  isFree: false,
  location: "",
};

export const initialState: EventListState = {
  event_Content: initialEventData,
  errorMessage: "",
  isError: false,
  isLoading: false,
};

export enum EventsAvailableActions {
  FETCH_AI_EVENT_REQUEST = "FETCH_AI_EVENT_REQUEST",
  FETCH_AI_EVENT_SUCCESS = "FETCH_AI_EVENT_SUCCESS",
  FETCH_AI_EVENT_FAILURE = "FETCH_AI_EVENT_FAILURE",
}

export type EventsActions =
  | { type: EventsAvailableActions.FETCH_AI_EVENT_REQUEST }
  | {
      type: EventsAvailableActions.FETCH_AI_EVENT_SUCCESS;
      payload: AI_Event_Response;
    }
  | { type: EventsAvailableActions.FETCH_AI_EVENT_FAILURE; payload: string };

export type EventsDispatch = React.Dispatch<EventsActions>;
