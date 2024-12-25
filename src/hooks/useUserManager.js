import { getLocalStore, KEYS } from '../constants/index'
import { useGetUserQuery } from '../redux/storeApis';
export default function useUserManager () {

    const isLoggedInUser = getLocalStore(KEYS.userToken);
    const loggedInUserId = getLocalStore(KEYS.userId);

    const { data : userData, isLoading : isLoadingUserData } = useGetUserQuery(loggedInUserId);

    const userDetail = userData?.data;

    return {
        userDetail,
        isLoggedInUser
    }
}