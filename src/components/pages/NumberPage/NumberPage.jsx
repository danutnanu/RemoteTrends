import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './NumberPage.css'

const NumberPage = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jobicy.com/api/v2/remote-jobs?count=50');
                const data = await response.json();

                if (!data.jobs || data.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                // Count jobs by industry
                const industryCounts = {};
                data.jobs.forEach(job => {
                    const industry = job.jobIndustry || 'Other';
                    industryCounts[industry] = (industryCounts[industry] || 0) + 1;
                });

                // Convert to array format for ECharts
                const chartData = Object.entries(industryCounts).map(([name, value]) => ({
                    name,
                    value
                }));

                const chartDom = document.getElementById('industry-chart');
                const myChart = echarts.init(chartDom);
                
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c} jobs ({d}%)'
                    },
                    legend: {
                        top: '5%',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [
                        {
                            name: 'Jobs by Industry',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            center: ['50%', '70%'],
                            startAngle: 180,
                            endAngle: 360,
                            data: chartData,
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {
                                borderRadius: 5,
                                borderColor: '#24303f',
                                borderWidth: 2
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
                console.error("Error fetching job data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main-content">
            <div className="container p-1 mt-3 mt-lg-0">
                <div className="ind m-1 mb-3 mb-lg-2 border border-1 rounded-3">
                    <div id="industry-chart" style={{ height: '400px' }}></div>
                </div>
                <div className="ind m-1 mb-2 border border-1 rounded-3">
                    test
                </div>
            </div>
        </div>
    );
};

export default NumberPage;
