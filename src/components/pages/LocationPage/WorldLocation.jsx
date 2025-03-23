import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const WorldLocation = () => {
    useEffect(() => {
        const jobUrl = "https://jobicy.com/api/v2/remote-jobs?count=50";
        const worldMapUrl = "https://echarts-maps.github.io/echarts-countries-js/countries/World.json";

        // Fetch job data
        fetch(jobUrl)
            .then(response => response.json())
            .then(jobData => {
                if (!jobData.jobs || jobData.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                // Count jobs by location
                const locationMap = {};
                jobData.jobs.forEach(job => {
                    const jobLocation = job.jobGeo || "Unknown";
                    if (locationMap.hasOwnProperty(jobLocation)) {
                        locationMap[jobLocation]++;
                    } else {
                        locationMap[jobLocation] = 1;
                    }
                });

                // Prepare data for the map
                const data = Object.keys(locationMap).map(location => ({
                    name: location,
                    value: locationMap[location]
                }));

                // Load the world map
                fetch(worldMapUrl)
                    .then(response => response.json())
                    .then(worldMap => {
                        echarts.registerMap('World', worldMap);

                        const option = {
                            title: {
                                text: 'Job Distribution Worldwide',
                                left: 'center',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            visualMap: {
                                min: 0,
                                max: Math.max(...data.map(item => item.value)),
                                left: 'right',
                                top: 'bottom',
                                text: ['High', 'Low'],
                                calculable: true,
                                inRange: {
                                    color: ['#f2c31a', '#24b7f2', '#ff7f50']
                                }
                            },
                            series: [
                                {
                                    name: 'Job Count',
                                    type: 'map',
                                    map: 'World',
                                    roam: true,
                                    data: data,
                                    label: {
                                        show: true
                                    },
                                    itemStyle: {
                                        emphasis: {
                                            areaColor: '#ff69b4'
                                        }
                                    }
                                }
                            ]
                        };

                        const chartDom = document.getElementById('world-location-chart');
                        let myChart = echarts.getInstanceByDom(chartDom);
                        if (myChart) {
                            myChart.dispose();
                        }
                        myChart = echarts.init(chartDom);
                        myChart.setOption(option);
                    })
                    .catch(error => console.error("Error fetching world map data:", error));
            })
            .catch(error => console.error("Error fetching job data:", error));
    }, []);

    return (
        <div className="world-location">
            <div id="world-location-chart" style={{ height: '400px' }}></div>
        </div>
    );
};

export default WorldLocation;
