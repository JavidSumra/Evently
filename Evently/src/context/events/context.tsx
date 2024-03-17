/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useReducer } from "react";
import { EventReducer } from "./reducer";
import { EventListState, EventsDispatch, initialState } from "./types";

const EventsStateContext = createContext<EventListState>(initialState);
const EventsDispatchContext = createContext<EventsDispatch>(() => {});

export const EventsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispacth] = useReducer(EventReducer, initialState);
  return (
    <EventsStateContext.Provider value={state}>
      <EventsDispatchContext.Provider value={dispacth}>
        {children}
      </EventsDispatchContext.Provider>
    </EventsStateContext.Provider>
  );
};

export const useEventsState = () => useContext(EventsStateContext);
export const useEventsDispatch = () => useContext(EventsDispatchContext);
