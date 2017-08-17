/* eslint no-eval: 0 */
import React, {Component} from 'react';
import stopWatch from './stopWatch';
import keyData from './keyData/keyData.json';
import Numberpad from './component/Numberpad';
import Hello from './component/Hello';
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
      levelClass: 'animated pulse',
      imageClass: ' animated success ',
      input: null,
      time: 0,
      successful: 0,
      failed: 0,
      bestTime: 0,
      isBlur: true,
      level: 1,
      levelStep: 2
    };
    this.onClick = this.onClick.bind(this);
    this.rebuildClick = this.rebuildClick.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.numberpadClick = this.numberpadClick.bind(this);
    this.onStart = this.onStart.bind(this);
    new eventWatch(keyData, this.numberpadClick);
  }

  getRandom(min, max, level) {
    return Math.round(Math.random() * ((max * level) - min) + min);
  }

  getChallenge() {
    var sign = ["+", "-", "*"];
    var a = this.getRandom(1, 13, this.state.level);
    var b = this.getRandom(1, 12, this.state.level);
    var c = this.getRandom(0, 2, 1);
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

  onStart(e) {
    this.setState({isBlur: false});
  }

  checkLevel() {
    var level = this.state.level,
      step = this.state.levelStep;
    if (this.state.successful > (step * level)) {
      level = this.state.level + 1;
    }
    return level;
  }

  onClick(e) {
    var t = stopWatch.print();
    var oldLevel = this.state.level;

    if (parseInt(this.state.value, 10) === this.state.result) {
      this.getChallenge();
      var level = this.checkLevel();
      this.setState({
        inputClass: 'animated tada',
        levelClass: (oldLevel < level)
          ? 'animated pulse'
          : '',
        successful: this.state.successful + 1,
        level: level,
        imageClass: ' animated success '
      });
      if (t < this.state.bestTime || this.state.bestTime === 0)
        this.setState({bestTime: t});

      stopWatch.stop();
    } else {
      this.setState({
        inputClass: 'animated shake',
        failed: this.state.failed + 1,
        imageClass: ''
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
    this.setState({imageClass: ''});
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
      case "":

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

    const colClass = "col-sm-3 col-xs-6 animated";

    return (
      <Hello onStart={this.onStart}>
        <div className="row">
          <div className={"scape " + colClass + (this.state.isBlur
            ? " blurIn "
            : " blurOut ")}>
            <div className={"successful row " + this.state.imageClass}>
              <div className="col-xs-6">
                <div className="row bg">
                  <div className="col-xs-6 header">
                    &nbsp;
                  </div>
                  <div className="col-xs-6 formular">
                    {this.state.formular}
                  </div>
                  <div className="col-xs-6 result">
                    <div className={this.state.inputClass}>{this.state.value}</div>
                  </div>
                  <div className=" col-xs-3 time">
                    Time: {this.state.time}
                  </div>
                  <div className=" col-xs-3 time">
                    Best: {this.state.bestTime}
                  </div>
                  <div className=" col-xs-2 time">
                    Successful: {this.state.successful}
                  </div>
                  <div className=" col-xs-2 time">
                    Failed: {this.state.failed}
                  </div>
                  <div className={"col-xs-2 time " + this.state.levelClass}>
                    Level: {this.state.level}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={colClass + (this.state.isBlur
            ? " blurIn"
            : " blurOut")}>
            <Numberpad rowClassName="row" colClassName="col-xs-2" keyData={keyData} onClickHandler={this.numberpadClick}/>
          </div>
        </div>
      </Hello>
    );
  }
}

export default App;
