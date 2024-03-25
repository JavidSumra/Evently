import { API_ENDPOINT } from "../../constant/constant";
import { Events, EventsAvailableActions, EventsDispatch } from "./types";

import axios from "axios";

export const addEvent = async (dispatch: EventsDispatch, data: Events) => {
  try {
    dispatch({ type: EventsAvailableActions.CREATE_EVENT_REQUEST });

    const res = (
      await axios.post(`${API_ENDPOINT}/event/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
        withCredentials: true,
      })
    )?.data;
    dispatch({
      type: EventsAvailableActions.CREATE_EVENT_SUCCESS,
      payload: res,
    });
    return res;
  } catch (error) {
    console.log(error);
    dispatch({
      type: EventsAvailableActions.CREATE_EVENT_FAILURE,
      payload: "Error While Creating Event",
    });
  }
};

export const fetchEvents = async (dispatch: EventsDispatch) => {
  try {
    dispatch({ type: EventsAvailableActions.FETCH_EVENT_REQUEST });
    const res = (
      await axios.get(`${API_ENDPOINT}/event/details`, {
        withCredentials: true,
      })
    )?.data;

    dispatch({
      type: EventsAvailableActions.FETCH_EVENT_SUCCESS,
      payload: res?.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EventsAvailableActions.FETCH_EVENT_FAILURE,
      payload: "Failed to Load Events",
    });
  }
};

export const deleteEvent = async (
  dispatch: EventsDispatch,
  eventId: string
) => {
  try {
    dispatch({ type: EventsAvailableActions.DELETE_EVENT_REQUEST });
    const res = (
      await axios.delete(`${API_ENDPOINT}/event/delete/${eventId}`, {
        withCredentials: true,
      })
    )?.data;
    dispatch({ type: EventsAvailableActions.DELETE_EVENT_SUCCESS });
    fetchEvents(dispatch);
    return res;
  } catch (error) {
    console.log(error);
    dispatch({
      type: EventsAvailableActions.DELETE_EVENT_FAILURE,
      payload: "Failed to Delete an Event",
    });
  }
};
