import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './ScatterPlot.css';

const ScatterPlot = () => {
    useEffect(() => {
        const url = "https://jobicy.com/api/v2/remote-jobs?count=20&geo=usa&industry=marketing&tag=seo";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (!data.jobs || data.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                const scatterData = data.jobs.map(job => [
                    job.annualSalaryMin || 0,
                    job.annualSalaryMax || 0
                ]);

                const dom = document.getElementById('scatter-container');
                const myChart = echarts.init(dom);

                const option = {
                    title: {
                        text: 'Salary Dispersion',
                        left: 'center',
                        top: 0
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
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    xAxis: {
                        type: 'value',
                        name: 'Min Salary'
                    },
                    yAxis: {
                        type: 'value',
                        name: 'Max Salary'
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
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div id="scatter-container" className="chart m-3 rounded"></div>
    );
};

export default ScatterPlot;
