
import React, { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom'
import OTPInput from "otp-input-react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SendRounded } from "@material-ui/icons"
import LoadingButton from '@mui/lab/LoadingButton'
import {Alert} from '@material-ui/lab/'
import { useTimer } from 'react-timer-hook';
import axios from "axios";


const useStyles = makeStyles(theme => ({
    grid: {
        backgroundColor: "white",
        height: "auto",
        textAlign: "center",
        border:"#023047 solid 2px",
        borderRadius:"20px",
        boxShadow:"#023047 3px 4px 6px"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

export default function EmailOTPVerify() {
    const classes = useStyles();


    const [OTP, setOTP] = useState("");
    const [otpError, setOtpError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {
        seconds,
        start,
        restart,
    } = useTimer({ expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 30), onExpire: () => console.warn('') });

    useEffect(() => {
        // Setting Loading to true for 30 seconds on window onload
        setLoading(true)
        setTimeout(() => {
            // Starting the timer To send The OTP
            start()
            setLoading(false)
        }, 30000)
    }, []);


    // Disabling resend OTP button on a click on Resend button
    const handleClick = () => {
        var email = localStorage.getItem('userDetails')
        email = JSON.parse(email)
        try{
            const config ={
                headers:{
                    "content-type":"application/json"
                }
            }
            
            axios.post("http://localhost:5000/user/resendOTP",{email},config).then((response)=>{
                
            })

        }catch(err){
            console.log('errr',err);
        }

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 30000)

        // Setting Timer To restart
        const time = new Date();
        time.setSeconds(time.getSeconds() + 30);
        restart(time)
    };
    // setLoading(true)

    // Function To submit The OTP
    const handleSubmit = async () => {
        let Email = localStorage.getItem("userDetails")
            Email = JSON.parse(Email)
        var Email_And_OTP = {}
        Email_And_OTP.email = Email
        Email_And_OTP.otp = OTP

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            axios.post('http://localhost:5000/user/otp_verify',Email_And_OTP, { config }).then((response) => {
                    localStorage.removeItem('userDetails')
                    navigate('/login')

            }).catch((err)=>{
                setOtpError('Entered OTP is not correct')  
                
            })

        } catch (err) {
            console.log("The error  : ", err);
        }
    }



    return (
        <Container component="main" maxWidth="sm">

            <CssBaseline />
            <div className={classes.paper}>

                <Grid
                    container
                    
                    
                    className={classes.grid}
                    justify="center"
                    alignItems="center"
                    spacing={3}px
                >
                    <Grid item container justify="center">
                        <Grid item container alignItems="center" direction="column">
                            <Grid item>
                                <img height="300px" width="auto" src="https://image.freepik.com/free-vector/cartoon-little-boy-with-mobile-phone_353337-762.jpg" />
                            </Grid>
                            <Grid item>
                                <Typography style={{fontWeight:700}} component="h1" variant="h5">
                                    Verification Code
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justify="center">
                        <Paper elevation={0}>
                            <Typography variant="h6">
                                Please enter the verification code <br/> sent to your Email
                            </Typography>
                        </Paper>
                    </Grid>
                    {otpError &&
                        <Grid>
                            <Alert severity="error">
                                <strong>{otpError}</strong>
                            </Alert>
                        </Grid> 
                    }
                    
                    <Grid item xs={12} container justify="center" alignItems="center" direction="column" >
                        <Grid item container spacing={3} justify="center">
                            <OTPInput className="otpInput" value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                        </Grid>


                        <Grid>
                            <LoadingButton
                                onClick={(e) => {
                                    handleClick()
                                }}
                                endIcon={<SendRounded />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                style={{ float: "right", marginTop: "25px", backgroundColor: "#00C9B5" }}
                            >
                                {loading ? `Resend OTP in : ${seconds}` : "Resend OTP"}
                            </LoadingButton>
                        </Grid>

                        {/* Verify Button */}
                        <Grid container item justify="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ backgroundColor: '#023047',fontWeight:900 }}
                                onClick={handleSubmit}
                            >
                                Verify
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
