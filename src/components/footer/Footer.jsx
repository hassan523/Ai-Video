import React from "react";
import style from "./footer.module.css";
import { Container } from "react-bootstrap";
import { IoSendSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const homepage = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const aboutuspage = () => {
    navigate("/about-us");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className={style.footer_wrapper}>
        <Container fluid className={style.footer_container}>
          <div className={style.footer_main}>
            <div className={style.footer_div}>
              <div className={style.footer_logo}>
                <div className={style.social_logo}>
                  <img
                    src={logo}
                    width="70%"
                    className={style.footer_creater_name}
                    alt="logo"
                  />
                  <div className="d-flex gap-5 py-3">
                    <p>
                      <BsTwitter />
                    </p>
                    <p>
                      <FaFacebookF />
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.footer_middle_div}>
                <div className={style.our_services}>
                  <h3>Page</h3>
                  <ul>
                    <li role="button" onClick={homepage}>
                      Home
                    </li>
                    <li role="button" onClick={aboutuspage}>
                      About Us
                    </li>
                  </ul>
                </div>
                <div className={style.company}>
                  <h3>Links</h3>
                  <ul>
                    <li role="button">Term Of Use</li>
                    <li role="button">Privacy Policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={style.copyright}>
        <p>Copyright 2023 @yousummarise all right reserved </p>
      </div>
    </>
  );
};

export default Footer;
