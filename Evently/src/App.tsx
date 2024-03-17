import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { EventsProvider } from "./context/events/context";

function App() {
  return (
    <div>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
