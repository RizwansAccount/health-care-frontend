const serverUrl = process.env.REACT_APP_SERVER_URL;

const config = {
    serverUrl: serverUrl,
    serverApiUrl: serverUrl + "api/",

};

const KEYS = {
    userToken: "user-token",
    userId: "user-id"
}

const getLocalStore = (key) => {
    return localStorage.getItem(key);
};

const setLocalStore = (key, data) => {
    localStorage.setItem(key, data);
};

const removeLocalStore = (key) => {
    localStorage.removeItem(key);
};

export {
    config, KEYS,
    getLocalStore, setLocalStore, removeLocalStore
}