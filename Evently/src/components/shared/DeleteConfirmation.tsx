import { startTransition, useTransition } from "react";
// import { usePathname } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeletImg from "../../assets/icons/delete.svg";
import axios from "axios";
import { API_ENDPOINT } from "@/constant/constant";
import { useNavigate } from "react-router-dom";

// import { deleteEvent } from "@/lib/actions/event.actions";

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const navigate = useNavigate();
  let [isPending] = useTransition();

  const deleteEvent = async ({
    eventId,
  }: {
    eventId: String;
  }): Promise<void> => {
    const res = (
      await axios.delete(`${API_ENDPOINT}/event/delete/${eventId}`, {
        withCredentials: true,
      })
    )?.data;

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <img src={DeletImg} alt="edit" width={20} height={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this event
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={() => deleteEvent({ eventId })}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
