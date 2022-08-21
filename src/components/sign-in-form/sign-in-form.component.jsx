import { async } from "@firebase/util";
import { useState, useContext } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassWord } from "../../utils/firebase/firebase.utils";
//import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import Button from "../buttons/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    //const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        //setCurrentUser(user);
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassWord(email, password);
            //setCurrentUser(response.user);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('wrong password');
                    break;
                
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]:value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit = {handleSubmit}>            
                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType="google">Google sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;