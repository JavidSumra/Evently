import { Link } from "react-router-dom";
import FooterImage from "../../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link to="/">
          <img src={FooterImage} alt="logo" width={128} height={38} />
        </Link>

        <p>2023 Evently. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
