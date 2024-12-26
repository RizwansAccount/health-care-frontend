import React, { useState } from 'react'
import { useLoginMutation } from '../redux/storeApis';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../reactRoute/RouteConstants';
import { KEYS, setLocalStore } from '../constants';
import ViewAuth from '../components/views/ViewAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading: isLoadingLoginUser }] = useLoginMutation();

  const inputClass = 'bg-[var(--lightgrey)] py-[6px] rounded-[4px] pl-[4px] text-[14px]';

  const fnLogin = async (e) => {
    e.preventDefault();

    const body = { email: e.target.email.value, password: e.target.password.value };

    const checkValidation = Object.values(body)?.every(value => value);

    if (checkValidation) {
      try {
        const result = await loginUser(body).unwrap();
        setLocalStore(KEYS.userToken, result?.data?.token);
        setLocalStore(KEYS.userId, result?.data?.user_id);
        navigate(ROUTES.home);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      alert('please must filled all fields');
    }
  };

  return (
    <ViewAuth title={'Welcome back to login!'}>
      <form onSubmit={fnLogin} className='w-full flex flex-col gap-[24px]'>
        <div className='flex flex-col gap-[14px]'>
          <input name='email' type='text' placeholder='Email' className={inputClass} />
          <input name='password' type='text' placeholder='Password' className={inputClass} />
        </div>
        <button className='w-full bg-[#4A6DA7] text-white py-[6px] rounded-[4px]'>
          {isLoadingLoginUser ? 'Loading...' : 'Login'}
        </button>
      </form>
      <span onClick={() => navigate(ROUTES.register)} className='text-center text-[12px] font-semibold text-[var(--primary)] cursor-pointer'>
        Dont't have an account ? Register
      </span>
    </ViewAuth>
  )
}

export default LoginPage