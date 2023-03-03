import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
// import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        // console.log(localStorage.setItem('token') );
        console.log(token);
        console.log(typeof token);
        console.log('nipuniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        if (token == 'null' || token == null) {
            console.log('nipuniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
            navigate('/pages/login', { replace: true });
        }
    }, [token, navigate]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
