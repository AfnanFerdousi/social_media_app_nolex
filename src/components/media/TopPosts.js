import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiThumbsUp } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';

const TopPost = () => {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const [user, loading, error] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState()
    // const clientComment = watch("comment");
    // console.log(clientComment)
    useEffect(() => {
        fetch('http://localhost:5000/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])
    // console.log(user);
    // token
 const sorted=posts.sort((a, b) => a.like - b.like);

    // console.log(comment)
    const handleComment = (data) => {
        // console.log(data)
        /* const cmnt = {
            postId: _id,
            comment
        }
        fetch(`http://localhost:5000/comment`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(cmnt)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log("comment added")
                }
                else {
                    toast.error('unsuccessful')
                }
            }) */
        console.log(data);
    }

    const handleLike = async (_id) => {
        const res = await axios.put(`http://localhost:5000/updateLike/${_id}`)
        console.log(res)
    }
    return (
        <div className="flex flex-col items-center mt-6">
            {
                sorted.slice(0,3)?.map((post) => {
                    return (
                        <div className='p-4 border-[1px] border-gray-300 mb-4 card w-[30rem] bg-base-100 shadow-xl'>
                            <div className="flex items-center mb-4 border-b-[1px] pb-4">
                                <div className="avatar online placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                        <span className="text-xl uppercase">{user?.displayName.slice(0, 2)}</span>
                                    </div>
                                </div>
                                <h2 className="text-xl capitalize font-medium text-blue-600 ml-4">{user?.displayName}</h2>
                            </div>
                            {post?.content && <p className="text-[16px] font-medium mb-4 text-start pl-2">{post?.content.slice(3).split("</p>")}</p>}
                            {post?.file && <img
                                alt=""
                                className="w-[300px] h-[300px] mx-auto  pt-2"
                                src={post?.file}

                            />}
                            <diV className="flex justify-between mt-4">
                                <button className="flex justify-between items-center bg-blue-400 py-2 px-4 ease-out duration-300 hover:font-bold text-[#fff] font-medium rounded-xl text-[16px]" onClick={() => handleLike(post?._id)}>Like<FiThumbsUp className="pl-2 w-full" /></button>
                                <Link to={`/media/${post?._id}`} className="border-[2px] border-blue-400 py-2 px-4 ease-out duration-300 font-medium rounded-xl text-[16px] text-blue-400 hover:bg-blue-400 hover:text-[#fff]">Details</Link>
                            </diV>
                            <div className="flex items-center mb-4 border-b-[1px] pb-4 mt-4 ">
                                <div className="avatar online placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                        <span className="text-xl uppercase">{user?.displayName.slice(0, 2)}</span>
                                    </div>
                                </div>
                                <form className='flex items-center pl-2 w-full' onSubmit={handleSubmit(handleComment)}>
                                    <input
                                        type="text"
                                        placeholder="Your Comment"
                                        className="input input-bordered w-full max-w-lg"
                                        // onChange={handleChange}
                                        {...register("comment")}
                                    />
                                    <button type="submit" className="text-[16px]"
                                    ><AiOutlineSend /></button>
                                </form>
                            </div>

                        </div>
                    )
                })
            }
            <ToastContainer />
        </div>
    );
};

export default TopPost;