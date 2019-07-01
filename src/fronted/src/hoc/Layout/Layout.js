import React, {Fragment} from 'react';

import Navigation from '../../components/Navigation/Navigation';

const layout = (props) => (
  <Fragment>
    <Navigation />
    <main>
      <div className="container">
        {props.children}
      </div>
    </main>
  </Fragment>
);

export default layout;