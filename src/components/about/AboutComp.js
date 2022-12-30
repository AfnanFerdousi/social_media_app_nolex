import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import AboutModal from './AboutModal';

const AboutComp = () => {
    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [updateProfile, setUpdateProfile] = useState(null);
    // console.log(user);
      useEffect(() => {
            const myProfile = () => {
                fetch(`http://localhost:5000/user/${user?.email}`, {
                    method: "GET",
                    headers: { 
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("accessToken")}` 
                    }
                })
                    .then(res => res.json())
                    .then(data => setUsers(data))
            }
            myProfile();
        }, [users]) 
        // console.log(users)
    return(
       <div className="mt-6  flex flex-cols justify-center items-center">
            <div className="card flex items-center flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                <div className="card flex items-center bg-base-100 ">
                    <div className="avatar mt-2">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={users?.image} alt="me" />
                        </div>
                    </div>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{user?.displayName}</h2>
                        <h2 className="text-blue-500">Email: {user?.email}</h2>
                        <h2 className=" text-xl font-medium">University: {users?.education}</h2>
                        <h2 className=" text-xl font-medium">Address: {users?.location}</h2>
                        <div className="card-actions mt-4">
                            <label htmlFor="update-modal" className="btn btn-primary"
                                onClick={() => setUpdateProfile(users)} >UPDATE</label>
                        </div>
                    </div>
                </div>
            </div>
            {updateProfile && <AboutModal setUpdateProfile={setUpdateProfile} updateProfile={updateProfile}></AboutModal>} 
        </div>
    )
}

export default AboutComp;