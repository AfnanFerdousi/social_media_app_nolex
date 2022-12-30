import React from 'react';
import PostArticle from '../components/home/PostArticle';
import TopPost from '../components/media/TopPosts';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <PostArticle />
            <TopPost />
            <Footer />

        </div>
    );
};

export default Home;