import React from 'react';

const stalkListTab = () => {
  return (
    <div className="row" style={{marginTop: "20px", marginBottom: 0}}>
      <div className="col s12" style={{padding: 0}}>
        <ul className="tabs tab-demo">
          <li className="tab col s3"><a className="active" href="#instagram-stalk-list">Instagram</a></li>
          <li className="tab col s3"><a href="#twitter-stalk-list">Twitter</a></li>
        </ul>
      </div>
    </div>
  );
};

export default stalkListTab;