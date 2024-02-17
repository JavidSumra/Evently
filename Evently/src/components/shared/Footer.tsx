import FooterImage from "../../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <a href="#header">
          <img src={FooterImage} alt="logo" width={128} height={38} />
        </a>

        <p>2024 Evently. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
