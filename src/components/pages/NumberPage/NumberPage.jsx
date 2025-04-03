import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import './NumberPage.css'

const NumberPage = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 992);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                const processedData = Object.entries(industryCounts).map(([name, value]) => ({
                    name,
                    value
                }));

                setChartData(processedData);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData.length === 0) return;

        const chartDom = document.getElementById('industry-chart');
        let myChart = echarts.getInstanceByDom(chartDom);
        
        if (myChart) {
            myChart.dispose();
        }
        
        myChart = echarts.init(chartDom);
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} jobs ({d}%)'
            },
            legend: isLargeScreen ? {
                top: '5%',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            } : {
                show: false
            },
            series: [
                {
                    name: 'Jobs by Industry',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', isLargeScreen ? '70%' : '50%'],
                    startAngle: 180,
                    endAngle: 360,
                    data: chartData,
                    label: {
                        color: '#fff',
                        show: true,
                        position: 'outside',
                        formatter: isLargeScreen ? '{b}: {c}' : '{b}'
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

        const handleChartResize = () => {
            myChart.resize();
        };

        window.addEventListener('resize', handleChartResize);

        return () => {
            window.removeEventListener('resize', handleChartResize);
            myChart.dispose();
        };
    }, [chartData, isLargeScreen]);

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
