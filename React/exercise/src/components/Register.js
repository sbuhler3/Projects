import { Formik } from "formik";
import * as yup from "yup";

export default function Register(props) {
  const schemaValidation = yup.object({
    firstName: yup.string().required(),
    email: yup
      .string()
      .required()
      .test("testing email", "Must enter a valid email", (val) => {
        return /\S+@\S+\.\S+/.test(val);
      }),
    password: yup.string().required(),
    age: yup.string().required(),
  });
  //function for customized errors for age and heartrate
  function error(prop, variable) {
    if (variable === "age") {
      if (prop.values.age === "") {
        return "you must enter an age";
      } else if (prop.values.age < 0) {
        return "you cannot enter a negative age!";
      } else if (prop.values.age <= 6) {
        return "impressed somebody so young wants to exercise";
      } else {
        return true;
      }
    } else if (variable === "maxHR") {
      if (prop.values.maxHR === "") {
        return true;
      } else if (prop.values.maxHR < 0) {
        return "you can not have a negative heart rate";
      } else if (prop.values.maxHR < 60) {
        return "that is a low maxHR maybe check with your doctor";
      } else if (prop.values.maxHR >= 220) {
        return "impossible to have a maxHR that high!";
      } else {
        return true;
      }
    }
  }
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        maxHR: "",
        age: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={schemaValidation}
      onSubmit={(values, actions) => {
        actions.resetForm();
        props.handleClick();
      }}
    >
      {(props) => (
        <div>
          <input
            className="field"
            type="text"
            placeholder="First Name*"
            onChange={props.handleChange("firstName")}
            value={props.values.firstName}
            onBlur={props.handleBlur("firstName")}
          />
          <div className="error-message">
            {props.touched.firstName && props.values.firstName.length < 1
              ? "must enter a first name"
              : null}
          </div>

          <input
            className="field"
            type="text"
            placeholder="Last Name"
            onChange={props.handleChange("lastName")}
            value={props.values.lastName}
          />
          <br />

          <input
            className="field"
            type="text"
            placeholder="Your Age*"
            onChange={props.handleChange("age")}
            value={props.values.age}
            onBlur={props.handleBlur("age")}
          />
          <div className="error-message">
            {props.touched.age && error(props, "age")}
          </div>

          <input
            className="field"
            type="text"
            placeholder="Max Heartrate(HR)"
            onChange={props.handleChange("maxHR")}
            value={props.values.maxHR}
            onBlur={props.handleBlur("maxHR")}
          />
          <div className="error-message">
            {props.touched.maxHR && error(props, "maxHR")}
          </div>

          <input
            className="field"
            type="email"
            placeholder="Email*"
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
            placeholder="Password*"
            onChange={props.handleChange("password")}
            value={props.values.password}
            onBlur={props.handleBlur("password")}
          />
          <div className="error-message">
            {props.touched.password && props.errors.password}
          </div>

          <input
            className="field"
            type="password"
            placeholder="Confirm Password*"
            onChange={props.handleChange("confirmPassword")}
            value={props.values.confirmPassword}
            onBlur={props.handleBlur("confirmPassword")}
          />
          <div className="error-message">
            {props.touched.confirmPassword &&
            props.values.password !== props.values.confirmPassword
              ? "passwords do not match"
              : null}
          </div>

          <input
            className="intro-button"
            type="submit"
            value="Sign up"
            onClick={props.handleSubmit}
            disabled={
              !(
                props.dirty &&
                props.isValid &&
                props.values.password === props.values.confirmPassword &&
                error(props, "age") &&
                error(props, "maxHR")
              )
            }
          />
        </div>
      )}
    </Formik>
  );
}
