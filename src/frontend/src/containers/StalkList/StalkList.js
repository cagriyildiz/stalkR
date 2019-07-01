import React from 'react';

import StalkListItem from '../../components/StalkList/StalkListItem';

const stalkList = (props) => {
  const display = props.active ? "block" : "none";
  return (
    <ul id={props.id} className="collection" style={{marginTop: 0, display: display}}>
      {props.stalkingPeopleList.map(person => (
        <StalkListItem
          img={person.img} name={person.name} username={person.username}
          accountPrivacy={person.accountPrivacy}/>
      ))}
    </ul>
  );
};

export default stalkList;