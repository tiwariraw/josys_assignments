import React, { useContext } from "react";
import AuthContext from "./AuthContext";

const UserProfile: React.FC = () => {
    const { user, login, logout } = useContext(AuthContext);
    // console.log(user, "user login")

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc" }}>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <button onClick={logout}>Log Out</button>
                </div>
            ) : (
                <div>
                    <h2>You are not logged in.</h2>
                    <button onClick={() => login({ id: 1, name: "Satish Chepuri" })}>
                        Log In
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
