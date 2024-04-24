import { useTransition } from "react";
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
import { useNavigate } from "react-router-dom";
import { useEventsDispatch } from "@/context/events/context";
import { deleteEvent } from "@/context/events/actions";

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const navigate = useNavigate();
  const dispatch = useEventsDispatch();
  let [isPending] = useTransition();

  const deleteEventDetail = async ({
    eventId,
  }: {
    eventId: string;
  }): Promise<void> => {
    const res = await deleteEvent(dispatch, eventId);

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <img
          src={DeletImg}
          alt="edit"
          width={20}
          height={20}
          id="delete-event"
        />
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

          <AlertDialogAction
            onClick={() => deleteEventDetail({ eventId })}
            id="confirm-delete"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
