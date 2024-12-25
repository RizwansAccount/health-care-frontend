import { config, getLocalStore } from '../constants/index'
export default function useUserManager () {
    const isLoggedInUser = getLocalStore(config.userToken);
    return {
        isLoggedInUser
    }
}