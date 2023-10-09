import React, { useState, useRef } from "react";
import style from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL from "../../config";

const Main = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState("");
  const [url, seturl] = useState("");
  const [keyPoints, setKeyPoints] = useState(0);
  const [wordCounter, setWordCounter] = useState(0);

  const [ytData, setYtData] = useState("");
  const [keyPointData, setKeyPointData] = useState([]);

  const [onSubmit, setonSubmit] = useState(false);

  const handleSubmit = async () => {
    try {
      if (check === "paragraph") {
        const res = await axios.post(`${API_BASE_URL}/api/summary`, {
          vidURL: url,
          contentType: check,
          wordCounter: wordCounter,
        });
        setYtData(res.data);
        setonSubmit(true);
        console.log(res.data);
      } else if (check === "points") {
        const res = await axios.post(`${API_BASE_URL}/api/summary`, {
          vidURL: url,
          contentType: check,
          keyPoints: keyPoints,
        });
        setKeyPointData(res.data);
        setonSubmit(true);
        console.log(res.data);
      } else {
        alert("Invalid Request");
      }
    } catch (error) {
      alert("Video Is Copyrighted");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className={style.box}>
        <div className="w-100">
          <Form.Label htmlFor="basic-url">Paste Youtube URL here</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">URL</InputGroup.Text>
            <Form.Control
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="https://www.youtube.com/"
              onChange={(e) => seturl(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className={style.rad}>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Bullet Points"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                onChange={() => setCheck("points")}
              />
              <Form.Check
                inline
                label="Paragraph form"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                onChange={() => setCheck("paragraph")}
              />
            </div>
          ))}
          {check !== "" ? (
            <div className={style.aftercheck}>
              {check === "points" ? (
                <InputGroup
                  onChange={(e) => setKeyPoints(e.target.value)}
                  size="sm"
                  className="mb-3"
                >
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Key points
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              ) : (
                <InputGroup
                  onChange={(e) => setWordCounter(e.target.value)}
                  size="sm"
                  className="mb-3"
                >
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Words Count
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              )}
            </div>
          ) : null}
        </div>
        <div className={style.btn}>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        {onSubmit ? (
          <div className={style.summary}>
            <h3>Summary</h3>
            <div>
              {keyPointData.length !== 0 ? (
                <ol>
                  {keyPointData.map((item) => (
                    <>
                      <li key={item.index}>{item.keyPoint}</li>
                    </>
                  ))}
                </ol>
              ) : (
                <p>{ytData}</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default Main;
