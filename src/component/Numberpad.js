import React, {Component} from 'react';

class Numberpad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numbers: this.props.keyData,
      rowClassName: this.props.rowClassName ? this.props.rowClassName : "row",
      colClassName: this.props.colClassName ? this.props.colClassName : "col-xs-2"
    };
  }

  onItemClick(key) {
    this.props.onClickHandler(key);
  }

  render() {
    const NumberItems = this.state.numbers.map((key, index) => <NumberItem colClassName={this.state.colClassName} onClickHandler={this.onItemClick.bind(this, key)} key={index} label={key.label} value={key.value}/>);
    return (
      <div className={this.state.rowClassName}>
        {NumberItems}
      </div>
    );
  }
}

class NumberItem extends Component {

  render() {
    return (
      <div className={this.props.colClassName} onClick={this.props.onClickHandler}>
        <div className='pad'>{this.props.label}</div>
      </div>
    );
  }
}

export default Numberpad;
