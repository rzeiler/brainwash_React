/* eslint no-eval: 0 */
import React, {Component} from 'react';
import stopWatch from './stopWatch';

import './App.css';
import './css/animate.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formular: "0+0",
      result: 0,
      value: '',
      divClass: 'default bg',
      inputClass: 'animated tada',
      input: null,
      time: 0,
      successful: 0,
      failed: 0,
      bestTime: 0
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.rebuildClick = this.rebuildClick.bind(this);
    this.getRandom = this.getRandom.bind(this);
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

  onChange(e) {
    this.setState({value: e.target.value, inputClass: '', input: e.target});
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onClick(null);
    }
  }

  onClick(e) {
    var t = stopWatch.print();

    if (parseInt(this.state.value, 10) === this.state.result) {
      this.getChallenge();
      this.setState({
        divClass: 'default bg',
        inputClass: 'animated tada',
        value: '',
        successful: this.state.successful + 1
      });
      if (t < this.state.bestTime || this.state.bestTime === 0)
        this.setState({bestTime: t});

      stopWatch.stop();
    } else {
      this.setState({
        divClass: 'default bg error',
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

  render() {

    return (
      <div>
        <div className='scape'>
          <div className="header bg">Brainwash</div>
          <div className='formular bg'>{this.state.formular}</div>
          <div className='time bg'>Time: {this.state.time}&nbsp; Best: {this.state.bestTime}</div>
          <div className={this.state.divClass}>
            <input type='text' placeholder='0' className={this.state.inputClass} value={this.state.value} onChange={this.onChange} onKeyPress={this.onKeyPress} id='result'/>
          </div>
        </div>
        <button className={!this.state.value
          ? 'check disabled'
          : 'check'} disabled={!this.state.value} onClick={this.onClick}>Check</button>
        <button className='rebuild' onClick={this.rebuildClick}>New</button>
        <div className='status'>Successful: {this.state.successful}</div>
        <div className='status'>Failed: {this.state.failed}</div>
      </div>
    );
  }
}

export default App;
