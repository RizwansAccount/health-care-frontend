import React, { useState } from 'react'
import ViewAuth from '../components/views/ViewAuth'
import { useRegisterMutation } from '../redux/storeApis';
import { ROUTES } from '../reactRoute/RouteConstants';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const navigate = useNavigate();

  const [registerUser, { isLoading: isLoadingRegisterUser }] = useRegisterMutation();

  const inputClass = 'bg-[var(--lightgrey)] py-[6px] rounded-[4px] pl-[4px] text-[14px]';

  const fnRegister = async (e) => {
    e.preventDefault();

    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
    };

    const checkValidation = Object.values(body)?.every(value => value);

    if (checkValidation) {
      try {
        await registerUser(body).unwrap();
        navigate(ROUTES.login);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      alert('please must filled all fields');
    }
  };

  return (
    <ViewAuth title={'Create your account here!'}>
      <form onSubmit={fnRegister} className='w-full flex flex-col gap-[24px]'>
        <div className='flex flex-col gap-[14px]'>

          <input name='name' type='text' placeholder='Name' className={inputClass} />
          <input name='email' type='text' placeholder='Email' className={inputClass} />
          <input name='password' type='text' placeholder='Password' className={inputClass} />

          <select name="role" className={inputClass}>
            <option value="" disabled selected>Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <input name='phone' type='text' placeholder='Phone' className={inputClass} />
          <input name='address' type='text' placeholder='Address' className={inputClass} />

        </div>
        <button className='w-full bg-[#4A6DA7] text-white py-[6px] rounded-[4px]'>
          {isLoadingRegisterUser ? 'Loading...' : 'Register'}
        </button>
      </form>
      <span onClick={() => navigate(ROUTES.login)} className='text-center text-[12px] font-semibold text-[var(--primary)] cursor-pointer'>
        Already have an account ? Login
      </span>
    </ViewAuth>
  )
}

export default RegisterPage