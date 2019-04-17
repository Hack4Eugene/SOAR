import React from 'react';
import birdVideo from './bird-flocks.mp4';
import './Lander.scss';

const Lander = () => {
    return (
        <div className="lander-page">
            <video autoPlay muted loop className="video-background">
                <source src={birdVideo} type="video/mp4" />
            </video>
            <div className="video-overlay">
                <h1>Welcome to the SOAR Network</h1>
                <i className="description">The SOAR Network is a tool for building collaborative projects and recruiting volunteers to serve those without security, prosperity, and quality of life — the cornerstones of a culture of peace.</i>
            </div>
        </div>
    );
}

export default Lander;