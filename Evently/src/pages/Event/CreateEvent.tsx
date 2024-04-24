import EventForm from "@/components/shared/EventForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { t } from "i18next";
import { SparklesIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const CreateEvent = () => {
  //   const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left px-4">
          {t("createEvent")}
        </h3>
      </section>

      <div className="wrapper my-8 relative">
        <div className="absolute -top-4 right-0 -bottom-2">
          <Link to="/events/create/help/AI">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SparklesIcon />
                </TooltipTrigger>
                <TooltipContent>Generate Content through AI</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
        <EventForm />
        <Outlet />
      </div>
    </>
  );
};

export default CreateEvent;
