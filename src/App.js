/* eslint no-eval: 0 */
import React, {Component} from 'react';
import stopWatch from './stopWatch';
import keyData from './keyData/keyData.json';
import Numberpad from './component/Numberpad';
import eventWatch from './eventWatch';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formular: "0+0",
      result: 0,
      value: "0",
      inputClass: 'animated tada',
      input: null,
      time: 0,
      successful: 0,
      failed: 0,
      bestTime: 0,
      grow: 'grow'
    };
    this.onClick = this.onClick.bind(this);
    this.rebuildClick = this.rebuildClick.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.numberpadClick = this.numberpadClick.bind(this);

    new eventWatch(keyData, this.numberpadClick);

  }

  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  getChallenge() {
    var sign = ["+", "-", "*"];
    var a = this.getRandom(1, 13);
    var b = this.getRandom(1, 12);
    var c = this.getRandom(0, 2);
    var formular = "a s b";
    formular = formular.replace('a', a);
    formular = formular.replace("b", b);
    formular = formular.replace("s", sign[c]);
    var result = eval(formular);
    this.setState({formular: formular, result: result});
  }

  componentDidMount() {
    this.getChallenge();
    stopWatch.start();
  }

  onClick(e) {
    var t = stopWatch.print();

    if (parseInt(this.state.value, 10) === this.state.result) {
      this.getChallenge();
      this.setState({
        inputClass: 'animated tada',
        successful: this.state.successful + 1
      });
      if (t < this.state.bestTime || this.state.bestTime === 0)
        this.setState({bestTime: t});

      stopWatch.stop();
    } else {
      this.setState({
        inputClass: 'animated shake',
        failed: this.state.failed + 1
      });
    }
    if (this.state.input != null)
      this.state.input.focus();
    stopWatch.start();
  }

  rebuildClick(e) {
    stopWatch.stop();
    this.setState({
      failed: this.state.failed + 1
    });
    this.getChallenge();
    if (this.state.input != null)
      this.state.input.focus();
    stopWatch.start();
  }

  numberpadClick(sign) {
    var s = "0";
    switch (sign.value) {
      case "OK":
        this.onClick();
        break;
      case "SKIP":
        this.rebuildClick();
        break;
      case "CL":
        s = "0";
        break;
      default:
        if (this.state.value === "0") {
          s = String(sign.value);
        } else {
          s = String(this.state.value) + String(sign.value);
        }
        break;
    }
    this.setState({value: s});
  }

  render() {

    return (
      <div>
        <div className=" scape row ">
          <div className="col-xs-6 header bg">
            &nbsp;
          </div>
          <div className="col-xs-6 formular bg">
            {this.state.formular}
          </div>
          <div className="col-xs-6 result bg">
            <div className={this.state.inputClass}>{this.state.value}</div>
          </div>
          <div className=" col-xs-3 time bg">
            Time: {this.state.time}
          </div>
          <div className=" col-xs-3 time bg">
            Best: {this.state.bestTime}
          </div>
          <div className=" col-xs-3 time bg">
            Successful: {this.state.successful}
          </div>
          <div className=" col-xs-3 time bg">
            Failed: {this.state.failed}
          </div>
        </div>
        <Numberpad keyData={keyData} onClickHandler={this.numberpadClick}/>
      </div>
    );
  }
}

export default App;
