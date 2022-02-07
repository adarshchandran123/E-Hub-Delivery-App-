
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import { Alert } from "@mui/material";


const AdminLogin = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState('')



  const handleSubmit = (e) => {

    e.preventDefault();
    if(!email){
        setErr('Please Enter Email')
    }else if(!password){
        setErr('Please Enter Password')
    }else{

        try{
          const config = {
            headers:{
              "content-type":"application/json"
            }
          }
          axios.post('http://localhost:5000/admin/adminLogin',{email,password},config).then((response)=>{
            
            navigate('/adminHome')
    
          }).catch((err)=>{
            setErr('Email or Password is not correct')
          })
    
        }catch(err){
            console.log('err',err);
        }

    }

    
  
  };
  const theme = createTheme();

  return (
    <div>
      <br/><br/><br/><br/>
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
  
            <Typography
              
              className="heading_style"
              component="h1"
              variant="h5"
            >
              ADMIN LOGIN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>

                
                <Grid item xs={12}>
               
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
       
                <br /><br />
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br />
    </div>
  );
};

export default AdminLogin;

