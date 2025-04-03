import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './LocationPage.css';
import WorldLocation from './WorldLocation';

const LocationPage = () => {
    useEffect(() => {
        const jobUrl = "https://jobicy.com/api/v2/remote-jobs?count=50";
        const locationUrl = "https://jobicy.com/api/v2/remote-jobs?get=locations";

        fetch(locationUrl)
            .then(response => response.json())
            .then(locationData => {
                if (!locationData.locations || locationData.locations.length === 0) {
                    console.error("No location data available");
                    return; // Exit if no location data
                }

                const locations = locationData.locations.map(location => location.geoName); // Extract location names
                const locationMap = {};
                locations.forEach(location => {
                    locationMap[location] = 0; // Initialize count for each location
                });

                fetch(jobUrl)
                    .then(response => response.json())
                    .then(jobData => {
                        if (!jobData.jobs || jobData.jobs.length === 0) {
                            console.error("No job data available");
                            return; // Exit if no job data
                        }

                        // Count jobs by location
                        jobData.jobs.forEach(job => {
                            const jobLocation = job.jobGeo || "Unknown"; // Use jobGeo for location
                            if (locationMap.hasOwnProperty(jobLocation)) {
                                locationMap[jobLocation]++; // Increment count for the location
                            }
                        });

                        // Filter locations with job counts greater than zero
                        const filteredLocations = locations.filter(location => locationMap[location] > 0);
                        const jobCounts = filteredLocations.map(location => locationMap[location]); // Get job counts for filtered locations

                        // Initialize ECharts for the pie chart
                        const setChartOptions = () => {
                            const option = {
                                title: {
                                    text: 'Job Distribution by Location',
                                    left: 'center',
                                    top: '5%',
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                tooltip: {
                                    trigger: 'item'
                                },
                                legend: {
                                    orient: 'vertical',
                                    top: '25%', 
                                    left: window.innerWidth >= 992 ? '10%' : 'left', // Adjust left position for large devices
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    itemGap: window.innerWidth >= 992 ? 10 : 5 // Adjust item gap for large devices
                                },
                                series: [
                                    {
                                        name: 'Job Count',
                                        type: 'pie',
                                        top: '10%',
                                        radius: '50%',
                                        data: filteredLocations.map((location, index) => ({
                                            value: jobCounts[index],
                                            name: location
                                        })),
                                        emphasis: {
                                            itemStyle: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        },
                                        label: {
                                            color: '#fff'
                                        }
                                    }
                                ],
                                color: ['#f2c31a', '#24b7f2', '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4']
                            };

                            const chartDom = document.getElementById('job-location-chart');
                            let myChart = echarts.getInstanceByDom(chartDom);
                            if (myChart) {
                                myChart.dispose();
                            }
                            myChart = echarts.init(chartDom);
                            myChart.setOption(option);
                        };

                        setChartOptions(); // Call to set chart options
                        window.addEventListener('resize', setChartOptions); // Add resize listener

                        return () => {
                            window.removeEventListener('resize', setChartOptions); // Cleanup listener
                        };
                    })
                    .catch(error => console.error("Error fetching job data:", error));
            })
            .catch(error => console.error("Error fetching location data:", error));
    }, []);

    return (
        <div className="main-content">
            <div className="container p-1 mt-3 mt-lg-0">
                <div className="m-1 mb-3 mb-lg-2 border border-1 rounded-3">
                    <div id="job-location-chart" className='rounded-3' style={{ width: '100%', height: '400px' }}></div>
                </div>
                <div className="world m-1 mb-2 border border-1 rounded-3">
                    <WorldLocation />
                </div>
            </div>
        </div>
    );
};

export default LocationPage;
