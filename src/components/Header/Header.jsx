import React from "react";
import style from "./header.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={style.header_wrapper}>
      <div className={style.header_div}>
        <img
          src={logo}
          onClick={() => navigate("/")}
          role="button"
          alt="logo"
          width="30%"
        />
        <div
          className={`d-flex align-items-center justify-content-between ${style.header_right}`}
        >
          <h6
            className="m-0"
            onClick={() => navigate("/about-us")}
            role="button"
          >
            ABOUT US
          </h6>
          <div className="gap-3 justify-content-round d-flex">
            <button onClick={() => navigate("/login")}>Log in</button>
            <button onClick={() => navigate("/signup")}>Sign in</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
