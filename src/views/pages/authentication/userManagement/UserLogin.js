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
        userName: '',
        password: ''
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object().shape({
        userName: yup.string().required('Requied field'),
        password: yup.string().required('Requied field')
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmitForm = (data) => {
        console.log(data);
        navigate('/dashboard/default');
        dispatch(userLogin(data));
        // navigate('/dashboard/default');
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
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
                                                name="userName"
                                                fullWidth
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                value={values.userName}
                                                error={Boolean(touched.userName && errors.userName)}
                                                helperText={touched.userName && errors.userName ? errors.userName : ''}
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
                                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                                Sign In
                                            </Button>

                                            <Grid container>
                                                <Grid item xs>
                                                    <Link href="#" variant="body2">
                                                        Forgot password?
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Link href="#" variant="body2">
                                                        {"Don't have an account? Sign Up"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                            <Copyright sx={{ mt: 5 }} />
                                        </Box>
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
