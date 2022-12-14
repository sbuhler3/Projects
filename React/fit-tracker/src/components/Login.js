import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import Nav from "./NavBar/Nav";
import Home from "./Pages/Home";

export default function Login() {
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailRef = useRef();

  const [validUser, setValidUser] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdTouched, setPwdTouched] = useState(false);

  //set mouse to first box on input
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  //validating email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  function handleSubmit(e) {
    e.preventDefault();
    setValidUser(true);
    console.log("clicked");
  }

  return validUser ? (
    <>
      <Nav />
      <Home />
    </>
  ) : (
    <div className="intro-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <input
          className="field"
          type="email"
          ref={emailRef}
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          required
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          onBlur={() => setPwdTouched(true)}
        />
        <span className={pwdTouched && pwd === "" ? "error-message" : "hide"}>
          <FaInfoCircle className="info-circle" />
          Must enter a password
        </span>
        <button className="intro-button" disabled={!validEmail || !pwd}>
          Log in
        </button>
        <br />
        <div className="already-registered">
          Return to{" "}
          <Link className="login-link" to="/">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
