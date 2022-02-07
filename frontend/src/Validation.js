
const Validation = (values) => {

    let error = {};
    
    if(!values.firstName){
        error.firstName="Enter your name"
    }
    if(!values.lastName){
        error.lastName="Enter your name"
    }
    if(!values.email){
        error.email="Enter your Email"
    }else if(!/^[a-zA-Z0-9.!#$%&'+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/.test(values.email)){
        error.email="Email is invalid"
    }

    if(!values.password){
        error.password="Enter your Password"
    }else if(values.password.length < 3){
        error.password="minimum length 3"
    }
    if(!values.confirmPassword){
        error.confirmPassword="Enter your Password"
    }else if(values.confirmPassword.length < 3){
        error.confirmPassword="minimum length 3"
    }else if(values.password !== values.confirmPassword){
        error.confirmPassword="password is not correct"
    }

    return error;
}

export default Validation

