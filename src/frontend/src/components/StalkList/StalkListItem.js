import React from 'react';

const stalkListItem = (props) => (
  <li className="collection-item avatar">
    <img src={props.img} alt="" className="circle"/>
    <span className="title  ">{props.name}</span>
    <p>{props.username}<br/>
      {props.accountPrivacy}
    </p>
    <a href="#" className="secondary-content"><i className="material-icons">grade</i></a>
  </li>
);

export default stalkListItem;