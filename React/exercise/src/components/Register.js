import { Formik } from "formik";
import * as yup from "yup";

export default function Register(props) {
  const schemaValidation = yup.object({
    firstName: yup.string().required(),
    email: yup
      .string()
      .required()
      .test("testing email", "must enter a valid email", (val) => {
        return /\S+@\S+\.\S+/.test(val);
      }),
    password: yup.string().required(),
    age: yup
      .string()
      .required()
      .test(
        "test age is a number",
        "must enter a number, enter a correct age for correct max HR calculation",
        (val) => /^\d+$/.test(val)
      ),
  });
  // function for customized errors for age and heartrate
  // MAY ADD IN UPDATE LATER
  // function error(prop, variable) {
  //   if (variable === "age") {
  //     if (prop.values.age === "") {
  //       setValidSignup(false);
  //       return "you must enter an age";
  //     } else if (prop.values.age < 0) {
  //       setValidSignup(false);
  //       return "you cannot enter a negative age!";
  //     } else if (prop.values.age <= 6) {
  //       setValidSignup(false);
  //       return "you're a little young to be doing this";
  //     } else if (isNaN(prop.values.age)) {
  //       setValidSignup(false);
  //       console.log(validSignup);
  //       return "you must enter a number";
  //     } else if (!isNaN(prop.values.age)) {
  //       setValidSignup(true);
  //     }
  //   } else if (variable === "maxHR") {
  //     if (prop.values.maxHR === "") {
  //       setValidSignup(true);
  //     } else if (prop.values.maxHR < 0) {
  //       setValidSignup(false);
  //       return "you can not have a negative heart rate";
  //     } else if (prop.values.maxHR < 60) {
  //       setValidSignup(false);
  //       return "that is a low maxHR maybe check with your doctor";
  //     } else if (prop.values.maxHR >= 220) {
  //       setValidSignup(false);
  //       return "impossible to have a maxHR that high!";
  //     } else {
  //       setValidSignup(true);
  //     }
  //   }
  // }
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
            {props.touched.age && props.errors.age}
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
                props.values.password === props.values.confirmPassword
              )
            }
          />
        </div>
      )}
    </Formik>
  );
}
