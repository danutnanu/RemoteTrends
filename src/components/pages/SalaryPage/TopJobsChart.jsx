import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './TopJobsChart.css';

const TopJobsChart = () => {
    useEffect(() => {
        const url = "https://jobicy.com/api/v2/remote-jobs?count=50";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (!data.jobs || data.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                const filteredJobs = data.jobs.filter(job => job.annualSalaryMin > 0 && job.annualSalaryMax > 0);

                // Sort jobs by max salary and get top 5
                const topJobs = [...filteredJobs].sort((a, b) => b.annualSalaryMax - a.annualSalaryMax).slice(0, 5);

                const topJobTitles = topJobs.map(job => job.jobTitle || "Unknown");
                const topJobMaxSalaries = topJobs.map(job => job.annualSalaryMax);
                const topJobMinSalaries = topJobs.map(job => job.annualSalaryMin);

                const topJobsDom = document.getElementById('top-jobs-chart');
                let topJobsChart = echarts.getInstanceByDom(topJobsDom);
                if (!topJobsChart) {
                    topJobsChart = echarts.init(topJobsDom);
                }

                const topJobsOption = {
                    title: {
                        text: 'Top 5 Jobs by Salary (USD)',
                        left: 'center',
                        top: '5%',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['Max Salary', 'Min Salary'],
                        textStyle: {
                            color: '#fff'
                        },
                        top: '15%'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '30%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLabel: {
                            color: '#fff',
                            formatter: function(value) {
                                return value >= 1000 ? (value / 1000) + 'K' : value;
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: topJobTitles,
                        axisLabel: {
                            color: '#fff',
                            formatter: function(value) {
                                return value.length > 15 ? value.slice(0, 15) + '...' : value;
                            }
                        }
                    },
                    series: [
                        {
                            name: 'Max Salary',
                            type: 'bar',
                            data: topJobMaxSalaries,
                            itemStyle: {
                                color: '#4caf50'
                            }
                        },
                        {
                            name: 'Min Salary',
                            type: 'bar',
                            data: topJobMinSalaries,
                            itemStyle: {
                                color: '#2196f3'
                            }
                        }
                    ]
                };

                if (topJobsOption && typeof topJobsOption === 'object') {
                    topJobsChart.setOption(topJobsOption);
                }

                window.addEventListener('resize', () => {
                    topJobsChart.resize();
                });
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return <div id="top-jobs-chart" className="top-jobs-chart mb-5 border border-3"></div>;
};

export default TopJobsChart;
