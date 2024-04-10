import axios from 'axios';
import { loginFailed, loginStart, loginSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/v1/auth/login', user);
        console.log('res', res);
        dispatch(loginSuccess(res.data));
        navigate('/home');
    } catch (err) {
        dispatch(loginFailed());
    }
};
