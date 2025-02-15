// Ensure Chart.js is loaded
if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    document.head.appendChild(script);
    script.onload = createGraph;
  } else {
    createGraph();
  }
  
  async function createGraph() {
    // Reference to pollresult (you can paste the pollresult object here directly)
    const pollresult = await fetch('https://netofcomputers.com:3090/tbotw/pollresults').then(res => res.json());
  
    // Create a dictionary to store song frequencies
    const songCount = {};
  
    // Loop through pollresult to count song selections
    pollresult.forEach((person) => {
      person.selected.forEach((song) => {
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
  }