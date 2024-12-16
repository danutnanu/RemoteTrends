import React from 'react';

const NumberPage = () => {
    return (
        <div className="main-content">
            <div className="header pe-5 p-3 fixed-top">
                <img src="/public/favic.ico" alt="RemoteTrends Logo" style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft: '30px' }} />
                <span style={{ color: '#fff', fontSize: '1.6em', fontWeight: 'bold' }}>RemoteTrends</span>
            </div>
            <div className="charts-container px-3">
                <div id="chart-container" className="pt-3 rounded" style={{ width: '100%', height: '400px' }}></div>
            </div>
        </div>
    );
};

export default NumberPage;