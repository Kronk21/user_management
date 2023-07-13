import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useContext, useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    // useStateContext is custom function that returns the StateContext from the context provider file
    const { user, setUser, token, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = function (e) {
        e.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        }).catch;
    }, []);

    return (
        <div id="defaultLayout">
            {/* Left bar */}
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className="content">
                {/* Top navbar */}
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" className="btn-logout" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </header>

                {/* Main content */}
                <main>
                    <Outlet />
                </main>
            </div>

            {/* Notification */}
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
