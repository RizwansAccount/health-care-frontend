import { getLocalStore, KEYS } from '../constants/index'
export default function useUserManager () {
    const isLoggedInUser = getLocalStore(KEYS.userToken);
    return {
        isLoggedInUser
    }
}