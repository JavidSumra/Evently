import DatePicker from "react-datepicker";

import UploadImg from "../../assets/icons/upload.svg";
import LocationImg from "../../assets/icons/location.svg";
import CalendarImg from "../../assets/icons/calendar.svg";
import DollarImg from "../../assets/icons/dollar.svg";
import UrlImg from "../../assets/icons/link.svg";

import "react-datepicker/dist/react-datepicker.css";

import { useForm, SubmitHandler } from "react-hook-form";

interface EventDetails {
  title: String;
  category: String;
}

const EventForm = () => {
  return (
    <form>
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2 mx-2">
          <input
            type="text"
            className="input-field w-full"
            placeholder="Event Title"
          />
        </div>
        <div className="w-1/2">
          <select name="Category" id="" className="select-field w-full">
            <option value="" className="select-item">
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
          name=""
          id=""
          cols={30}
          rows={10}
          className="textarea w-1/2 m-2 rounded-lg"
        ></textarea>
        <div className="w-1/2">
          <div className="w-full h-full m-2 bg-grey-50 rounded-lg flex items-center justify-evenly flex-col">
            <input
              type="file"
              name="fileUpload"
              id="fileUpload"
              className="hidden"
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
        </div>
      </div>

      <div className="flex flex-col gap-5 md:flex-row my-4">
        <div className="flex justify-between h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <img src={LocationImg} alt="Location" width={24} height={24} />
          <input
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
            // selected={field.value}
            onChange={() => console.log("Change")}
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
            // selected={field.value}
            onChange={() => console.log("Change")}
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
              // onCheckedChange={field.onChange}
              // checked={field.value}
              id="isFree"
              className="mr-2 h-5 w-5 border-2 border-primary-500"
            />
          </div>
        </div>

        <div className="flex justify-between h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
          <img src={UrlImg} alt="link" width={24} height={24} />

          <input
            placeholder="URL"
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
