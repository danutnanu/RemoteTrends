import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LocationPage = () => {
    useEffect(() => {
        const jobUrl = "https://jobicy.com/api/v2/remote-jobs?count=100"; // Fetch all jobs
        const locationUrl = "https://jobicy.com/api/v2/remote-jobs?get=locations"; // Fetch locations

        // Fetch location data
        fetch(locationUrl)
            .then(response => response.json())
            .then(locationData => {
                console.log("Location Data:", locationData); // Log location data
                if (!locationData.locations || locationData.locations.length === 0) {
                    console.error("No location data available");
                    return; // Exit if no location data
                }

                const locations = ["USA", "Canada", "UK"];
                const locationMap = { "USA": 5, "Canada": 3, "UK": 2 }; // Example job counts

                // Fetch job data
                fetch(jobUrl)
                    .then(response => response.json())
                    .then(jobData => {
                        console.log("Job Data:", jobData); // Log entire job data
                        if (!jobData.jobs || jobData.jobs.length === 0) {
                            console.error("No job data available");
                            return; // Exit if no job data
                        }

                        // Count jobs by location
                        jobData.jobs.forEach(job => {
                            console.log("Job Location:", job.jobGeo); // Log job location
                            const jobLocation = job.jobGeo || "Unknown"; // Use jobGeo for location
                            if (locationMap.hasOwnProperty(jobLocation)) {
                                locationMap[jobLocation]++; // Increment count for the location
                            }
                        });

                        // Filter locations with job counts greater than zero
                        const filteredLocations = locations.filter(location => locationMap[location] > 0);
                        const jobCounts = filteredLocations.map(location => locationMap[location]); // Get job counts for filtered locations

                        console.log("Filtered Locations:", filteredLocations); // Log filtered locations
                        console.log("Job Counts:", jobCounts); // Log job counts for filtered locations

                        // Initialize ECharts
                        const chartDom = document.getElementById('job-location-chart');
                        let myChart = echarts.getInstanceByDom(chartDom);
                        if (myChart) {
                            myChart.dispose(); // Dispose of the existing chart instance
                        }
                        myChart = echarts.init(chartDom);

                        // ECharts option for Pie Chart
                        const option = {
                            title: {
                                text: 'Job Distribution by Location',
                                left: 'center',
                                top: '1%',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            series: [
                                {
                                    name: 'Job Count',
                                    type: 'pie',
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

                        myChart.setOption(option);
                    })
                    .catch(error => console.error("Error fetching job data:", error));
            })
            .catch(error => console.error("Error fetching location data:", error));
    }, []);

    return (
        <div className="location-page">
            <h1>Jobs by Location</h1>
            <div id="job-location-chart" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default LocationPage;
