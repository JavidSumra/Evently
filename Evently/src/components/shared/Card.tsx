// import { formatDateTime } from "@/lib/utils";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Link } from "react-router-dom";
import EditImg from "../../assets/icons/edit.svg";
import ArraowImg from "../../assets/icons/arrow.svg";
import { useTranslation } from "react-i18next";

// type CardProps = {
//   event: IEvent;
//   hasOrderLink?: boolean;
//   hidePrice?: boolean;
// };

const Card = ({ event, hasOrderLink, hidePrice }: any) => {
  const {
    i18n: { language },
  } = useTranslation();
  const userData = localStorage.getItem("userData");

  const isLogin = userData && JSON.parse(userData);
  const isEventCreator = event?.organizer == isLogin?._id;

  const currency =
    language === "en" ? "USD" : language === "hn" ? "INR" : "EUR";

  return (
    <div className="group relative flex min-h-[300px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        to={""}
        style={{ backgroundImage: `url(${event.coverImage})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 rounded-t"
      />
      {/* IS EVENT CREATOR ... */}

      {isLogin?._id && isEventCreator && (
        <div className="hidden group-hover:flex">
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
            <Link to={`/events/update`}>
              <img src={EditImg} alt="edit" width={20} height={20} />
            </Link>

            <DeleteConfirmation  eventId={event?._id} />
          </div>
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree
                ? "FREE"
                : `${formatCurrency(event?.price, language, currency)}`}
            </span>
            <p className="p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
              {event.category}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateAndTime(new Date(event?.startDateTime), language)}
        </p>

        <Link to={`/events/`}>
          <p className="line-clamp-2 flex-1 text-black font-bold">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event?.firstName} {event?.lastName}
          </p>

          {hasOrderLink && (
            <Link to={`/orders?eventId=`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <img src={ArraowImg} alt="search" width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;

// Function to Format Date and Time
function formatDateAndTime(date: Date, language: string): string {
  console.log(language);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat(
    `${language}-${language.toUpperCase()}`,
    options
  ).format(date);
}

// Function to format Currency
function formatCurrency(
  amount: number,
  locale: string = "en",
  currency: string
): string {
  return new Intl.NumberFormat(`${locale}-${locale.toUpperCase()}`, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
