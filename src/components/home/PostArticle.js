import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostArticle = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors } } = useForm();

    const [user, loading, error] = useAuthState(auth);
    const [file, setFile] = useState();
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorState = (editorState) => setEditorState(editorState)


    const onSubmit = async () => {
        try {
            const like = 0;
            const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            const postData = {
                content,
                file,
                user,
                like
            }
            console.log(postData)
            const res = await axios.post(`https://nolex-social-server-zeta.vercel.app/post`, postData, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            if (res?.status === 200) {
                toast("Posted");
                reset();
                console.log(res);
                // setAddBlogState(false)
            }
        } catch (e) {
            console.log(e);
        }
    }
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="text-center mt-6">
            <label htmlFor="my-modal-4" className="text-xl border-[2px] border-[#a8a8a8] px-28 py-4 rounded-2xl shadow-lg text-[#353434] font-medium">What's in your mind?</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="relative modal-box w-11/12 max-w-5xl" htmlFor="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Editor
                            editorState={editorState}
                            editorClassName="editor_container"
                            placeholder="Description"
                            onEditorStateChange={onEditorState}
                            handlePastedText={() => false}
                        />
                        <a href="https://www.linkpicture.com/en/?set=en" rel="noreferrer" target="_blank" className="btn btn-primary">Image URL genarator</a>
                        <input
                            type="url"
                            placeholder="Your image URL"
                            onChange={(e) => { setFile(e.target.value) }}
                            className="input input-bordered w-full max-w-md mt-5 ml-4" />
                        <img
                            src={file}
                            alt="No chosen"
                            className='text-center w-[300px] h-[300px] mt-4 mx-auto' />

                        <button className="btn btn-primary mt-4" type="submit">Post</button>
                    </form>
                </label>
            </label>
            <ToastContainer />
        </div>
    );
};

export default PostArticle;