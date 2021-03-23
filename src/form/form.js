import React, { Component } from 'react';
import  { FormErrors } from '../form-errors/form-errors';

export default class Form extends Component {
    
state = {
    email: '',
    login: '',
    password: '',
    repeatPass: '',
    formErrors: {email: '', login: '', password: '', repeatPass: ''},
    emailValid: false,
    loginValid: false,
    passwordValid: false,
    repeatPassValid: false,
    passwordValue: '',
    repeatPassValue: '',
    formValid: false,
}

 change = (e) => {
     const {name, value} = e.target;
    this.setState({ [name]: value},
                () => {
                    this.validateField(name, value)
                     });
}   
validateField(fieldName, value) { 
    let filedValidationErrors = this.state.formErrors; 
let emailValid = this.state.emailValid; 
let loginValid = this.state.loginValid;
let passwordValid = this.state.passwordValid;
let repeatPassValid = this.state.repeatPassValid;
let passwordValue = this.state.passwordValue;
let repeatPassValue = this.state.repeatPassValue;

switch(fieldName) {
    case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        filedValidationErrors.email = emailValid ? '' : ' is invalid';
    break;
    case 'login':
        loginValid = value.match(/([a-zA-Z]+)/gm) && value.length >= 3 && !value.match(/^([_])/gm);
        filedValidationErrors.login = loginValid ? '' : ' is invalid';
       
    break; 
    case 'password':
        passwordValid = value.match(/(?=.*[0-9])(?=.*[a-zA-Z])/g) && value.length >= 5; 
        this.setState({ passwordValue: value });
        filedValidationErrors.password = passwordValid ? '' : ' is too short';
        
    break;
    case 'repeatPass':
        console.log(passwordValue);
        
        repeatPassValid = passwordValue === value;
        
        this.setState({ repeatPassValue: value });
             
        filedValidationErrors.repeatPass = repeatPassValid ? '' : ' no matches';
        
        
    }
this.setState({ formErrors: filedValidationErrors,
                    emailValid: emailValid,
                    loginValid: loginValid,
                    passwordValid: passwordValid,
                    repeatPassValid: repeatPassValid}, this.validateForm);
}


validateForm() {
    this.setState({ formValid:
                            this.state.emailValid && 
                            this.state.loginValid &&
                            this.state.passwordValid &&
                            this.state.repeatPassValid
                         });
                         console.log(this.state);
}
errorClass(error){
    return(error.length === 0 ? '' : ' haserror');
 }

  
render(){
        const { email,
                login,
                password,
                repeatPass, formErrors} = this.state;
        return(
        <div className='form-group main'>
            <form name="firstform"> 
            <FormErrors formErrors={formErrors} />
                <label className="text">
                    Email: </label>
                    <div className='form-group'>
                    <input
                        className={`${this.errorClass(formErrors.email)}` }
                        placeholder="Enter your email"
                        type="mail"
                        name="email"
                        value={email}
                        onChange={this.change}/>
                    </div>
                <label className="col-sm-2 col-form-label text">
                    Login: </label>
                    <div className="form-group">
                        <input
                            className={`${this.errorClass(formErrors.login)}`}
                            placeholder="Enter your login"
                            type="text"
                            name="login"
                            value={login}
                            onChange={this.change}/>
                    </div>
                <label className="col-sm-2 col-form-label text">
                    Password: </label>
                    <div  className="form-group">
                    <input 
                        className={`${this.errorClass(formErrors.password)}`}
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.change}/>
                    </div>
                    <span tabIndex="0">TYT ESHE</span><br></br>
                <label className="col-sm-2 col-form-label text">
                    Сonfirm password:</label>
                    <div className='form-group'>
                    <input
                        className={`${this.errorClass(formErrors.repeatPass)}`}
                        placeholder="Repeat your password "
                        type="password"
                        name="repeatPass"
                        value={repeatPass}
                        onChange={this.change}/>
                    </div>
                <button type="submit" className="btn btn-primary"
                        disabled={!this.state.formValid}>Submit</button>
                <div className="panel panel-default">
                </div>
<div>
    

   
</div>
            </form>
        </div>
        )
    }
}    