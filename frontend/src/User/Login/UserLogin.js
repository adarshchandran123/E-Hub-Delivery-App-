import React, { useState } from "react";
import './Login.css';

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Link, useNavigate} from 'react-router-dom'
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import axios from "axios";
import { Alert } from "@mui/material";



const UserLogin = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState('')




  const handleSubmit = (e) => {

    e.preventDefault();

    try{
      const config = {
        headers:{
          "content-type":"application/json"
        }
      }
      axios.post('http://localhost:5000/user/userLogin',{email,password},config).then((response)=>{

      localStorage.setItem("userLogin",JSON.stringify(response.data.userdetails))
      if(response.data.userdetails.mobile){
        navigate('/home')
      }else{
        navigate('/setMobileNumber')
      }

      }).catch((err)=>{
        setErr('Email or Password is not correct')
      })

    }catch{

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
            <div className="img_Style" >
              <img
                width={260}
                style={{ borderRadius: "30px" }}
                height="auto"
                src="https://thumbs.dreamstime.com/b/delivery-courier-scooter-protective-mask-gloves-emblem-funny-pizza-helmet-rides-box-food-boy-against-177901322.jpghttps://thumbs.dreamstime.com/b/delivery-courier-scooter-protective-mask-gloves-emblem-funny-pizza-helmet-rides-box-food-boy-against-177901322.jpg"
              />
            </div>

            <Typography
              
              className="heading_style"
              component="h1"
              variant="h5"
            >
              LOGIN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>

                
                <Grid item xs={12}>
                <GoogleSignIn />
                <br/>
              {err &&
                  <Grid item xs={12}   >
                      <Alert severity="error">
                          <strong>{err}</strong>
                      </Alert>
                  </Grid>
                }
                
                  <TextField
                    required
                    fullWidth 
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                className="submitButton_style"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign IN
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  Don't have an account? .
                    <Button
                      size="small"
                      style={{
                          color: "green",
                          border: "#023047 solid 2px",
                          borderRadius: "10px",
                        }}
                      variant="outlined"
                    >
                        <Link
                          to="/signup"
                          style={{ textDecoration: "none" }}
                          variant="body2"
                        >
                      Sign up
                  </Link>
                    </Button>
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

export default UserLogin;
