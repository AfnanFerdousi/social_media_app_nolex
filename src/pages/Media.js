import React from 'react';
import AllPost from '../components/media/AllPost';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';

const Media = () => {
    return (
        <div>
            <Navbar />
            <AllPost />
            <Footer/>
        </div>
    );
};

export default Media;