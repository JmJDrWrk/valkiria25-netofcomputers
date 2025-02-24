import React, { useEffect } from 'react';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto'
import pollbands from "./pollbands";
const MeOnly = () => {

        const handleButtonClick = async () => {
            const pollresult = await fetch('https://netofcomputers.com:3090/tbotw/pollresults').then(res => res.json());
            console.log(pollbands)
            createGraph(pollresult)
            for (let key of Object.keys(pollbands)){
                createGraph(pollresult, pollbands[key].map(p=>p.name))
            }
        };
         function createGraph(pollresult, forEachBand=[]) {

            try {
                // let ctx = document.getElementById('myChart');
                // const script = document.createElement('script');
                // script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                // document.head.appendChild(script);
                // const pollresult = await fetch('https://netofcomputers.com:3090/tbotw/pollresults').then(res => res.json());

                // Create a dictionary to store song frequencies
                const songCount = {};
                pollresult.forEach((person) => {
                    person.selected
                    .filter((song) => forEachBand.includes(song) || forEachBand.length === 0)
                    .forEach((song) => {
                        songCount[song] = (songCount[song] || 0) + 1;
                    });
                });

                // Prepare data for the chart
                const songNames = Object.keys(songCount);
                const songFrequencies = Object.values(songCount);

                // Create a canvas element to insert the graph
                const canvas = document.createElement('canvas');
                document.body.appendChild(canvas);

                // Create the chart
                console.log('Creating chart', new Chart());
                new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: songNames,
                        datasets: [{
                            label: 'Song Frequency',
                            data: songFrequencies,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: {
                                    maxRotation: 45,
                                    minRotation: 0
                                }
                            },
                            y: {
                                beginAtZero: true
                            }
                        },
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.raw + ' votes';
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error loading poll results:', error);
            }
        }


    return (
        <>
            <button onClick={handleButtonClick}>Create Graph</button>
        </>
    );
};

export default MeOnly;
