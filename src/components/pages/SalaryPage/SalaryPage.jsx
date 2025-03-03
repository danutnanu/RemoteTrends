import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './SalaryPage.css';
import ScatterPlot from './ScatterPlot';
import TopJobsChart from './TopJobsChart';

const SalaryPage = () => {
    useEffect(() => {
        const url = "https://jobicy.com/api/v2/remote-jobs?count=50";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (!data.jobs || data.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                const filteredJobs = data.jobs.filter(job => job.annualSalaryMin > 0 && job.annualSalaryMax > 0);
                const jobTitles = filteredJobs.map(job => job.jobTitle || "Unknown");
                const salaryMin = filteredJobs.map(job => job.annualSalaryMin);
                const salaryMax = filteredJobs.map(job => job.annualSalaryMax);

                const dom = document.getElementById('chart-container');
                let myChart = echarts.getInstanceByDom(dom);
                if (myChart) {
                    myChart.dispose();
                }
                myChart = echarts.init(dom);

                const option = {
                    title: {
                        text: 'Annual Salary Range by Job (USD)',
                        left: 'center',
                        top: '1%',
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
                        data: ['Min Salary', 'Max Salary'],
                        textStyle: {
                            color: '#fff'
                        },
                        top: '10%'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: { show: false },
                            data: jobTitles,
                            axisLabel: {
                                color: '#fff',
                                rotate: 45,
                                interval: 0,
                                formatter: function(value) {
                                    return value.length > 10 ? value.slice(0, 10) + '...' : value;
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                color: '#fff',
                                formatter: function(value) {
                                    if (value >= 1000) {
                                        return (value / 1000) + 'K';
                                    }
                                    return value;
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Min Salary',
                            type: 'bar',
                            data: salaryMin,
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        },
                        {
                            name: 'Max Salary',
                            type: 'bar',
                            data: salaryMax,
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff'
                            }
                        }
                    ]
                };

                myChart.setOption(option);
                window.addEventListener('resize', () => {
                    myChart.resize();
                });

                return () => {
                    myChart.dispose();
                };
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main-content">
            <div className="fixed-top fixed-header text-center">
                <img src="/favic.ico" alt="RemoteTrends Logo" style={{ width: '40px', height: '30px', marginRight: '20px', marginBottom: '10px' }} />
                <div className="title-container">
                    <span style={{ fontSize: '1.8em', fontWeight: 'bold' }}>RemoteTrends</span>
                </div>
            </div>
            <div className="charts-container px-3">
                <TopJobsChart />
                <div id="chart-container" className="pt-3 mb-5 rounded border border-3" style={{ width: '100%', height: '400px' }}></div>
            </div>
            <ScatterPlot />
        </div>
    );
};

export default SalaryPage;
