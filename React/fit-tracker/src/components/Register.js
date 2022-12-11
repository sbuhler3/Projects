import React, { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Register() {
  const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const AGE_REGEX = /^[0-9]{1,2}$/;
  const nameRef = useRef();
  const errorRef = useRef();

  const [name, setName] = useState("");
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [age, setAge] = useState("");
  const [validAge, setValidAge] = useState(false);
  const [ageFocus, setAgeFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setMatchValidPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  //set mouse to first box on input
  useEffect(() => {
    nameRef.current.focus();
  }, []);
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
    const matchingPwd = pwd === matchPwd;
    setMatchValidPwd(matchingPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, age, pwd, matchPwd]);

  return (
    <div className="Intro-container">
      <h1 className="header">Welcome to FitTracker!</h1>
      <h2 className="header-info">
        This is an app where you can track your strength and cardio exercises in
        an easily accessible way!
      </h2>
      <p className="intro-text">
        <strong>How it works:</strong> Based on your age, a max heartrate(HR)
        will be calcuated. You can use this maxHR as a way to pace your
        exercises. This app will also allow you to track the different exercises
        completed and highlight if you have increased the intensity in anyway.
      </p>
      <section>
        <p ref={errorRef} className={errMsg ? "error-message" : "hide"}>
          {errMsg}
        </p>
      </section>
      <form className="form-container">
        <h2>Register</h2>
        <input
          className="field"
          ref={nameRef}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
        />
        <input
          className="field"
          type="email"
          value={email}
          placeholder="Email"
          autoComplete="none"
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <input
          className="field"
          type="text"
          value={age}
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          required
          onFocus={() => setAgeFocus(true)}
          onBlur={() => setAgeFocus(false)}
        />

        <input
          className="field"
          type="password"
          value={pwd}
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          required
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <input
          className="field"
          type="password"
          value={matchPwd}
          placeholder="Confirm password"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          onFocus={() => setMatchPwdFocus(true)}
          onBlur={() => setMatchPwdFocus(false)}
        />
        <button
          className="intro-button"
          disabled={!name || !validEmail || !validAge || !pwd || !validMatchPwd}
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
