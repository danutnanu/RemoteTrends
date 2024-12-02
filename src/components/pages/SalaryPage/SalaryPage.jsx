import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './SalaryPage.css';

const SalaryPage = () => {
    useEffect(() => {
        const url = "https://jobicy.com/api/v2/remote-jobs?count=20&geo=usa&industry=marketing&tag=seo";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const salaryMin = data.jobs.filter(job => job.annualSalaryMin).map(job => job.annualSalaryMin);
                const salaryMax = data.jobs.filter(job => job.annualSalaryMax).map(job => job.annualSalaryMax);
                const jobTitles = data.jobs.map(job => job.jobTitle);

                const dom1 = document.getElementById('chart-container-1');
                const myChart1 = echarts.init(dom1);

                const dom2 = document.getElementById('chart-container-2');
                const myChart2 = echarts.init(dom2);

                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['Min Salary', 'Max Salary']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: { show: false },
                            data: jobTitles
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'Min Salary',
                            type: 'bar',
                            data: salaryMin
                        },
                        {
                            name: 'Max Salary',
                            type: 'bar',
                            data: salaryMax
                        }
                    ]
                };

                if (option && typeof option === 'object') {
                    myChart1.setOption(option);
                    myChart2.setOption(option);
                }

                window.addEventListener('resize', () => {
                    myChart1.resize();
                    myChart2.resize();
                });
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div className="main-content">
            <div className="charts-container">
                <div id="chart-container-1" style={{ width: '50%', height: '400px' }}></div>
                <div id="chart-container-2" style={{ width: '50%', height: '400px' }}></div>
            </div>
        </div>
    );
};

export default SalaryPage;
