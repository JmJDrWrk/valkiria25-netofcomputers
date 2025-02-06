import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Container, Grid, Box } from '@mui/material';


const MainView = () => {


    return (
        <div>
            <head>
                <link
                    href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900,400italic,700italic,900italic|Droid+Serif:400,700,400italic,700italic"
                    rel="stylesheet"
                    type="text/css"
                />
                <link rel="stylesheet" href="styles/newspaper.css" />
                <title>Newspaper Style Design Experiment</title>
                <meta name="viewport" content="width=device-width" />
            </head>
            <body>
            <div className="head">
                    <div className="headerobjectswrapper">
                        <div className="weatherforcastbox">
                            <span style={{ fontStyle: "italic" }}>
                                Weather forecast for the next 24 hours: Plenty of Sunshine
                            </span>
                            <br />
                            <span>Wind: 7km/h SSE; Ther: 21°C; Hum: 82%</span>
                        </div>
                        <header>Newpost York</header>
                    </div>
                    <div className="subhead">York, MA - Thursday August 30, 1978 - Seven Pages</div>
                </div>
                <div className="content">
                    <div className="collumns">
                        <div className="collumn">
                            <div className="head">
                                <span className="headline hl3">When darkness overspreads my eyes</span>
                                <p>
                                    <span className="headline hl4">by JOHANN WOLFGANG VON GOETHE</span>
                                </p>
                            </div>
                            <p>
                                When, while the lovely valley teems with vapour around me, and the meridian sun
                                strikes the upper surface of the impenetrable foliage of my trees, and but a few
                                stray gleams steal into the inner sanctuary, I throw myself down among the tall
                                grass by the trickling stream; and, as I lie close to the earth, a thousand unknown
                                plants are noticed by me: when I hear the buzz of the little world among the stalks,
                                and grow familiar with the countless indescribable forms of the insects and flies,
                                then I feel the presence of the Almighty, who formed us in his own image, and the
                                breath of that universal love which bears and sustains us, as it floats around us in
                                an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and
                                heaven and earth seem to dwell in my soul and absorb its power, like the form of a
                                beloved mistress, then I often think with longing, Oh, would I could describe these
                                conceptions, could impress upon paper all that is living so full and warm within me,
                                that it might be the mirror of my soul, as my soul is the mirror of the infinite
                                God!
                            </p>
                        </div>
                        <div className="collumn">
                            <div className="head">
                                <span className="headline hl5">Give people courage</span>
                                <p>
                                    <span className="headline hl6">The crowd seemed to grow</span>
                                </p>
                            </div>
                            <p>
                                The sunset faded to twilight before anything further happened. The crowd far away on
                                the left, towards Woking, seemed to grow, and I heard now a faint murmur from it.
                                The little knot of people towards Chobham dispersed. There was scarcely an
                                intimation of movement from the pit.
                            </p>
                            <figure className="figure">
                                <img
                                    className="media"
                                    src="http://i.giphy.com/PW7MoTD2d9pJK.gif"
                                    alt=""
                                />
                                <figcaption className="figcaption">Hermine hoping for courage.</figcaption>
                            </figure>
                            <p>
                                It was this, as much as anything, that gave people courage, and I suppose the new
                                arrivals from Woking also helped to restore confidence. At any rate, as the dusk
                                came on a slow, intermittent movement upon the sand pits began, a movement that
                                seemed to gather force as the stillness of the evening about the cylinder remained
                                unbroken. Vertical black figures in twos and threes would advance, stop, watch, and
                                advance again, spreading out as they did so in a thin irregular crescent that
                                promised to enclose the pit in its attenuated horns. I, too, on my side began to
                                move towards the pit.
                            </p>
                        </div>
                        <div className="collumn">
                            <div className="head">
                                <span className="headline hl1">May the Force be with you</span>
                                <p>
                                    <span className="headline hl2">Let go your conscious self and act on instinct</span>
                                </p>
                            </div>
                            <p>
                                Partially, but it also obeys your commands. Hey, Luke! May the Force be with you. I
                                have traced the Rebel spies to her. Now she is my only link to finding their secret
                                base.
                            </p>
                            <figure className="figure">
                                <img
                                    className="media"
                                    src="http://i.giphy.com/4fDWVPMoSyhgc.gif"
                                    alt=""
                                />
                                <figcaption className="figcaption">
                                    "This time, let go your conscious self and act on instinct."
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </body>
        </div>

    )
};

export default MainView;
