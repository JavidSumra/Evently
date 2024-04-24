import { API_ENDPOINT } from "../../config/constants";
import { EventsAvailableActions, EventsDispatch } from "./types";

import axios from "axios";

export const fetchAIEventResponse = async (
  dispatch: EventsDispatch,
  prompt: string
) => {
  try {
    dispatch({ type: EventsAvailableActions.FETCH_AI_EVENT_REQUEST });
    const res = (
      await axios.post(
        `${API_ENDPOINT}/event/NLP/input`,
        { prompt },
        {
          withCredentials: true,
        }
      )
    )?.data;

    dispatch({
      type: EventsAvailableActions.FETCH_AI_EVENT_SUCCESS,
      payload: res?.data,
    });
    console.log("Called");
  } catch (error) {
    console.log(error);
    dispatch({
      type: EventsAvailableActions.FETCH_AI_EVENT_FAILURE,
      payload: "Failed to Load Events",
    });
  }
};
