import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        fetch(`https://nolex-social-server-zeta.vercel.app/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [])
    return (
        <div>
            <Navbar />
            <div className="px-12">
                <img className='w-full h-96' src={post?.file} alt="" />
                {post?.content && <p className="text-[18px] font-medium mt-4 text-start ">{post?.content.slice(3).split("</p>")}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default PostDetails;