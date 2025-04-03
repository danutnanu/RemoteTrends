import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const ScatterPlot = () => {
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

                const scatterData = data.jobs.map(job => ({
                    value: [job.annualSalaryMin || 0, job.annualSalaryMax || 0],
                    name: job.jobTitle || "Unknown"
                }));

                const dom = document.getElementById('scatter-container');
                let myChart = echarts.getInstanceByDom(dom);
                if (myChart) {
                    myChart.dispose(); // Dispose of the existing chart instance
                }
                myChart = echarts.init(dom);

                const option = {
                    title: {
                        text: 'Salary Dispersion',
                        left: 'center',
                        top: 10,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 200000,
                        dimension: 1,
                        orient: 'vertical',
                        right: 10,
                        top: 'center',
                        text: ['HIGH', 'LOW'],
                        calculable: true,
                        inRange: {
                            color: ['#f2c31a', '#24b7f2']
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            const formatValue = (value) => value >= 1000 ? (value / 1000) + 'K' : value;
                            return `
                                <strong>${params.data.name}</strong><br/>
                                Min Salary: $${formatValue(params.data.value[0])}<br/>
                                Max Salary: $${formatValue(params.data.value[1])}
                            `;
                        }
                    },
                    xAxis: {
                        type: 'value',
                        name: 'Min Salary',
                        nameTextStyle: {
                            color: '#fff'
                        },
                        axisLabel: {
                            formatter: function (value) {
                                return value >= 1000 ? (value / 1000) + 'K' : value;
                            },
                            color: '#fff'
                        },
                        interval: 50000
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Max Salary',
                        nameTextStyle: {
                            color: '#fff'
                        },
                        axisLabel: {
                            formatter: function (value) {
                                return value >= 1000 ? (value / 1000) + 'K' : value;
                            },
                            color: '#fff'
                        },
                        interval: 50000
                    },
                    series: [
                        {
                            name: 'Salary',
                            type: 'scatter',
                            symbolSize: 10,
                            data: scatterData
                        }
                    ]
                };

                myChart.setOption(option);

                window.addEventListener('resize', () => {
                    myChart.resize();
                });

                // Cleanup function to dispose of the chart on unmount
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
        <div id="scatter-container" className="chart border border-1 rounded-3 p-4" style={{ height: "400px" }}></div>
    );
};

export default ScatterPlot;
