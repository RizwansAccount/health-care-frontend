const serverUrl = process.env.REACT_APP_SERVER_URL;

export const config = {
    serverUrl : serverUrl,
    serverApiUrl : serverUrl + "api/",

    userToken : "user-token"
};

export const getLocalStore =(key)=>{
    localStorage.getItem(key);
};

export const setLocalStore =(key, data)=>{
    localStorage.setItem(key, data);
}