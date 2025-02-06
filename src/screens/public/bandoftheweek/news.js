import React, { useState, useEffect } from 'react';
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
    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);
    const [showModalExit, setShowModalExit] = useState(false);
    // Hide the modal after 5 seconds (or based on any other condition)
    useEffect(() => {
        // Show modal after 2 seconds
        const showTimer = setTimeout(() => {
            setShowModal(true);

            // Hide modal after 5 seconds from when it appears
            const hideTimer = setTimeout(() => {
                setShowModal(false);
            }, 150000);

            return () => clearTimeout(hideTimer); // Cleanup hide timer
        }, 3500);

        return () => clearTimeout(showTimer); // Cleanup show timer
    }, []);
    const handleAddClick = () => {
        window.open("https://netofcomputers.com/picso.html", "_blank");
        setShowModalExit(true);
    }

    return (
        <div className="newspaper">
            {/* Modal */}
            {showModal && (
                <div className="modal"  onClick={handleAddClick}>
                    <div className="modal-content">
                        {/* <span className="close">&times;</span> */}
                        {showModalExit && (<span className="close" onClick={() => setShowModal(false)}>&times;</span>)}
                        <h2>Buy Now a 0riginal Picso</h2>
                        <figure className="figure">
                                    <img
                                        className="media"
                                        src="https://netofcomputers.com/paco/paco.jpg"
                                        alt="Avenged Sevenfold"
                                    />
                                    <figcaption className="figcaption" onClick={() => window.location.href = "band.link"}></figcaption>
                                </figure>
                        <p>An incredibly unique and exclusive masterpiece of a Picso</p>
                        <h1>20$</h1>
                    </div>
                </div>
            )}
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
                                {/* {expandedArticle === index ? band.title : '??? ???'} */}
                                {band && band.title ? band.title : '??? ???'}
                            </span>
                        </div>

                        {expandedArticle === index && (
                            <>
                                {/* Check if band.paragraph is not null/undefined before calling split */}
                                {band && band.paragraph && band.paragraph.split('\n')
                                    .filter((s) => s.trim() !== '')  // Filter out empty or null strings
                                    .map((s, index) => (
                                        <p key={index}>{s}</p>  // Use index as the key instead of the string itself
                                    ))}

                                <figure className="figure">
                                    <img
                                        className="media"
                                        src={band.image}
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
                <p>Copyright © 2025 JotaRoma News. All lefts reserved.</p>
            </footer>
        </div>
    );
};

export default Newspaper;