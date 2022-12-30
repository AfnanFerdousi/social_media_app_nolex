import React from 'react';
import Navbar from '../components/shared/Navbar';
import AboutComp from '../components/about/AboutComp';
import Footer from '../components/shared/Footer';

const About = () => {
    return (
        <div>
            <Navbar />
            <AboutComp />
            <Footer/>
        </div>
    );
};

export default About;