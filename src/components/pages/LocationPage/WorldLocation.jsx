import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const WorldLocation = () => {
    const jobUrl = "https://jobicy.com/api/v2/remote-jobs?count=50";
    const locationUrl = "https://jobicy.com/api/v2/remote-jobs?get=locations";

    useEffect(() => {
        let barChart = null; // Store chart instance at component level

        const setBarChartOptions = (filteredLocations, jobCounts) => {
            const barOption = {
                title: {
                    text: 'Job Count by Location',
                    left: 'center',
                    top: '5%',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    // color: '#fff'
                },
                xAxis: {
                    type: 'category',
                    data: filteredLocations, // Use filtered locations for x-axis
                    axisLabel: {
                        color: '#fff' // Set x-axis labels color to white
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#fff' // Set y-axis labels color to white
                    }
                },
                series: [
                    {
                        name: 'Jobs',
                        type: 'bar',
                        data: jobCounts, // Use job counts for the bar chart
                        itemStyle: {
                            borderRadius: 10
                        }
                    }
                ],
                color: ['#f2c31a', '#24b7f2', '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4'],
                legend: {
                    orient: 'vertical',
                    top: '80',
                    left: '5',
                    textStyle: {
                        color: '#fff'
                    },
                    padding: [10, 10, 10, 10], // Example padding
                },
            };

            const barChartDom = document.getElementById('job-count-bar-chart');
            if (barChart) {
                barChart.dispose();
            }
            barChart = echarts.init(barChartDom);
            barChart.setOption(barOption);
        };

        const handleResize = () => {
            if (barChart) {
                barChart.resize();
            }
        };

        const fetchData = async () => {
            try {
                const locationResponse = await fetch(locationUrl);
                const locationData = await locationResponse.json();
                console.log("Location Data:", locationData); // Log location data
                if (!locationData.locations || locationData.locations.length === 0) {
                    console.error("No location data available");
                    return; // Exit if no location data
                }

                const locations = locationData.locations.map(location => location.geoName); // Extract location names
                const locationMap = {};
                locations.forEach(location => {
                    locationMap[location] = 0; // Initialize count for each location
                });

                const jobResponse = await fetch(jobUrl);
                const jobData = await jobResponse.json();
                console.log("Job Data:", jobData); // Log entire job data
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

                setBarChartOptions(filteredLocations, jobCounts);
                
                // Add resize event listener
                window.addEventListener('resize', handleResize);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            if (barChart) {
                barChart.dispose();
            }
        };
    }, []);

    return (
        <div className="world-location">
            <div id="job-count-bar-chart" style={{ height: '400px' }}></div>
        </div>
    );
};

export default WorldLocation;
