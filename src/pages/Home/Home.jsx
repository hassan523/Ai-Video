import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import { Container } from "react-bootstrap";
import img_one from "../../assets/slider/img_one.png";
import img_two from "../../assets/slider/img_two.png";
import img_three from "../../assets/slider/img_three.png";
import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import svg_one from "../../assets/Third_Section/third_section_one_img.svg";
import svg_two from "../../assets/Third_Section/third_section_img_two.svg";
import svg_three from "../../assets/Third_Section/third_section_img_three.svg";
import Contact from "../../components/ContactUs/Contact";
import img_rob from "../../assets/img_rob.png";
import main_gif from "../../assets/main_gif.gif";
import ytGiff from "../../assets/ytGif.gif";
import back from "../../assets/back.svg";
import linkSvg from "../../assets/link.svg";
import Spinner from "react-bootstrap/Spinner";
import { Autoplay } from "swiper/modules";
import "swiper/element/css/autoplay"; // Import Swiper CSS

import axios from "axios";
import API_BASE_URL from "../../config";
const faqs = [
  {
    question: "What types of videos can be summarise?",
    answer:
      "Currently, we only support YouTube video links. In the future, we may support other video platforms. ",
  },
  {
    question: "Can I customize the length of the summary?",
    answer:
      " Based on feedback, we have implemented three options for summary length - short, medium, and long - to provide more flexibility.",
  },
  {
    question:
      "Why did I receive an error message that states a summary cannot be provided?",
    answer:
      "Due to copyright law, we can only summarise non-copyrighted content in the free model. ",
  },
  {
    question: "Are the summaries 100% accurate?",
    answer:
      "While we cannot guarantee 100% accuracy in our AI-generated summaries, we aim to provide useful, high-quality responses to the best of our abilities.",
  },
  {
    question: "Can the tool summarise in other languages?",
    answer:
      "Currently, all summaries are in English. We are working on adding other languages in the future.",
  },
];

const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  400: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  786: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
};

const slider_img = [
  img_one,
  img_two,
  img_three,
  img_one,
  img_two,
  img_three,
  img_one,
  img_two,
  img_three,
];
const Home = () => {
  const [isSummary, setIsSummary] = useState(false);

  // api states
  const [check, setCheck] = useState("");
  const [url, seturl] = useState("");
  const [keyPoints, setKeyPoints] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);

  const [onSubmit, setonSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [ytData, setYtData] = useState("");
  const [keyPointData, setKeyPointData] = useState([]);

  const [currCount, setCurrCount] = useState(null);

  const handleSubmit = async () => {
    if (url && (keyPoints || wordCounter)) {
      try {
        setisLoading(true);

        if (check === "paragraph") {
          const paraFormData = new FormData();
          paraFormData.append("vidURL", url);
          paraFormData.append("contentType", check);
          paraFormData.append("wordCounter", wordCounter);

          const res = await axios.post(
            `${API_BASE_URL}/api/summary`,
            paraFormData
          );

          setYtData(res.data);

          if (res.status === 200) {
            setisLoading(false);
            setIsSummary(true);
            setCheck("");
            seturl("");
            setKeyPoints(0);
            setWordCounter(0);
          }

          setKeyPoints(null);
          setonSubmit(true);
        } else if (check === "points") {
          const pointsFormData = new FormData();
          pointsFormData.append("vidURL", url);
          pointsFormData.append("contentType", check);
          pointsFormData.append("keyPoints", keyPoints);

          const res = await axios.post(
            `${API_BASE_URL}/api/summary`,
            pointsFormData
          );

          setKeyPointData(res.data);
          setWordCounter(null);
          setonSubmit(true);

          if (res.status === 200) {
            setisLoading(false);
            setIsSummary(true);
            setCheck("");
            seturl("");
            setKeyPoints(0);
            setWordCounter(0);
          }
        } else {
          setisLoading(false);
          alert("Invalid Request");
        }
      } catch (error) {
        setisLoading(false);
        alert("Video Is Copyrighted");
        console.log(error);
      }
    } else {
      alert("Make Sure All The Fields Are Selected");
    }
  };

  useEffect(() => {
    const timerId = setInterval(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/get-counter`);
        if (res.status === 200) {
          setCurrCount(res.data);
        }
      } catch (error) {
        console.log(error);
        // alert("Alert Error");
      }
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  const handleCopy = () => {
    let text = document.getElementById("text");
    text.select();
    navigator.clipboard.write();
  };

  const handleReset = () => {
    setIsSummary(false);
    setCheck("");
    seturl("");
    setKeyPoints(0);
    setWordCounter(0);
  };

  console.log(
    check,
    "check",
    keyPoints,
    "keypoints",
    wordCounter,
    "wordCounter"
  );

  return (
    <div>
      <div className={style.white_box}></div>
      <div className={style.red_box}></div>
      <Header />
      <section className={style.main_wrapper}>
        <Container className={style.main_container}>
          <img
            src={main_gif}
            alt="no img"
            style={{
              position: "absolute",
              zIndex: "1",
              // height: "100%",
              width: "70%",
              filter: "blur(20px)",
            }}
            className={style.main_container_bg}
          />
          <div
            className={style.bannerAnimatedTxt}
            style={{ zIndex: "20", width: "100%" }}
          >
            <div id="animated-text-container">
              <h2 className="display-3">
                <span>Learn</span> <span>more</span> <span>in</span>{" "}
                <span>less</span> <span>time</span> <span> with </span>{" "}
                <span> AI-powered</span>{" "}
                <span style={{ color: "red" }}>summarise</span>
              </h2>
            </div>

            <div className={`pt-5 ${style.text_url}`}>
              <div className={style.inputFields}>
                <span className="ps-3">
                  <img src={linkSvg} alt="" />
                </span>
                <input
                  type="text"
                  placeholder="www.youtube.com/watch?example"
                  onChange={(e) => seturl(e.target.value)}
                  value={url}
                />
              </div>
              {isLoading ? (
                <div className={style.loader}>
                  <Spinner animation="border" />
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  summarise
                </button>
              )}
            </div>
            <div className={style.options_btn}>
              <button onClick={() => setCheck("paragraph")}>Text Form</button>
              <button onClick={() => setCheck("points")}>Bullet Points</button>
              {check === "paragraph" ? (
                <>
                  <button
                    onClick={() => {
                      setWordCounter(30);
                      setKeyPoints(null);
                    }}
                  >
                    Short
                  </button>
                  <button
                    onClick={() => {
                      setWordCounter(35);
                      setKeyPoints(null);
                    }}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => {
                      setWordCounter(40);
                      setKeyPoints(null);
                    }}
                  >
                    Long
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setWordCounter(null);
                      setKeyPoints(8);
                    }}
                  >
                    Short
                  </button>
                  <button
                    onClick={() => {
                      setWordCounter(null);

                      setKeyPoints(8);
                    }}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => {
                      setWordCounter(null);

                      setKeyPoints(10);
                    }}
                  >
                    Long
                  </button>
                </>
              )}
            </div>

            {isSummary ? (
              <div className={style.summary}>
                <h4
                  style={{ fontWeight: "800" }}
                  className="d-flex align-items-center justify-content-between"
                >
                  Here is your Summary{" "}
                  <p className="m-0" role="button" onClick={handleReset}>
                    Reset
                  </p>{" "}
                </h4>
                <div className={style.summary_inside}>
                  {ytData ? (
                    <p style={{ height: "10rem", overflow: "auto" }} id="text">
                      {ytData === "" ? (
                        <h6 className="py-2 text-center">
                          {" "}
                          Sorry, Couldn't able to read the data
                        </h6>
                      ) : (
                        ytData
                      )}
                    </p>
                  ) : keyPointData.length !== 0 ? (
                    keyPointData.map((item, index) => (
                      <p
                        key={index}
                        style={{ height: "10rem", overflow: "auto" }}
                        id="text"
                      >
                        {" "}
                        {item.point}
                      </p>
                    ))
                  ) : (
                    <h6 className="py-2 text-center">
                      {" "}
                      Sorry, Couldn't able to read the data
                    </h6>
                  )}

                  <div style={{ display: "flex" }}>
                    <button onClick={handleCopy}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="37"
                        height="40"
                        viewBox="0 0 37 40"
                        fill="none"
                      >
                        <path
                          d="M35.0343 27.6113C35.0343 32.8074 35.0343 35.4045 33.4198 37.019C31.8072 38.6316 29.2082 38.6316 24.0139 38.6316H12.9935C7.79926 38.6316 5.20028 38.6316 3.58763 37.019C1.97314 35.4027 1.97314 32.8074 1.97314 27.6113V22.1011M25.8506 5.57416C29.8455 5.5962 32.0092 5.77436 33.4198 7.18497C35.0343 8.79946 35.0343 11.3966 35.0343 16.5909V20.2643M11.1568 5.57416C7.16191 5.5962 4.99824 5.77436 3.58763 7.18497C2.17518 8.59558 1.99886 10.7592 1.97682 14.7541M12.9935 30.3664H24.0139"
                          stroke="#676767"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11.1567 4.65207C11.1567 3.92137 11.447 3.2206 11.9637 2.70392C12.4804 2.18724 13.1811 1.89697 13.9118 1.89697H23.0955C23.8262 1.89697 24.527 2.18724 25.0436 2.70392C25.5603 3.2206 25.8506 3.92137 25.8506 4.65207V6.4888C25.8506 7.2195 25.5603 7.92027 25.0436 8.43695C24.527 8.95363 23.8262 9.2439 23.0955 9.2439H13.9118C13.1811 9.2439 12.4804 8.95363 11.9637 8.43695C11.447 7.92027 11.1567 7.2195 11.1567 6.4888V4.65207Z"
                          stroke="#676767"
                          strokeWidth="2"
                        />
                        <path
                          d="M11.1568 23.9377H12.9935M25.8506 23.9377H18.5037M27.6874 17.5092H24.0139M18.5037 17.5092H9.32007"
                          stroke="#676767"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Copy Text
                    </button>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M19.0147 11.9586C19.1057 11.9584 19.1959 11.9763 19.28 12.0112C19.364 12.0461 19.4404 12.0973 19.5046 12.1619C19.5688 12.2264 19.6195 12.303 19.6539 12.3873C19.6884 12.4716 19.7057 12.5619 19.7051 12.6529V15.7905C19.7057 15.8811 19.6885 15.971 19.6544 16.0549C19.6203 16.1389 19.57 16.2153 19.5063 16.2798C19.4426 16.3443 19.3669 16.3956 19.2834 16.4308C19.1998 16.4659 19.1102 16.4843 19.0196 16.4848C18.929 16.4843 18.8393 16.4659 18.7558 16.4308C18.6723 16.3956 18.5966 16.3443 18.5329 16.2798C18.4692 16.2153 18.4189 16.1389 18.3848 16.0549C18.3507 15.971 18.3335 15.8811 18.3341 15.7905V14.6888C16.5508 17.6815 13.2408 19.7928 9.67428 19.7928C5.35564 19.7928 1.7362 17.1282 0.166408 13.0211C0.100496 12.85 0.104649 12.6598 0.177966 12.4917C0.251283 12.3236 0.387862 12.1912 0.558122 12.1231C0.910664 11.985 1.30825 12.1623 1.44535 12.5197C2.81635 16.1058 5.93831 18.4052 9.67428 18.4052C12.9755 18.4052 16.0592 16.2684 17.4958 13.358L16.0553 13.3678C15.9647 13.3679 15.8749 13.3502 15.7912 13.3156C15.7074 13.281 15.6313 13.2302 15.5672 13.1662C15.5031 13.1021 15.4522 13.0261 15.4175 12.9424C15.3828 12.8587 15.3649 12.769 15.3649 12.6783C15.3626 12.4954 15.4329 12.319 15.5605 12.1879C15.6881 12.0568 15.8626 11.9817 16.0455 11.9791L19.0147 11.9586ZM10.1522 0.207153C14.4689 0.207153 18.0893 2.87179 19.6591 6.97891C19.725 7.15003 19.7208 7.34022 19.6475 7.5083C19.5742 7.67638 19.4376 7.80881 19.2674 7.87691C19.1831 7.90976 19.0932 7.92555 19.0028 7.92336C18.9124 7.92116 18.8234 7.90103 18.7408 7.86413C18.6583 7.82723 18.5839 7.7743 18.5219 7.70841C18.46 7.64252 18.4118 7.56498 18.3801 7.4803C17.0091 3.89416 13.8872 1.5948 10.1512 1.5948C6.85003 1.5948 3.76626 3.7316 2.32965 6.64203L3.77018 6.63224C3.86079 6.63211 3.95055 6.64985 4.0343 6.68444C4.11806 6.71903 4.19418 6.76979 4.2583 6.83382C4.32242 6.89785 4.37329 6.97389 4.408 7.0576C4.44271 7.14131 4.46057 7.23104 4.46057 7.32166C4.46292 7.5046 4.39257 7.68099 4.26495 7.8121C4.13734 7.9432 3.96291 8.01829 3.77997 8.02087L0.809798 8.04143C0.718767 8.04156 0.62861 8.02366 0.544533 7.98877C0.460455 7.95388 0.38412 7.90268 0.319933 7.83812C0.255746 7.77357 0.204979 7.69695 0.170561 7.61268C0.136143 7.5284 0.118756 7.43815 0.119402 7.34712V4.20949C0.119402 3.82561 0.425918 3.51518 0.804901 3.51518C1.18291 3.51518 1.4904 3.82561 1.4904 4.20949V5.31118C3.27368 2.31849 6.58366 0.207153 10.1502 0.207153H10.1522Z"
                          fill="#676767"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
               
              }}
              className="py-5 px-5"
            >
              <div className="d-flex align-items-center">
                <h2
                  style={{
                    color: "white",
                    fontSize: "41px",
                    fontWeight: "19",
                    fontFamily:"DS Digital",
                  }}
                  className={style.heading_sec}
                >
                  summarise{" "}
                  <strong
                    style={{ color: "red", fontFamily:"DS Digital" }}
                  >
                    GENRATED
                  </strong>
                </h2>
              </div>
              <div
                className={`d-flex justify-content-center align-items-center ${style.second_heading}`}
                style={{
                  height: "2.8rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "4rem",
                  width: "fit-content",
                  border: "1px solid grey",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "30px",
                  color: "white",
                  fontWeight: "400",
                  fontFamily:"DS Digital"
                }}
              >
                {currCount ? currCount : 0}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className={`pt-5 ${style.how_sum_wrapper}`}>
        <Container className={style.how_sum_container}>
          <div className={style.how_sum}>
            <div style={{ zIndex: "10" }}>
              <img src={img_rob} alt="Robot image" className={style.robo_img} />
            </div>
            <div className={style.right_box}>
              <h1 style={{ color: "white" }}>
                GET HOW <strong style={{ color: "red" }}>YOUSUMMARISE</strong>{" "}
                WORK
              </h1>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      border: "1px solid red",
                      borderRadius: "4px",
                      marginBottom: "3rem",
                      marginTop: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        border: "1px solid red",
                        rotate: "20deg",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          color: "red",
                          rotate: "-20deg",
                          margin: "0",
                        }}
                      >
                        01
                      </h2>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "white",
                      textAlign: "center",
                      margin: "2.4rem 0 0 2rem ",
                    }}
                  >
                    <p>Copy and Paste the link</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      border: "1px solid red",
                      borderRadius: "4px",
                      marginBottom: "3rem",
                      marginTop: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        border: "1px solid red",
                        rotate: "20deg",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          color: "red",
                          margin: "0",
                          rotate: "-20deg",
                        }}
                      >
                        02
                      </h2>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "white",
                      margin: "2.4rem 0 0 2rem",
                    }}
                  >
                    <p>
                      Select the format: Either Bullet Points of Text and Select
                      the Lenght: No of Bullets Points or Short, Mid-Lenght,
                      Long
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    height: "auto",
                  }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      border: "1px solid red",
                      borderRadius: "4px",
                      marginBottom: "3rem",
                      marginTop: "2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        border: "1px solid red",
                        rotate: "20deg",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h2
                        style={{
                          textAlign: "center",
                          color: "red",
                          rotate: "-20deg",
                          margin: "0",
                        }}
                      >
                        03
                      </h2>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "white",
                      margin: "2.4rem 0 0 2rem ",
                    }}
                  >
                    <p>
                      Press Summarise and recive an AI Summary of the video you
                      provide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* Third Section */}
      <section className={style.third_section_wrapper}>
        <Container className={style.third_sec_container}>
          <div>
            <img src={svg_one} alt="no img" />
            <h3>Get the Most Out of Your Time</h3>
            <p>
              Reading summaries gives you faster access to key information
              compared to watching lengthy videos when time is scarce.
            </p>
          </div>
          <div>
            <img src={svg_two} alt="no img" />
            <h3>Customize Your Learning Experience</h3>
            <p>
              Unlike videos that dictate the flow of information, summaries let
              you optimize and tailor the learning experience to your unique
              needs and priorities
            </p>
          </div>
          <div>
            <img src={svg_three} alt="no img" />
            <h3>Get the Most Out of Your Time</h3>
            <p>
              Reading summaries gives you faster access to key information
              compared to watching lengthy videos when time is scarce.
            </p>
          </div>
        </Container>
      </section>
      {/* summarise Animation */}
      <span className={style.scroll_text}>
        <div className={style.marquee}>
          <div>
            <h1>
              * you summarise * you summarise * you summarise* you summarise *
              you summarise * you summarise* you summarise * you summarise * you
              summarise
            </h1>
          </div>
        </div>
        <div className={style.marquee_second}>
          <div>
            <h1 className={style.marquee_second_para}>
              * you summarise * you summarise * you summarise* you summarise *
              you summarise * you summerise* you summarise * you summarise * you
              summarise
            </h1>
          </div>
        </div>
        <img src={ytGiff} className={style.ytGiff} alt="" />
      </span>

      {/* <!-- FAQ,s Area...... --> */}
      <section className={style.section_five_wrapper}>
        <Container className={style.faqs_container}>
          <h1>FAQ</h1>

          <div className={style.faq}>
            {faqs.map((ans, index) => (
              <div
                style={{
                  padding: "1rem 0rem",
                  position: "relative",
                  borderTop: "1px solid white",
                }}
                key={index}
              >
                <input
                  type="checkbox"
                  id={index}
                  name="q"
                  className={style.questions}
                />
                <label className={style.question}>
                  <div
                    className="d-flex align-items-center pe-5 w-100"
                    style={{
                      position: "relative",
                    }}
                  >
                    <h5 className="m-0">{ans.question}</h5>
                    <label htmlFor={index}>
                      <img src={back} alt="" className={style.plus} />
                    </label>
                  </div>
                </label>
                <div className={style.answers}>{ans.answer}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* <!-- Contact-us Area...... --> */}
      <Contact />
      {/* {Organization area} */}
      {/* <section className={style.section_two_wrapper}>
        <Swiper
          breakpoints={breakpoints}
          autoplay={{
            delay: 1000, // 4 seconds
            disableOnInteraction: false,
            // Continue autoplay after user interaction
          }}
          modules={[Autoplay]}
          className={style.section_two_swiper}
        >
          {slider_img.map((img, index) => (
            <SwiperSlide
              style={{
                width: "auto",
                padding: "0rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
              }}
              key={index}
            >
              <img
                src={img}
                style={{
                  width: "10rem",
                  height: "12rem",
                  objectFit: "cover",
                }}
                alt="brand images"
                className={style.section_two_swiper_images}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section> */}
      <section className={style.section_two_wrapper}>
        <Swiper
          breakpoints={breakpoints}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className={style.section_two_swiper}
        >
          {slider_img.map((img, index) => (
            <SwiperSlide
              style={{
                width: "auto",
                padding: "0rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
              }}
              key={index}
            >
              {index === 1 || index === 4 || index === 7 ? ( // Check if it's the first image
                <a
                  href="https://www.shhs.gdst.net/news/atherton-award/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={img}
                    style={{
                      width: "10rem",
                      height: "12rem",
                      objectFit: "cover",
                    }}
                    alt="brand images"
                    className={style.section_two_swiper_images}
                  />
                </a>
              ) : (
                <img
                  src={img}
                  style={{
                    width: "10rem",
                    height: "12rem",
                    objectFit: "cover",
                  }}
                  alt="brand images"
                  className={style.section_two_swiper_images}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
