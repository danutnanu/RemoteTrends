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

        // Use the same API endpoint as in NumberPage
        fetch('https://jobicy.com/api/v2/remote-jobs?count=50')
            .then(response => response.json())
            .then(data => {
                myChart.hideLoading();

                if (!data.jobs || data.jobs.length === 0) {
                    console.error("No job data available");
                    return;
                }

                // Process data for the chart
                const industryCounts = {};
                data.jobs.forEach(job => {
                    const industry = job.jobIndustry || 'Other';
                    industryCounts[industry] = (industryCounts[industry] || 0) + 1;
                });

                const processedData = Object.entries(industryCounts).map(([name, value]) => ({
                    name,
                    value
                }));

                myChart.setOption({
                    title: {
                        text: 'Jobs by Industry',
                        left: 'center'
                    },
                    tooltip: {
                        formatter: function (info) {
                            return `${info.name}: ${info.value} jobs`;
                        }
                    },
                    series: [
                        {
                            name: 'Jobs by Industry',
                            type: 'treemap',
                            data: processedData,
                            label: {
                                show: true,
                                formatter: '{b}'
                            },
                            itemStyle: {
                                borderColor: '#fff'
                            }
                        }
                    ]
                });
            })
            .catch(error => {
                console.error("Error fetching job data:", error);
                myChart.hideLoading();
            });

        return () => {
            myChart.dispose();
        };
    }, []); // Empty dependency array to run once on mount

    return (
        <div className="ind m-1 mb-2 border border-1 rounded-3">
            <div id="disk-chart" style={{ height: '400px' }}></div>
        </div>
    );
};

export default IndustryPage;
