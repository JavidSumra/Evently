/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useReducer } from "react";
import { AI_Event_ContentReducer } from "./reducer";
import { EventListState, EventsDispatch, initialState } from "./types";

const AI_Event_ResponseStateContext =
  createContext<EventListState>(initialState);
const EventDispatchContext = createContext<EventsDispatch>(() => {});

export const AIEventProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispacth] = useReducer(AI_Event_ContentReducer, initialState);
  return (
    <AI_Event_ResponseStateContext.Provider value={state}>
      <EventDispatchContext.Provider value={dispacth}>
        {children}
      </EventDispatchContext.Provider>
    </AI_Event_ResponseStateContext.Provider>
  );
};

export const useAIEventState = () => useContext(AI_Event_ResponseStateContext);
export const useAIEventDispatch = () => useContext(EventDispatchContext);
