import React from 'react';
// import * as echarts from 'echarts';

const Topbar = () => {
  return (
    <>
      <div className="fixed-top fixed-header text-center border border-info">
        <div className="title-container rounded-3 p-1 mt-1">
          <img src="/favic.ico" alt="RemoteTrends Logo" style={{ width: '40px', height: '40px', marginRight: '5px', marginBottom: '5px' }} />
          <span className="title-remote" style={{ fontSize: '1.6em', fontWeight: 'bold' }}>Remote</span>
          <div className="title-trends rounded-4 py-2 px-3 mx-1">
            <span style={{ fontSize: '1.8em', fontWeight: 'bold' }}>Trends</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
