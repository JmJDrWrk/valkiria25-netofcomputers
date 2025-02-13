import React, { useState, useEffect } from 'react';
import './create-band.css';
import './newnews.css';
const CreateBand = () => {
    async function pushBand(bandData) {
        const test = await fetch('https://netofcomputers.com:3090/tbotw/check', {
            method: 'GET',

        });
        console.log('test:', test);
        try {
            const response = await fetch('https://netofcomputers.com:3090/tbotw/band', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bandData),
            });


            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Failed to add band');
            }

            // Parse the JSON response
            const result = await response.json();
            console.log('Band added successfully:', result);

            return result;  // You can use this in the calling component to show success
        } catch (error) {
            console.error('Error adding band:', error);
            throw error;  // Throw error so it can be caught in the calling component
        }
    }
    const dummyText = `
        Con un carismático Ronnie Radke al frente, este grupazo mezcla post-hardcore, metalcore y rock alternativo, con melodías pegadizas y letras que te hacen cuestionarte tu vida entera.

        Con "Popular Monster" o "Prequel" han conquistado no solo a fans del metal, sino a gente de todo el mundo. Para quien no los conozca mucho, os diría que la mejor forma de saber en qué os estáis metiendo es ver sus videoclips: BRUTALES.

        Nadie lo sabía, nadie lo pedía, pero los necesitábamos.

        ¿Qué os parece? ¿Os gustaría que fueran la banda de la semana?`;

    useEffect(() => {
        const botw_current_edit = localStorage.getItem('botw_current_edit');
        if (botw_current_edit) {
            setBand(JSON.parse(botw_current_edit));
        }
    }, []);
    const [band, setBand] = useState({
        title: 'DUMMY BAND',
        paragraph: dummyText,
        image: 'https://media3.giphy.com/media/X6yCu7Hl5vsmbm25Lt/giphy.gif?cid=6c09b952s22hv3fvod1ytepixd4y2uuo60ry45z4jq6htk5u&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g',
        link: 'https://www.google.com/search?q=metal+circle+pit&sca_esv=d544c2d20ee04d76&rlz=1C1GCGA_enES1093ES1093&sxsrf=AHTn8zqO9-8uBTaaosYMzxU6TMCV7g6AVg%3A1739460152422&ei=OA6uZ5-sGYa6i-gPu4CF-A4&ved=0ahUKEwifqPGD-sCLAxUG3QIHHTtAAe8Q4dUDCBA&uact=5&oq=metal+circle+pit&gs_lp=Egxnd3Mtd2l6LXNlcnAiEG1ldGFsIGNpcmNsZSBwaXQyCBAAGIAEGMsBMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5I91JQ9QtYy05wC3gAkAEAmAF4oAHqDKoBAzcuObgBA8gBAPgBAZgCG6ACww3CAgsQABiABBiwAxiiBMICCxAuGIAEGMcBGK8BwgIKEAAYgAQYFBiHAsICBRAAGIAEwgIEECMYJ8ICDhAuGIAEGMcBGI4FGK8BwgILEC4YgAQYsQMYgwHCAgQQABgDwgIOEC4YgAQYsQMYgwEY1ALCAgsQLhiABBixAxjUAsICCBAuGIAEGLEDwgIIEAAYgAQYsQPCAhAQABiABBixAxiDARiKBRgKwgIHEC4YgAQYCsICChAuGIAEGBQYhwLCAgUQLhiABMICBxAAGIAEGArCAggQABgWGAoYHpgDAIgGAZAGBJIHBTE1LjEyoAeOfw&sclient=gws-wiz-serp'
    });

    const handleChange = (e) => {
        setBand({
            ...band,
            [e.target.name]: e.target.value
        });
        localStorage.setItem('botw_current_edit', JSON.stringify(band));
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
        if (discovered) {
            toggleArticle(index);
        } else {
            setRevealLastTitle(true);
            setDiscovered(true);
        }
    };

    const exportBand = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(band));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "band_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importBand = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedBand = JSON.parse(e.target.result);
                setBand(importedBand);
            } catch (error) {
                alert("Invalid file format");
            }
        };
        reader.readAsText(file);
    };

    const [showWarning, setShowWarning] = useState(false);

    const saveToServer = () => {
        console.log("Saving band data to server:", band);
        setShowWarning(false);
        pushBand(band);
        // alert("Band saved successfully!");
    };

    return (
        <div className="create-band-container">

            <h2>Create Your Band</h2>
            <button className="btn-newspaper" onClick={exportBand}>Export</button>
            <input type="file" accept=".json" onChange={importBand} style={{ display: 'none' }} id="import-band" />
            <label htmlFor="import-band" className="btn-newspaper import-button">Import</label>


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

            <button className="btn-newspaper btn-danger" onClick={() => setShowWarning(true)}>Save to Server</button>
            {showWarning && (
                <div className="modal">
                    <p>⚠️ Warning: This action is irreversible. Do you want to continue?</p>
                    <button className="btn-newspaper btn-success" onClick={saveToServer}>Yes, Save</button>
                    <button className="btn-newspaper btn-secondary" onClick={() => setShowWarning(false)}>Cancel</button>
                </div>
            )}


        </div>



    );
};

export default CreateBand;
