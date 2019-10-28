'use strict';

(function ($) {
    console.log($);
    $(document).ready(() => {
        $.get("/api/artists", (artists, err) => {
            if (err !== "success") console.error(err);
            if (artists && Array.isArray(artists.data)) {
                const tags = [...new Set(artists.data.map(artist => artist.tag))] // function(artist) {return artist.tag}
                const data = tags.map(tag => artists.data.filter(artist => artist.tag == tag).length)
                const ctx = document.getElementById('artists').getContext('2d');
                const artists_chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: tags,
                        datasets: [{
                            label: 'Artists based on tags',
                            data: data,
                            // backgroundColor: [
                            //     'rgba(255, 99, 132, 0.2)',
                            //     'rgba(54, 162, 235, 0.2)',
                            //     'rgba(255, 206, 86, 0.2)',
                            //     'rgba(75, 192, 192, 0.2)',
                            //     'rgba(153, 102, 255, 0.2)',
                            //     'rgba(255, 159, 64, 0.2)'
                            // ],
                            // borderColor: [
                            //     'rgba(255, 99, 132, 1)',
                            //     'rgba(54, 162, 235, 1)',
                            //     'rgba(255, 206, 86, 1)',
                            //     'rgba(75, 192, 192, 1)',
                            //     'rgba(153, 102, 255, 1)',
                            //     'rgba(255, 159, 64, 1)'
                            // ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                   display: false
                                }
                            }],

                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        }
                    }
                });
            }
        });
    });
})($);