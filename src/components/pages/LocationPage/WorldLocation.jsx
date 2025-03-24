import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const WorldLocation = () => {
    const jobUrl = "https://jobicy.com/api/v2/remote-jobs?count=50";
    const locationUrl = "https://jobicy.com/api/v2/remote-jobs?get=locations";

    useEffect(() => {
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

                // Initialize ECharts for the bar chart
                const setBarChartOptions = () => {
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
                            trigger: 'item'
                        },
                        xAxis: {
                            type: 'category',
                            data: filteredLocations, // Use filtered locations for x-axis
                        },
                        yAxis: {
                            type: 'value'
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
                    let barChart = echarts.getInstanceByDom(barChartDom);
                    if (barChart) {
                        barChart.dispose();
                    }
                    barChart = echarts.init(barChartDom);
                    barChart.setOption(barOption);
                };

                setBarChartOptions(); // Set up the bar chart
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData(); // Fetch data for the chart
    }, []);

    return (
        <div className="world-location">
            <div id="job-count-bar-chart" style={{ height: '400px' }}></div>
        </div>
    );
};

export default WorldLocation;
