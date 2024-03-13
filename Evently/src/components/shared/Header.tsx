import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Logo from "../../assets/images/logo.svg";
import axios from "axios";
import { API_ENDPOINT } from "@/constant/constant";
import { toast } from "react-toastify";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { t } from "i18next";

const Header = () => {
  const navigate = useNavigate();

  const isAuthenticate = !!localStorage.getItem("userData");

  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = (language: string) => {
    setCurrentLanguage(language);
    changeLanguage(language);

    console.log(currentLanguage);
  };

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    const res = (
      await axios.get(`${API_ENDPOINT}/users/logout`, {
        withCredentials: true,
      })
    )?.data;

    if (res.statusCode === 200) {
      navigate("/");
    }

    if (!res?.success) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  const handleLogin = async () => {
    const refreshToken = document.cookie.split("refreshToken=")[1];
    if (refreshToken) {
      const res = (
        await axios.get(`${API_ENDPOINT}/users/refresh/token`, {
          withCredentials: true,
        })
      )?.data;

      console.log(res);

      if (res.data && res.success) {
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

        <div className="flex items-center w-36 justify-end gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="rounded-full cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                        />
                      </svg>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {t("nav.translate.lang")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className={`${
                        currentLanguage === "en" ? "text-blue-500" : ""
                      }`}
                      onClick={() => handleChangeLanguage("en")}
                    >
                      {t("nav.translate.english")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${
                        currentLanguage === "hn" ? "text-blue-500" : ""
                      }`}
                      onClick={() => handleChangeLanguage("hn")}
                    >
                      {t("nav.translate.hindi")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${
                        currentLanguage === "te" ? "text-blue-500" : ""
                      }`}
                      onClick={() => handleChangeLanguage("es")}
                    >
                      {t("nav.translate.spanish")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>{t("nav.translate.tooltip")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isAuthenticate ? (
            <Button
              onClick={handleLogout}
              className="rounded-full cursor-pointer"
              size="lg"
            >
              <div>{t("button.Logout")}</div>
            </Button>
          ) : (
            <Button
              asChild
              className="rounded-full cursor-pointer"
              size="lg"
              onClick={handleLogin}
            >
              <div>{t("button.Login")}</div>
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
