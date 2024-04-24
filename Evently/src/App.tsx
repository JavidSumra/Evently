import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { EventsProvider } from "./context/events/context";
import { AIEventProvider } from "./context/AI_CONTENT/context";

function App() {
  return (
    <div>
      <EventsProvider>
        <AIEventProvider>
          <RouterProvider router={router} />
        </AIEventProvider>
      </EventsProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
