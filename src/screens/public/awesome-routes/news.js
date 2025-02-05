import React, { useState } from 'react';
import './newnews.css';
import bands from './bands';

const Newspaper = () => {
    // State to manage article expansion
    const [expandedArticle, setExpandedArticle] = useState(null);

    // Function to toggle the article expansion
    const toggleArticle = (index) => {
        setExpandedArticle(expandedArticle === index ? null : index);
        console.log('bands', bands)
    };



    return (
        <div className="newspaper">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

            <div className="head">
                <div className="headerobjectswrapper">
                    <div className="weatherforcastbox">
                        <span style={{ fontStyle: 'italic' }}>
                            Weather forecast for the next 24 hours: Plenty of Sunshine
                        </span>
                        <br />
                        <span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span>
                    </div>
                    <header>Band Of The Week</header>
                </div>
                <div className="subhead">Coru, NE - NO DONGLE 30, 2025 - JOTA ROM</div>
            </div>
            <div className="newspaper-content">
                {bands.map((band, index) => (
                    <section className="article"
                        onClick={() => band && band.title ? toggleArticle(index) : null} // Disable click if band is empty
                        key={index}>
                        <div className="head">
                            <span className="headline hl5">
                                {expandedArticle === index ? band.title : '??? ???'}
                            </span>
                        </div>

                        {expandedArticle === index && (
                            <>
                                {/* Check if band.paragraph is not null/undefined before calling split */}
                                {band && band.paragraph && band.paragraph.split('\n')
                                    .filter((s) => s.trim() !== '')  // Filter out empty or null strings
                                    .map((s, index) => (
                                        <p key={index}>{s}</p>  // Use `index` as the key instead of the string itself
                                    ))}

                                <figure className="figure">
                                    <img
                                        className="media"
                                        src="https://i.gifer.com/HhXF.gif"
                                        alt="Avenged Sevenfold"
                                    />
                                    <figcaption className="figcaption" onClick={() => window.location.href = band.link}></figcaption>
                                </figure>
                                {/* Spotify Icon Link */}
                                <a href={band.link} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-spotify" style={{ fontSize: '30px', marginLeft: '10px', color: '#6c6c6c' }}></i>
                                </a>
                            </>
                        )}
                    </section>
                ))}


            </div>
            <footer className="newspaper-footer">
                <p>Copyright © 2025 Greyscale News. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Newspaper;
