import React, { useState } from 'react';
import './create-band.css';

const CreateBand = () => {
    const dummyText = `
Con un carismático Ronnie Radke al frente, este grupazo mezcla post-hardcore, metalcore y rock alternativo, con melodías pegadizas y letras que te hacen cuestionarte tu vida entera.

Con "Popular Monster" o "Prequel" han conquistado no solo a fans del metal, sino a gente de todo el mundo. Para quien no los conozca mucho, os diría que la mejor forma de saber en qué os estáis metiendo es ver sus videoclips: BRUTALES.

Nadie lo sabía, nadie lo pedía, pero los necesitábamos.

¿Qué os parece? ¿Os gustaría que fueran la banda de la semana?`;
    const [band, setBand] = useState({
        title: 'DUMMY BAND',
        paragraph: dummyText,
        image: '',
        link: ''
    });

    const handleChange = (e) => {
        setBand({
            ...band,
            [e.target.name]: e.target.value
        });
    };

    const index = 0;
    const [isLast, setIsLast] = useState(true);
    const [expandedArticle, setExpandedArticle] = useState(null);
    const [revealLastTitle, setRevealLastTitle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalExit, setShowModalExit] = useState(false);
    const [discovered, setDiscovered] = useState(false);
    const toggleArticle = (index) => {
        setExpandedArticle(expandedArticle === index ? null : index);
    };

    const handleLastTitleClick = (index) => {
        console.log('Click on that', index)
        

        if(discovered) {
            toggleArticle(index);
        }else{
            setRevealLastTitle(true);
            setDiscovered(true);
        }
        
        
    };

    return (
        <div className="create-band-container">
            <h2>Create Your Band</h2>
            <form className="band-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Band Name"
                    value={band.title}
                    onChange={handleChange}
                />
                <textarea
                    name="paragraph"
                    placeholder="Band Description"
                    value={band.paragraph}
                    onChange={handleChange}
                    style={{ height: '20vh', minHeight: '100px', maxHeight: '300px' }} 
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={band.image}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="link"
                    placeholder="Spotify Link"
                    value={band.link}
                    onChange={handleChange}
                />
            </form>

            <h3>Preview</h3>
            <div className="band-preview">
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
            </div>
        </div>
    );
};

export default CreateBand;
