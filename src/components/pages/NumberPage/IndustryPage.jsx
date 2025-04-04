import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const IndustryPage = () => {
    useEffect(() => {
        const chartDom = document.getElementById('disk-chart');
        let myChart = echarts.getInstanceByDom(chartDom);
        
        if (myChart) {
            myChart.dispose();
        }
        
        myChart = echarts.init(chartDom);
        myChart.showLoading();

        fetch('https://jobicy.com/api/v2/remote-jobs?count=50')
            .then(response => response.json())
            .then(data => {
                myChart.hideLoading();

                if (!data.jobs || data.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                const industryCounts = {};
                let totalJobs = 0; 

                data.jobs.forEach(job => {
                    const industry = job.jobIndustry || 'Other';
                    const jobTitle = job.jobTitle || 'Unnamed Job';

                    if (!industryCounts[industry]) {
                        industryCounts[industry] = [];
                    }
                    industryCounts[industry].push({ name: jobTitle, value: 1 }); // Each job contributes a value of 1
                    totalJobs++; 
                });

                const chartData = Object.entries(industryCounts).map(([industry, jobs]) => ({
                    name: industry,
                    children: jobs
                }));

                const option = {
                    tooltip: {
                        formatter: function (info) {
                            const jobName = info.name;
                            const jobCount = info.value;
                            const percentage = ((jobCount / totalJobs) * 100).toFixed(2); // Calculate percentage
                            return `${jobName}<br/>Count: ${jobCount}<br/>Percentage: ${percentage}%`;
                        }
                    },
                    series: {
                        type: 'sunburst',
                        data: chartData,
                        radius: [0, '90%'],
                        label: {
                            rotate: 'radial'
                        }
                    }
                };

                myChart.setOption(option);
            })
            .catch(error => {
                console.error("Error fetching job data:", error);
                myChart.hideLoading();
            });

        return () => {
            myChart.dispose();
        };
    }, []); 

    return (
        <div className="ind m-1 mb-2 border border-1 rounded-3" style={{ height: '400px' }}>
            <div id="disk-chart" style={{ height: '100%' }}></div>
        </div>
    );
};

export default IndustryPage;
