import React from 'react';
import './Topbar.css'

const Topbar = () => {
  return (
    <>
      <div className="topbar fixed-top text-center p-3 me-2 border border-1 rounded">
        <div className="title-container rounded-3 p-1 mt-1 bg-light">
          <img src="/favic.ico" alt="RemoteTrends Logo" className='mt-1' style={{ width: '40px', height: '40px', marginRight: '5px', marginBottom: '5px' }} />
          <span className="title-remote" style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Remote</span>
          <div className="title-trends rounded-4 py-2 px-3 m-1">
            <span style={{ fontSize: '1.4em', fontWeight: 'bold' }}>Trends</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
