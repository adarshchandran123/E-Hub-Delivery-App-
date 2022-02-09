import React, { useState } from "react";
import axios from "axios";
import './Signup.css'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Link,useNavigate} from 'react-router-dom'
import validation from "../../Validation"
import { Alert } from "@mui/material";


const UserSignup = () => {

  const Navigate = useNavigate()

  const [values, setValues] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  
  const [errors, setErrors] = useState({});
  const [EmailErr, setEmailErr] = useState('')
  const onhandleChange = (e) =>{
    
    setValues({
      ...values,
      [e.target.name]:e.target.value,
    });
    
    
  }
  
  const {confirmPassword,...rest}=values

  
  const handleSubmit =async (event) => {
    event.preventDefault();
    let err=validation(values)
    setErrors(err);

    
    console.log(Object.keys(err).length)
    if(Object.keys(err).length===0){

        try{
          const config={
            headers:{
              "content-type":"application/json"
            },
          }
          axios.post("http://localhost:5000/user/userSignup",rest,config).then((response)=>{
              localStorage.setItem('userDetails',JSON.stringify(rest.email))
              
              Navigate('/email_otp')

          }).catch((err)=>{
            
            setEmailErr('Email is Already Used')
          })
  
          
        }catch (error){
          console.log('neeeww errr',error);
        }
      
    }

    
  };
  const theme = createTheme();

  return (
    <div>
      <br/>
      <ThemeProvider theme={theme}>
        <Container
         
          className="container_Body"
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="img_Style">
              <img
                width={260}
                style={{ borderRadius: "30px" }}
                height="auto"
                alt="pic"
                src="https://thumbs.dreamstime.com/b/delivery-courier-scooter-protective-mask-gloves-emblem-funny-pizza-helmet-rides-box-food-boy-against-177901322.jpghttps://thumbs.dreamstime.com/b/delivery-courier-scooter-protective-mask-gloves-emblem-funny-pizza-helmet-rides-box-food-boy-against-177901322.jpg"
              />
            </div>

            <Typography
              className="heading_style"
              component="h1"
              variant="h5"
            >
              CREATE ACCOUNT
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              
              <Grid container spacing={2}>

                {EmailErr &&
                    <Grid item xs={12}   >
                        <Alert severity="error">
                            <strong>{EmailErr}</strong>
                        </Alert>
                    </Grid> 
                  }
                
                <Grid item xs={12} sm={6}>
                  
                  <TextField
                  
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    type="text"
                    id="firstName"
                    value={values.firstName}
                    onChange={onhandleChange}
                    label="First Name"
                    autoFocus
                  />
                  {errors.firstName && <p style={{color:'red',marginTop:1}}>{errors.firstName}</p>}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={onhandleChange}
                    autoComplete="family-name"
                  />
                  {errors.lastName && <p style={{color:'red',marginTop:1}}>{errors.lastName}</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={onhandleChange}
                    type="email"
                    autoComplete="email"
                  />
                {errors.email && <p style={{color:'red',marginTop:1}}>{errors.email}</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={onhandleChange}
                    id="password"
                    autoComplete="new-password"
                    />
                    {errors.password && <p style={{color:'red',marginTop:1}}>{errors.password}</p>}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onhandleChange}
                    id="confirmPassword"
                    autoComplete="new-password"
                    />
                    {errors.confirmPassword && <p style={{color:'red',marginTop:1}}>{errors.confirmPassword}</p>}
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="submitButton_style"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  Already have an account? .
                  <Link
                    to="/login"
                    style={{ textDecoration: "none" }}
                    variant="body2"
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      className="link_Button_Style"
                      >
                      Sign in
                    </Button>
                  </Link>
                </Grid>
                <br />
                <br />
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br />
    </div>
  );
};

export default UserSignup;
