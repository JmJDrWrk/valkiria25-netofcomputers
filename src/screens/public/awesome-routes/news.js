import React from 'react';
import './newnews.css';

const Newspaper = () => {
    return (
        <div className="newspaper">
            {/* <header className="newspaper-header">
        <h1>Greyscale News</h1>
        <p>Breaking news from all around the world</p>
      </header> */}
            <div className="head">
                <div className="headerobjectswrapper">
                    <div className="weatherforcastbox">
                        <span style={{ fontStyle: "italic" }}>
                            Weather forecast for the next 24 hours: Plenty of Sunshine
                        </span>
                        <br />
                        <span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span>
                    </div>
                    <header>Band Of The Week</header>
                </div>
                <div className="subhead">York, MA - Thursday August 30, 1978 - Seven Pages</div>
            </div>
            <div className="newspaper-content">
                <section className="article">
                    <div class="head">
                        <span class="headline hl5">Give people courage</span>
                        <p>
                            <span class="headline hl6">The crowd seemed to grow</span>
                        </p>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                        tincidunt felis vel felis volutpat, nec convallis augue tempus.
                    </p>
                </section>
                <section className="article">
                    <h2>Headline 2</h2>
                    <p>
                        Curabitur ut libero eu elit suscipit efficitur. Donec nec mauris
                        vestibulum, ullamcorper ipsum id, maximus nisi. Donec id libero at
                        augue gravida efficitur.
                    </p>
                </section>
                <section className="article">
                    <h2>Headline 3</h2>
                    <p>
                        Nunc et turpis velit. Quisque aliquam urna ut metus malesuada, id
                        pretium nulla rutrum. Pellentesque ut mauris sit amet enim tincidunt
                        dictum.
                    </p>
                </section>
            </div>
            <footer className="newspaper-footer">
                <p>Copyright © 2025 Greyscale News. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Newspaper;
