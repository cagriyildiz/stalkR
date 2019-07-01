import React, {useEffect} from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import StalkListTab from './components/Navigation/StalkListTab/StalkListTab';
import StalkList from "./containers/StalkList/StalkList";

function App() {

  useEffect(() => {
    window.M.AutoInit();
  });

  const instagramData = [
    {
      username: "cagriyild",
      name: "Çağrı Yıldız",
      img: "https://scontent-sof1-1.cdninstagram.com/vp/07c90a468df710f102c43637c370a36d/5DB3687E/t51.2885-19/s150x150/38815720_457046344812639_7572143873900675072_n.jpg?_nc_ht=scontent-sof1-1.cdninstagram.com",
      accountPrivacy: "Private"
    }
  ];

  return (
    <div className="App">
      <Layout>
        <StalkListTab />
        <StalkList id="instagram-stalk-list" stalkingPeopleList={instagramData} active />
        <StalkList id="twitter-stalk-list" stalkingPeopleList={instagramData} />
      </Layout>
    </div>
  );
}

export default App;
