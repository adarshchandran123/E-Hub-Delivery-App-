
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



const SetMobile = () => {

  const navigate = useNavigate()

  const [mobile, setMobile] = useState("")
  const [err, setErr] = useState('')




  const handleSubmit = (e) => {

    e.preventDefault();
    if(!mobile){
        setErr('Please enter mobile Number')
    }else if(mobile.length !== 10){
        setErr('Need 10 Number')
    }else{

      try{
        const config ={
          headers:{
            "content-type":"application/json"
          }
        }
        axios.post('http://localhost:5000/user/setmobile',{mobile},config).then((response)=>{
          
        })


      }catch{

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
            <div className="img_Style" >
              <img
                width={260}
                style={{ borderRadius: "30px" }}
                height="auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrnxBK9TBfMETNKVLO9WjJohg52_SfGV_9HXjyz6KpKLsm7BBRikwsaIgPVT8Tk-93d9Q&usqp=CAU"
              />
            </div>

            <Typography
              
              className="heading_style"
              component="h1"
              variant="h5"
            >
              MOBILE NUMBER
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>

                
                <Grid item xs={12}>
               
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
                    id="mobile"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                    label="Mobile"
                    name="mobile"
                    autoComplete="mobile"
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
                SUBMIT
              </Button>
              <br />
              <br />
              <br />

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <br />
    </div>
  );
};

export default SetMobile;


