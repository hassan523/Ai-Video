import React, { useState } from "react";
import Contact_us_gif from "../../assets/contactUs/side_img.gif";
import style from "./contactus.module.css";
import { Container } from "react-bootstrap";
import right_chain from "../../assets/contact_right_chain.png";
import { useContactMutation } from "../../../redux/Auth/auth";

const Contact = () => {
  const [query, setQuery] = useState("");
  const [fields, setFields] = useState({
    email: "",
    firstName: "",
    lastName: "",
    message: "",
  });

  const { email, firstName, lastName, message } = fields;

  const onChangeHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const [contact] = useContactMutation();

  const onSubmit = async () => {
    try {
      const res = await contact({
        query,
        email,
        firstName,
        lastName,
        message,
      });
      if (!res.error) {
        alert("Contact successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Sometihng Went Wrong Error");
    }
  };

  console.log(query);

  return (
    <section className={style.Contact_us_wrapper}>
      <img src={Contact_us_gif} alt="no img found" className={style.gif_img} />
      <div className={style.contact_us_right}>
        <img src={right_chain} alt="" className={style.right_img} />
        <Container className={style.contact_us_container}>
          <div>
            <h1 style={{ color: "black" }}>Contact US</h1>
            <p style={{ color: "white" }}>
              If you have any questions, suggestions, or feedback, please don't
              hesitate to reach out to us. We value your input and are committed
              to enhancing your experience with Yousummarise.
            </p>
          </div>
          <select
            defaultValue="Question or Feedback"
            className={style.Contact_select}
            onChange={(e) => setQuery(e.target.value)}
          >
            <option defaultValue="Question or Feedback">
              Question or Feedback
            </option>
            <option value="Question"> Question</option>
            <option value="Feedback">Feedback</option>
          </select>
          <div className={style.contact_us_fields}>
            <input
              type="text"
              placeholder="Enter your email..."
              className={style.input2}
              name="email"
              value={fields.email}
              onChange={onChangeHandler}
            />
          </div>

          <div className={style.contact_us_fields}>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={fields.firstName}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={fields.lastName}
              onChange={onChangeHandler}
            />
          </div>
          <div className={style.contact_us_fields}>
            <textarea
              type="text"
              placeholder="Message..."
              className={style.input2}
              name="message"
              value={fields.message}
              onChange={onChangeHandler}
              rows="5"
              color="5"
            />
          </div>
          <button onClick={onSubmit} className={style.contact_us_btn}>
            Submit
          </button>
        </Container>
      </div>
    </section>
  );
};

export default Contact;
