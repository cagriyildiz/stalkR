import React, {useEffect} from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import StalkListTab from './components/Navigation/StalkListTab/StalkListTab';
import StalkList from "./containers/StalkList/StalkList";

function App() {

  useEffect(() => {
    window.M.AutoInit();
  });

  return (
    <div className="App">
      <Layout>
        <StalkListTab />
        <StalkList id="instagram-stalk-list" active />
        <StalkList id="twitter-stalk-list" />
      </Layout>
    </div>
  );
}

export default App;
