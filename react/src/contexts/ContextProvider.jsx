import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = function ({ children }) {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState("");
    // const [user, setUser] = useState({ name: "John Doe" });
    // const [token, _setToken] = useState(123);

    const setToken = function (token) {
        _setToken(token);

        // console.log(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setNotification = function (message) {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <>
            <StateContext.Provider
                value={{
                    user,
                    token,
                    notification,
                    setUser,
                    setToken,
                    setNotification,
                }}
            >
                {children}
            </StateContext.Provider>
        </>
    );
};

export const useStateContext = () => useContext(StateContext);
