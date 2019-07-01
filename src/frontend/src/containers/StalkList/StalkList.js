import React from 'react';

import StalkListItem from '../../components/StalkList/StalkListItem';

const stalkList = (props) => {
  const display = props.active ? "block" : "none";
  return (
    <ul id={props.id} className="collection" style={{marginTop: 0, display: display}}>
      <StalkListItem/>
    </ul>
  );
};

export default stalkList;