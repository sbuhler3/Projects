import {Formik} from 'formik'
import * as yup from 'yup'

export default function Register(){
    const schemaValidation = yup.object({
        firstName: yup.string()
        .required(),
        email: yup.string()
        .required()
        .test('testing email',"Must enter a valid email",(val => {
            return /\S+@\S+\.\S+/.test(val)
        })),
        password: yup.string()
        .required()
    })
     
  return(
        <Formik
        initialValues={{firstName: '', lastName:'', email: '', password:'', confirmPassword:''}}
        validationSchema={schemaValidation}
        onSubmit={(values,actions) => {
            actions.resetForm()
        }}
        >
            {(props => (
                <div>
               <input 
                className='field'
                type="text"
                placeholder="First Name"
                onChange={props.handleChange('firstName')}
                value={props.values.firstName}
                onBlur={props.handleBlur('firstName')}/>
                <div className='error-message'>{props.touched.firstName && props.values.firstName.length<1 ?
                "Must enter a first name":null}</div>

                <input 
                className='field'
                type="text"
                placeholder="Last Name"
                onChange={props.handleChange('lastName')}
                value={props.values.lastName}/><br/>

                <input 
                className='field'
                type="email"
                placeholder="Email"
                onChange={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}/>
                <div className='error-message'>{props.touched.email && props.errors.email}</div>
    
                <input
                className='field'
                type="password"
                placeholder="Password"
                onChange={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}/>
                <div className='error-message'>{props.touched.password && props.errors.password}</div>

                <input 
                className='field'
                type="password"
                placeholder="Confirm Password"
                onChange={props.handleChange('confirmPassword')}
                value={props.values.confirmPassword}
                onBlur={props.handleBlur('confirmPassword')}/>
                <div className='error-message'>{props.touched.confirmPassword && props.values.password!==props.values.confirmPassword ? "passwords do not match": null}</div>
    
                <input 
                className='intro-button'
                type="submit"
                value="Sign up"
                onClick={props.handleSubmit}
                disabled={!(props.dirty && props.isValid && props.values.password===props.values.confirmPassword)}/>
    
                </div>))}
        </Formik>
    
)}