import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
export default function Register() {
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const AGE_REGEX = /^[0-9]{1,2}$/;
  const PWD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [age, setAge] = useState("");
  const [validAge, setValidAge] = useState(false);
  const [ageTouched, setAgeTouched] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdTouched, setPwdTouched] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdTouched, setMatchPwdTouched] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  //validating
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = AGE_REGEX.test(age);
    setValidAge(result);
  }, [age]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const matchingPwd = pwd === matchPwd;
    setValidMatchPwd(matchingPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, age, pwd, matchPwd]);
  //POST to MYSQL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", {
        userName,
        email,
        age,
        pwd: bcrypt.hashSync(pwd),
      });
      alert("registration successful!");
      navigate("/login", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("Email already registered");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  //JSX
  return (
    <div className="intro-container">
      <header>
        <h1 className="header">Welcome to FitTracker!</h1>
        <h2 className="header-info">
          This is an app where you track your strength and cardio exercises in
          an easily accessible way!
        </h2>
      </header>
      <p className="intro-text">
        <strong>How it works:</strong> Based on your age, a max heartrate(HR)
        will be calcuated. You can use this maxHR as a way to pace your
        exercises. This app will also allow you to track the different exercises
        completed.
      </p>
      <section>
        <h3 className={errMsg ? "error-message" : "hide"}>
          <FaInfoCircle className="info-circle" />
          {errMsg}
        </h3>
      </section>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          className="field"
          autoFocus
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          className="field"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          onBlur={() => setEmailTouched(true)}
        />
        <span
          className={!validEmail && emailTouched ? "error-message" : "hide"}
        >
          <FaInfoCircle className="info-circle" />
          Not a valid email
        </span>
        <input
          className="field"
          type="number"
          value={age}
          placeholder="Age"
          min={8}
          max={99}
          onChange={(e) => setAge(e.target.value)}
          required
          onBlur={() => setAgeTouched(true)}
        />
        <span className={!validAge && ageTouched ? "error-message" : "hide"}>
          <FaInfoCircle className="info-circle" />
          Must set an age between 8-99
        </span>

        <input
          className="field"
          type="password"
          value={pwd}
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          onBlur={() => setPwdTouched(true)}
          required
        />
        <span className={!validPwd && pwdTouched ? "error-message" : "hide"}>
          <FaInfoCircle className="info-circle" />
          Password must include one uppercase, one lowercase, one number, and be
          at least 6 characters.
        </span>
        <input
          className="field"
          type="password"
          value={matchPwd}
          placeholder="Confirm password"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          onBlur={() => setMatchPwdTouched(true)}
        />
        <span
          className={
            !validMatchPwd && matchPwdTouched ? "error-message" : "hide"
          }
        >
          <FaInfoCircle className="info-circle" />
          Passwords do not match
        </span>
        <button
          className="intro-button"
          disabled={
            !userName || !validEmail || !validAge || !pwd || !validMatchPwd
          }
        >
          Sign up
        </button>
        <br />
        <br />
        <div className="already-registered">
          Already registered? <br />
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
