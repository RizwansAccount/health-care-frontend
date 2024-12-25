import React from 'react'
import { KEYS, removeLocalStore } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../reactRoute/RouteConstants';
import { useGetAllUsersQuery } from '../redux/storeApis';
import useUserManager from '../hooks/useUserManager';

const HomePage = () => {
  const navigate = useNavigate();

  const { data: allUsersData, isLoading: isLoadingAllUsersData } = useGetAllUsersQuery();

  const { userDetail } = useUserManager();

  const allDoctors = allUsersData?.data?.filter((user) => user?.role === 'doctor');
  const allPatients = allUsersData?.data?.filter((user) => user?.role === 'patient');

  const fnLogout = async () => {
    removeLocalStore(KEYS.userId);
    removeLocalStore(KEYS.userToken);
    navigate(ROUTES.login);
  };

  return (
    <div>
      <p>
        HomePage
      </p>

      {userDetail?.role === 'patient' &&
        allDoctors?.map((doctor) => {
          return (
            <div onClick={() => navigate(ROUTES.chat, { state: { receiver_id: doctor?._id, sender_id : userDetail?._id } })} key={doctor?._id} >
              {doctor?.name}
            </div>
          )
        })
      }
      {userDetail?.role === 'doctor' &&
        allPatients?.map((doctor) => {
          return (
            <div onClick={() => navigate(ROUTES.chat, { state: { receiver_id: doctor?._id, sender_id : userDetail?._id } })} key={doctor?._id} >
              {doctor?.name}
            </div>
          )
        })
      }

      <button onClick={fnLogout}>
        Logout
      </button>
    </div>
  )
}

export default HomePage