import React from "react";
import Contact_us_gif from "../../assets/contactUs/side_img.gif";
import style from "./contactus.module.css";
import { Container } from "react-bootstrap";

const Contact = () => {
  return (
    <section className={style.Contact_us_wrapper}>
      <img
        src={Contact_us_gif}
        alt="no img found"
        style={{
          width: "100%",
          objectFit: "contain",
          height: "30rem",
        }}
      />
      <div className={style.contact_us_right}>
        <Container className={style.contact_us_container}>
          <div>
            <h1>Contact Us</h1>
            <p style={{ color: "white" }}>
              If you have any questions, suggestions, or feedback, please don't
              hesitate to reach out to us. We value your input and are committed
              to enhancing your experience with YouSummarised.
            </p>
          </div>

          <div className={style.contact_us_fields}>
            <input type="text" placeholder="Enter your Name" />
            <input type="text" placeholder="Enter your email..." />
          </div>
          <button className={style.contact_us_btn}>Subscribe</button>
        </Container>
      </div>
    </section>
  );
};

export default Contact;
