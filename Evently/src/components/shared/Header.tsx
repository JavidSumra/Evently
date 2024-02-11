import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link to="/" className="w-36">
          <img src={Logo} width={128} height={38} alt="Evently logo" />
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          <MobileNav />
          <Button asChild className="rounded-full" size="lg">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
