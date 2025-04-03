import React from 'react';
import './Topbar.css'

const Topbar = () => {
  return (
    <>
      <div className="topbar fixed-top text-center p-3 me-2 border border-1 rounded-bottom">
        <div className="title-container rounded-3 bg-light">
          <img src="/inc.ico" alt="RemoteTrends Logo" className='mt-3 ms-2' style={{ width: '30px', height: '30px' }} />
          <span className="title-remote mt-1 fs-4 fw-bold">Remote</span>
          <div className="title-trends rounded-4 py-2 px-3 m-1">
            <span style={{ fontSize: '1.4em', fontWeight: 'bold' }}>Trends</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
