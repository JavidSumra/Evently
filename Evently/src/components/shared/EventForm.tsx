import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import UploadImg from "../../assets/icons/upload.svg";
import LocationImg from "../../assets/icons/location.svg";
import CalendarImg from "../../assets/icons/calendar.svg";
import DollarImg from "../../assets/icons/dollar.svg";
import UrlImg from "../../assets/icons/link.svg";

import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { API_ENDPOINT } from "@/constant/constant";
import { toast } from "react-toastify";

interface EventDetails {
  title: String;
  category: String;
  description: String;
  Image: File | null;
  URL: String;
  startDateTime: Date;
  endDateTime: Date;
  price: String;
  isFree: Boolean;
  location: String;
}

const EventForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm<EventDetails>();
  const isFree = watch("isFree");

  // State variables for start and end dates
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());

  // State variable for Image
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const onSubmit: SubmitHandler<EventDetails> = async (data) => {
    try {
      if (!coverImage || !endDateTime || !startDateTime) {
        toast.error("Required Information Missing", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/events/create");
      }

      if (startDateTime && endDateTime && startDateTime > endDateTime) {
        toast.error("Please Provide Valid TimeLines", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/events/create");
      }

      setValue("Image", coverImage);

      data.startDateTime = startDateTime ? startDateTime : new Date();
      data.endDateTime = endDateTime ? endDateTime : new Date();

      const res = (
        await axios.post(`${API_ENDPOINT}/event/create`, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
          withCredentials: true,
        })
      )?.data;

      console.log(res);

      if (res.success) {
        toast.success("Event Created Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      } else {
        toast.error("Failed to Create Event", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/events/create");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isFree && setValue("price", "0");
  }, [isFree]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2 mx-2">
          <input
            type="text"
            className="input-field w-full"
            placeholder="Event Title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="w-1/2">
          <select className="select-field w-full" {...register("category")}>
            <option value="Javid" className="select-item">
              Javid
            </option>
            <option value="" className="select-item p-2 hover:bg-blue-400">
              Add New Category
            </option>
          </select>
        </div>
      </div>

      <div className="flex">
        <textarea
          id=""
          {...register("description", { required: true })}
          cols={30}
          rows={10}
          className="textarea w-1/2 m-2 rounded-lg"
        ></textarea>
        <div className="w-1/2">
          {coverImage ? (
            <img
              src={
                coverImage
                  ? URL.createObjectURL(coverImage).toString()
                  : undefined
              }
              alt="Image Preview"
              className="w-full h-full m-2 rounded flex items-center justify-evenly"
            />
          ) : (
            <div className="w-full h-full m-2 bg-grey-50 rounded-lg flex items-center justify-evenly flex-col">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(event) =>
                  event.target?.files && setCoverImage(event?.target?.files[0])
                }
              />
              <div>
                <img
                  src={UploadImg}
                  alt="Upload Image"
                  className="w-[110px] h-full"
                />
              </div>

              <div>
                <div className="font-bold py-4 text-center">SVG,PNG,JPG</div>
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer p-3 rounded-lg text-white react-datepicker__time-list-item--selected"
                >
                  Select from Computer
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row my-4">
        <div className="flex justify-between h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <img src={LocationImg} alt="Location" width={24} height={24} />
          <input
            {...register("location", { required: true })}
            placeholder="Event location or Online"
            className="w-full outline-none bg-grey-50 rounded"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <img
            src={CalendarImg}
            alt="calendar"
            width={24}
            height={24}
            className="filter-grey"
          />
          <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
          <DatePicker
            value={
              startDateTime
                ? new Date(startDateTime).toLocaleString("en-In")
                : undefined
            }
            onChange={(date) => setStartDateTime(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            wrapperClassName="datePicker"
          />
        </div>

        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <img
            src={CalendarImg}
            alt="calendar"
            width={24}
            height={24}
            className="filter-grey"
          />
          <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
          <DatePicker
            value={
              endDateTime
                ? new Date(endDateTime).toLocaleString("en-In")
                : undefined
            }
            onChange={(date) => setEndDateTime(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            wrapperClassName="datePicker"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row my-4">
        <div className="flex h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 justify-between">
          <img
            src={DollarImg}
            alt="dollar"
            width={24}
            height={24}
            className="filter-grey"
          />
          <input
            type="number"
            placeholder="Price"
            {...register("price")}
            className="w-full outline-none p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <div className="flex items-center">
            <label
              htmlFor="isFree"
              className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Free Ticket
            </label>
            <input
              type="checkbox"
              {...register("isFree", { required: true })}
              id="isFree"
              className="mr-2 h-5 w-5 border-2 border-primary-500"
            />
          </div>
        </div>

        <div className="flex justify-between h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <img src={UrlImg} alt="link" width={24} height={24} />

          <input
            placeholder="URL"
            {...register("URL", { required: true })}
            className="w-full bg-grey-50 outline-none px-2"
          />
        </div>
      </div>

      <div>
        <button className="bg-[#624cf5] font-bold text-white p-4 w-full rounded-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EventForm;
