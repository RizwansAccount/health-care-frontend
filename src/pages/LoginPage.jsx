import React, { useState } from 'react'
import { useLoginMutation } from '../redux/storeApis';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../reactRoute/RouteConstants';
import { KEYS, setLocalStore } from '../constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading: isLoadingLoginUser }] = useLoginMutation();

  const [data, setData] = useState({ email: '', password: '' });

  const fnLogin = async () => {
    try {
      const result = await loginUser({ email: data?.email, password: data?.password }).unwrap();
      setLocalStore(KEYS.userToken, result?.data?.token);
      setLocalStore(KEYS.userId, result?.data?.user_id);
      setData({ email: '', password: '' });
      navigate(ROUTES.home);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='flex h-full w-full items-center justify-center' >
      <div className='flex flex-col gap-[24px]'>
        <input placeholder='Email' onChange={(e) => setData({ ...data, email: e.target.value })} />
        <input placeholder='Password' onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button onClick={fnLogin} >
          {isLoadingLoginUser ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default LoginPage