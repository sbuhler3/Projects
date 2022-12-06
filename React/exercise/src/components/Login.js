import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Register from "./Register";

export default function Login(props) {
  const [createUser, setCreateUser] = useState(false);

  const schemaValidation = yup.object({
    email: yup
      .string()
      .required()
      .test("testing email", "must enter a valid email", (val) => {
        return /\S+@\S+\.\S+/.test(val);
      }),
    password: yup.string().required(),
  });

  const handleClick = () => {
    return setCreateUser(!createUser);
  };

  const LoginForm = () => {
    return (
      <>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schemaValidation}
          onSubmit={(values, actions) => {
            actions.resetForm();
            props.setValidUser();
          }}
        >
          {(props) => (
            <div>
              <input
                className="field"
                type="email"
                placeholder="Email"
                onChange={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <div className="error-message">
                {props.touched.email && props.errors.email}
              </div>

              <input
                className="field"
                type="password"
                placeholder="Password"
                onChange={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              <div className="error-message">
                {props.touched.password && props.errors.password}
              </div>

              <input
                className="intro-button"
                type="submit"
                value="Login"
                onClick={props.handleSubmit}
                disabled={!(props.dirty && props.isValid)}
              />
            </div>
          )}
        </Formik>
        <button className="intro-button" onClick={handleClick}>
          Create User
        </button>
      </>
    );
  };

  return (
    <div className="Intro-container">
      <h1 className="header">Welcome to MyExercise!</h1>
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
      {createUser ? (
        <div className="form-container">
          <Register handleClick={handleClick} />
          <button className="intro-button" onClick={handleClick}>
            Return to Login
          </button>
        </div>
      ) : (
        <div className="form-container">
          <LoginForm />
        </div>
      )}
    </div>
  );
}
