import { createBrowserRouter } from "react-router-dom";

import Header from "@/components/shared/Header";
import Home from "@/pages/Home";
import Footer from "@/components/shared/Footer";
import CreateEvent from "@/pages/Event/CreateEvent";
import Signin from "@/pages/Signin";
import Profile from "@/pages/Profile";
import Signup from "@/pages/Signup";
import AIContent_Modal from "@/pages/Event/AIContentModal";

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
    children: [
      {
        path: "help/AI",
        element: <AIContent_Modal />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <>
        <Header />
        <Profile />
      </>
    ),
  },
]);

export default router;
