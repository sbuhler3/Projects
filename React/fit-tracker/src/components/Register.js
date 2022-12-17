import React, { useRef, useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Register() {
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  const AGE_REGEX = /^[0-9]{1,2}$/;
  const nameRef = useRef();
  const errorRef = useRef();

  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [age, setAge] = useState("");
  const [validAge, setValidAge] = useState(false);
  const [ageTouched, setAgeTouched] = useState(false);

  const [pwd, setPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdTouched, setMatchPwdTouched] = useState(false);

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
    setValidMatchPwd(matchingPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, age, pwd, matchPwd]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    setSuccess(true);
  }
  return success ? (
    <h1>success</h1>
  ) : (
    <div className="intro-container">
      <h1 className="header">Welcome to FitTracker!</h1>
      <h2 className="header-info">
        This is an app where you track your strength and cardio exercises in an
        easily accessible way!
      </h2>
      <p className="intro-text">
        <strong>How it works:</strong> Based on your age, a max heartrate(HR)
        will be calcuated. You can use this maxHR as a way to pace your
        exercises. This app will also allow you to track the different exercises
        completed.
      </p>
      <section>
        <p ref={errorRef} className={errMsg ? "error-message" : "hide"}>
          {errMsg}
        </p>
      </section>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          className="field"
          ref={nameRef}
          type="text"
          placeholder="Name"
          autoComplete="none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          onBlur={() => setNameTouched(true)}
        />
        <input
          className="field"
          type="email"
          value={email}
          placeholder="Email"
          autoComplete="none"
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
          type="text"
          value={age}
          placeholder="Age"
          autoComplete="none"
          onChange={(e) => setAge(e.target.value)}
          required
          onBlur={() => setAgeTouched(true)}
        />
        <span className={!validAge && ageTouched ? "error-message" : "hide"}>
          <FaInfoCircle className="info-circle" />
          Must set an age between 0-99
        </span>

        <input
          className="field"
          type="password"
          value={pwd}
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
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
