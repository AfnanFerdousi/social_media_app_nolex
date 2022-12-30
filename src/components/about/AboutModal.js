import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const AboutModal = ({ updateProfile, setUpdateProfile }) => {
    const [user] = useAuthState(auth)
    const { email } = updateProfile;
    const { register, formState: { errors }, handleSubmit } = useForm();
    // console.log(updateProfile)

    const handleUpdateProfile = (data) => {
        console.log(data)
        const changes = {
            education: data.education,
            location: data.location,
            image: data.image
        }
        fetch(`http://localhost:5000/about/${user.email}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(changes)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 1 || data.modifiedCount === 1) {
                    toast.success("Successfully Edited about")
                    setUpdateProfile(null);
                }
                else {
                    toast.error('unsuccessful')
                    setUpdateProfile(null);
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box"
                >
                    <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(handleUpdateProfile)}>
                        {/* Education */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">University</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Education"
                                className="input input-bordered w-full max-w-md"
                                {...register("education")} />
                            <label className="label">
                                {errors.education?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.education.message}</span>}
                            </label>
                        </div>

                        {/* Location */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Address"
                                className="input input-bordered w-full max-w-md"
                                {...register("location")} />
                            <label className="label">
                                {errors.location?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.location.message}</span>}
                            </label>
                        </div>

                        {/* Image */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Your Image</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Your Image"
                                className="input input-bordered w-full max-w-md"
                                {...register("image")} />
                            {/* <label className="label">
                                {errors.image?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label> */}
                        </div>
                        <button className="btn modal-button mr-2" type="submit">Save</button>
                        <label htmlFor="update-modal" className="btn">Close</label>
                    </form>

                </div >
            </div >
            <ToastContainer/>
        </div >
    );
};

export default AboutModal;
