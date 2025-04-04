import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import $ from 'jquery'; // Ensure jQuery is available

const IndustryPage = () => {
    useEffect(() => {
        const chartDom = document.getElementById('disk-chart');
        let myChart = echarts.getInstanceByDom(chartDom);
        
        if (myChart) {
            myChart.dispose();
        }
        
        myChart = echarts.init(chartDom);
        myChart.showLoading();

        // Fetch the disk data
        $.get(ROOT_PATH + '/data/asset/data/disk.tree.json', function (diskData) {
            myChart.hideLoading();
            const formatUtil = echarts.format;

            function getLevelOption() {
                return [
                    {
                        itemStyle: {
                            borderWidth: 0,
                            gapWidth: 5
                        }
                    },
                    {
                        itemStyle: {
                            gapWidth: 1
                        }
                    },
                    {
                        colorSaturation: [0.35, 0.5],
                        itemStyle: {
                            gapWidth: 1,
                            borderColorSaturation: 0.6
                        }
                    }
                ];
            }

            myChart.setOption({
                title: {
                    text: 'Disk Usage',
                    left: 'center'
                },
                tooltip: {
                    formatter: function (info) {
                        var value = info.value;
                        var treePathInfo = info.treePathInfo;
                        var treePath = [];
                        for (var i = 1; i < treePathInfo.length; i++) {
                            treePath.push(treePathInfo[i].name);
                        }
                        return [
                            '<div class="tooltip-title">' +
                                formatUtil.encodeHTML(treePath.join('/')) +
                                '</div>',
                            'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
                        ].join('');
                    }
                },
                series: [
                    {
                        name: 'Disk Usage',
                        type: 'treemap',
                        visibleMin: 300,
                        label: {
                            show: true,
                            formatter: '{b}'
                        },
                        itemStyle: {
                            borderColor: '#fff'
                        },
                        levels: getLevelOption(),
                        data: diskData
                    }
                ]
            });
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
