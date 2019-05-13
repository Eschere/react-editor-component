import React from 'react';
import OwnServer from './OwnServer';
import QiniuServer from './QiniuServer';
import Test from './Test';

export default class extends React.Component {
  state = {
    value: ''
  }

  input = () => {
    this.setState({
      value: Math.random()
    });

    console.log(this.state.value);

    setTimeout(() => {
      this.setState({
        value: Math.random()
      });
      console.log(this.state.value);
    }, 5000);
  }

  render () {
    return (
      <div>
        <input type="text" onInput={this.input} />
        <Test test={this.state.value}></Test>
        <OwnServer></OwnServer>
        <hr />
        <hr />
        <QiniuServer></QiniuServer>
      </div>
    );
  }
}
