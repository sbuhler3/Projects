import React from "react";
import {Formik} from 'formik'
import * as yup from 'yup'

export default function Login(){
   
    const schemaValidation = yup.object({
        email: yup.string()
        .required()
        .test('testing email',"Must enter a valid email",(val => {
            return /\S+@\S+\.\S+/.test(val)
        })),
        password: yup.string()
        .required()
    })
    return(
    <div>
        <h1>Welcome to MyExercise!</h1>
        <h2>This is an app where you can track the amount of time 
            you are burning fat in a workout.
        </h2>
        <Formik
        initialValues={{email: '', password:''}}
        validationSchema={schemaValidation}
        onSubmit={(values,actions) => {
            actions.resetForm()
            console.log(values)
        }}
        >
            {(props => (
                <div>
               
                <input 
                type="email"
                placeholder="Email"
                onChange={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}/>
                <div>{props.touched.email && props.errors.email}</div>

                <input
                type="password"
                placeholder="Password"
                onChange={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}/>
                <div>{props.touched.password && props.errors.password}</div>

                <input 
                type="submit"
                value="Log In"
                onClick={props.handleSubmit}/>

                </div>))}
        </Formik>
    </div>
)}