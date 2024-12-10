import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './SalaryPage.css';
import ScatterPlot from './ScatterPlot';

const SalaryPage = () => {
    useEffect(() => {
        const url = "https://jobicy.com/api/v2/remote-jobs?count=20&geo=usa&industry=marketing&tag=seo";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (!data.jobs || data.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                const salaryMinMonthly = Array(12).fill(0);
                const salaryMaxMonthly = Array(12).fill(0);

                data.jobs.forEach(job => {
                    const monthlyMin = (job.annualSalaryMin || 0) / 12;
                    const monthlyMax = (job.annualSalaryMax || 0) / 12;

                    for (let i = 0; i < 12; i++) {
                        salaryMinMonthly[i] += Math.round(monthlyMin * (1 + Math.random() * 0.3));
                        salaryMaxMonthly[i] += Math.round(monthlyMax * (1 + Math.random() * 0.3));
                    }
                });

                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                const dom = document.getElementById('chart-container');
                let myChart = echarts.getInstanceByDom(dom);
                if (!myChart) {
                    myChart = echarts.init(dom);
                }

                const option = {
                    title: {
                        text: 'Monthly Salary Range',
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
                            data: months,
                            axisLabel: {
                                color: '#fff'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            min: 25000,
                            max: 55000,
                            axisLabel: {
                                color: '#fff'
                            }
                        }
                    ],
                    series: [
                        {
                            name: 'Min Salary',
                            type: 'bar',
                            data: salaryMinMonthly,
                            label: {
                                show: true,
                                position: 'top',
                                verticalAlign: 'middle',
                                rotate: 90,
                                color: '#fff'
                            }
                        },
                        {
                            name: 'Max Salary',
                            type: 'bar',
                            data: salaryMaxMonthly,
                            label: {
                                show: true,
                                position: 'top',
                                verticalAlign: 'middle',
                                rotate: 90,
                                color: '#fff'
                            }
                        }
                    ]
                };

                if (option && typeof option === 'object') {
                    myChart.setOption(option);
                }

                window.addEventListener('resize', () => {
                    myChart.resize();
                });
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div className="main-content">
            <div className="charts-container rounded">
                <div id="chart-container" style={{ width: '100%', height: '400px' }}></div>
            </div>
            <ScatterPlot />
        </div>
    );
};

export default SalaryPage;
