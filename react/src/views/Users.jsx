import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = function () {
        setLoading(true);

        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                // console.log(data.data);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    // Same as the function above, but using the fetch javascript api
    // const getUsers = async function () {
    //     setLoading(true);
    //     const response = await fetch("http://127.0.0.1:8000/api/users");
    //     const data = await response.json();
    //     setUsers(data.data);
    //     try {
    //     } catch (error) {
    //         setLoading(false);
    //     }
    // };

    const onDelete = function (user) {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;

        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotification("User was successfully deleted");

            // Refetch all the users
            getUsers();
        });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">
                    Add new
                </Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    {/* Table headers */}
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* Loading indicator */}
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}

                    {/* Table content */}
                    {!loading && (
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={`/users/${user.id}`}
                                            // to={"/users/" + user.id}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(event) => onDelete(user)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
