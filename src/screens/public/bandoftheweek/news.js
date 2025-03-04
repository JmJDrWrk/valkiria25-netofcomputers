import React, { useState, useEffect } from 'react';
import './newnews.css';
import bandsData from './bands';

const Newspaper = () => {
    const [bands, setBands] = useState(bandsData);
    const [expandedArticle, setExpandedArticle] = useState(null);
    const [revealLastTitle, setRevealLastTitle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalExit, setShowModalExit] = useState(true);

    useEffect(() => {
        const storedReveal = localStorage.getItem('revealLastTitle-III');
        if (storedReveal === 'true') {
            setRevealLastTitle(true);
        }

        // Fetch the band of the week and add it to the bands array
        fetch('https://netofcomputers.com:3090/tbotw/band-of-this-week')
            .then((response) => response.json())
            .then((data) => {
                // Ensure the response has the expected data
                if (data && data.title && data.paragraph && data.image && data.link && data !== null) {
                    setBands((prevBands) => {
                        // Check for duplicates based on the band name
                        const isDuplicate = prevBands.some(band => band.title === data.title);
                        if (!isDuplicate) {
                            return [...prevBands, data];
                        }
                        return prevBands;
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching band of the week:', error);
            });
    }, []);

    const toggleArticle = (index) => {
        setExpandedArticle(expandedArticle === index ? null : index);
    };

    const handleLastTitleClick = (index) => {
        if (!localStorage.getItem('revealLastTitle-III')) {
            localStorage.setItem('revealLastTitle-III', 'true');
            setRevealLastTitle(true);
        } else {
            toggleArticle(index);
        }
    };
    useEffect(() => {
        const showTimer = setTimeout(() => {
            //UNCOMMENT THIS LINE TO SHOW ADD
            // setShowModal(true);
            // const hideTimer = setTimeout(() => setShowModal(false), 5000);
            // return () => clearTimeout(hideTimer);
        }, 3500);

        return () => clearTimeout(showTimer);
    }, []);
    const handleAddClick = () => {
        window.open("https://netofcomputers.com/picso.html", "_blank");
        setShowModalExit(true);
    }
    return (
        <div className="newspaper">
            {/* Modal */}
            {/* {showModal && (
                <div className="modal" onClick={() => setShowModalExit(true)} id="add-modal">
                    <div className="modal-content">
                        {showModalExit && (
                            <span className="close" onClick={() => setShowModal(false)} id="add-modal-close" >&times;</span>
                        )}
                        <h2>Buy Now a 0riginal Picso</h2>
                        <figure className="figure">
                            <img className="media" src="https://netofcomputers.com/paco/paco.jpg" alt="Avenged Sevenfold" />
                            <figcaption className="figcaption"></figcaption>
                        </figure>
                        <p>An incredibly unique and exclusive masterpiece of a Picso</p>
                        <h1>20$</h1>
                    </div>
                </div>
            )} */}
            {showModal && (
                <div className="modal" onClick={() => setShowModalExit(true)} id="add-modal">
                    <div className="modal-content">
                        {showModalExit && (
                            <span className="close" onClick={() => setShowModal(false)} id="add-modal-close" >&times;</span>
                        )}
                        <h2>Resuvideo 2024!!??</h2>
                        <figure className="figure">
                            <img className="media" src="https://netofcomputers.com/media/bandoftheweek/others/VideoEditorJustEditing.jpg" alt="Editor Editing" />
                            <figcaption className="figcaption"></figcaption>
                        </figure>
                        <p>
                            Sabemos que os hemos prometido un video a finales del mes pasado, pero como la ocasión lo merece, hemos
                            decidido aplazar la entrega todo lo necesario para que el resultado sea el mejor posible. ¡Gracias por vuestra paciencia!
                        </p>
                        <h1>??/??/2025</h1>
                    </div>
                </div>
            )}
            <div className="head">
                <div className="headerobjectswrapper">
                    <div className="weatherforcastbox">
                        <span style={{ fontStyle: 'italic' }}>Weather forecast for the next 24 hours: Plenty of Sunshine</span><br />
                        <span>Wind: 7km/h SSE; Temp: 21°C; Hum: 82%</span>
                    </div>
                    <header>Band Of The Week</header>
                </div>
                <div className="subhead">Coru, NE - NO DONGLE 30, 2025 - JOTA ROM</div>
            </div>

            <div className="newspaper-content">
                {bands.map((band, index) => {
                    const isLast = index === bands.length - 1;
                    return (
                        <section
                            className="article"
                            key={index}
                            onClick={() => isLast ? handleLastTitleClick(index) : toggleArticle(index)}
                        >
                            <div className="head">
                                <span className={`headline hl5 ${isLast && revealLastTitle ? "reveal-title" : ""}`}>
                                    {isLast && !revealLastTitle ? "??? ???" : band.title}
                                </span>
                            </div>

                            {expandedArticle === index && (
                                <>
                                    {band.paragraph?.split("\n").map((s, i) => (
                                        <p key={i}>{s}</p>
                                    ))}

                                    <figure className="figure">
                                        <img className="media" src={band.image} alt={band.title} />
                                        <figcaption className="figcaption" onClick={() => window.location.href = band.link}></figcaption>
                                    </figure>

                                    <a href={band.link} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-spotify" style={{ fontSize: '30px', marginLeft: '10px', color: '#6c6c6c' }}></i>
                                    </a>
                                </>
                            )}
                        </section>
                    );
                })}
            </div>

            <footer className="newspaper-footer">
                <p>Copyright © 2025 JotaRoma News. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Newspaper;
