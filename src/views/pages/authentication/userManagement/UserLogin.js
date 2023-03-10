import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { userLogin } from 'store/actions/authenticationActions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import './slider/Slider.scss';
import { sliderData } from './slider/slider-data';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const initialValues = {
        username: '',
        password: ''
    };
    const delay = 5;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedUserData = useSelector((state) => state.userReducer.loggedUserData);
    const error = useSelector((state) => state.userReducer.errorMsg);
    const [showPassword, setShowPassword] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [errMsg, setErrorMsg] = useState('');
    const [openToast, setHandleToast] = useState(false);
    const [imgeUrl, setUrls] = [];
    const [show, setShow] = useState(false);
    const validationSchema = yup.object().shape({
        username: yup.string().required('Requied field'),
        password: yup.string().required('Requied field')
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        console.log(loggedUserData);

        if (loggedUserData !== null) {
            localStorage.setItem('userData', JSON.stringify(loggedUserData.user));
            localStorage.setItem('token', JSON.stringify(loggedUserData.token));
            navigate('/dashboard/default');
        }
    }, [loggedUserData]);

    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
            setErrorMsg(error);
        }
    }, [error]);

    const handleToast = () => {
        setHandleToast(false);
    };

    const handleSubmitForm = (data) => {
        console.log(data);
        // navigate('/dashboard/default');
        dispatch(userLogin(data));
        // navigate('/dashboard/default');
    };

    const MINUTE_MS = 10000;

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
        console.log('next');
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
        console.log('prev');
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    // useEffect(() => {
    //     const urlsss = ["https://images.unsplash.com/photo-1674428431800-399f847e5322?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"],

    //     const interval = setInterval(() => {
    //         console.log('Logs every minute');
    //         setUrls;
    //     }, MINUTE_MS);

    //     return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    // }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item sm={4} md={7} xs={false}>
                    {' '}
                    {sliderData.map((slide, index) => {
                        return (
                            <div className={index === currentSlide ? 'slide current' : 'slide'} key={index}>
                                {index === currentSlide && (
                                    <div>
                                        <img
                                            height="auto"
                                            src={slide.image}
                                            alt="slide"
                                            // sx={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '150vh' }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </Grid>
                <Grid
                // item
                // xs={false}
                // sm={4}
                // md={7}
                // sx={{
                //     backgroundImage:
                //         'url(https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
                //     backgroundRepeat: 'no-repeat',
                //     backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                //     backgroundSize: 'cover',
                //     backgroundPosition: 'center'
                // }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            console.log('hi');
                            handleSubmitForm(values);
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleChange, errors, handleBlur, touched }) => {
                            return (
                                <Form>
                                    <Box
                                        sx={{
                                            my: 8,
                                            mx: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Sign in
                                        </Typography>
                                        <Box sx={{ mt: 1 }}>
                                            <TextField
                                                id="outlined-required"
                                                label="User Name"
                                                name="username"
                                                fullWidth
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                value={values.username}
                                                error={Boolean(touched.username && errors.username)}
                                                helperText={touched.username && errors.username ? errors.username : ''}
                                            />

                                            <TextField
                                                label="Password"
                                                id="outlined-start-adornment"
                                                name="password"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                type={showPassword ? 'text' : 'password'}
                                                margin="normal"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                error={Boolean(touched.password && errors.password)}
                                                helperText={touched.password && errors.password ? errors.password : ''}
                                            />

                                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                                Sign In
                                            </Button>

                                            <Grid container>
                                                <Grid item xs>
                                                    <Link href="/itos/pages/forgotpassword" variant="body2">
                                                        Forgot password?
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                            <Copyright sx={{ mt: 5 }} />
                                        </Box>
                                        {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={'LOGIN'} /> : null}
                                        {openErrorToast ? (
                                            <ErrorMsg
                                                openToast={openErrorToast}
                                                handleToast={setOpenErrorToast}
                                                mode={'LOGIN'}
                                                messages={errMsg}
                                            />
                                        ) : null}
                                    </Box>
                                </Form>
                            );
                        }}
                    </Formik>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
