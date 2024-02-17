import { createBrowserRouter } from "react-router-dom";

import Header from "@/components/shared/Header";
import Home from "@/pages/Home";
import Footer from "@/components/shared/Footer";
import CreateEvent from "@/pages/Event/CreateEvent";
import Signin from "@/pages/Signin";
import Profile from "@/pages/Profile";
import Signup from "@/pages/Signup";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/events/create",
    element: (
      <>
        <Header />
        <CreateEvent />
        <Footer />
      </>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
