import React from 'react';

export class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>
          <span style = {{float: 'left'}}>© 2016 Bubblesortme. All Rights Reserved. </span>
          <span style = {{float: 'right'}}>D3 Data Visualisation by Mike Bostock</span>
        </p>
      </footer>
    );
  }
}

export default Footer;
