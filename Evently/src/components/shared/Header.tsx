import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Logo from "../../assets/images/logo.svg";
import axios from "axios";
import { API_ENDPOINT } from "@/constant/constant";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticate = !!localStorage.getItem("userData");

  const handleLogin = async () => {
    const refreshToken = document.cookie.split("refreshToken=")[1];
    try {
      if (refreshToken) {
        const res = (
          await axios.get(`${API_ENDPOINT}/users/refresh/token`, {
            withCredentials: true,
          })
        )?.data;

        if (res.data) {
          localStorage.setItem("userData", JSON.stringify(res.data));
          toast.success(`Welcome to Evently ${res.data.userName}`, {
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
        }
      } else {
        navigate("/signin");
      }
    } catch (error) {}
  };

  return (
    <header className="w-full border-b" id="header">
      <div className="wrapper flex items-center justify-between">
        <Link to="/" className="w-36">
          <img src={Logo} width={128} height={38} alt="Evently logo" />
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          <MobileNav />
          {isAuthenticate ? (
            <></>
          ) : (
            <Button
              asChild
              className="rounded-full cursor-pointer"
              size="lg"
              onClick={handleLogin}
            >
              <div>Login</div>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
