import React from 'react';
import PropTypes from 'prop-types';

class InfoBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: ''
    };
  }

  moveRight() {
    this.box.className = 'box moved';
  }

  moveLeft() {
    this.box.className = 'box';
  }

  handleClick() {
    const {inputName, content} = this.props.data;
    const value = this.state.value;
    if (value !== content) {
      this.props.data.changeUserInfo(inputName, value);
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  componentDidUpdate(preProps) {
    const preContent = preProps.data.content;
    const preFetching = preProps.data.isFetching;
    const {content, isFetching} = this.props.data;
    if (preFetching === true &&
      isFetching === false &&
      content !== preContent
    ) {
      this.box.className = 'box';
    }
  }

  render() {
    const {content, placeholder, word, canChange} = this.props.data;
    const word_arr = word.split('');
    let word_html;
    let button_right, button_left;
    if (word_arr.length === 1) {
      word_html = <span>{word.slice(0, 1)}<span className="hidden">空空空</span></span>;
    } else if (word_arr.length === 2) {
      word_html = <span>{word.slice(0, 1)}<span className="hidden">空空</span>{word.slice(1)}</span>;
    } else if (word_arr.length === 3) {
      word_html = <span>{word.slice(0, 1)}<span className="hidden">空</span>{word.slice(1)}</span>;
    } else if (word_arr.length === 4) {
      word_html = <span>{word.slice(0, 1)}<span className="hidden"/>{word.slice(1)}</span>;
    }
    if (canChange) {
      button_right = <span className="btn fa fa-angle-right" onClick={this.moveRight.bind(this)}/>;
      if (this.state.value !== '') {
        button_left = <span className="btn" onClick={this.handleClick.bind(this)}>确定</span>;
      } else {
        button_left = <span className="btn fa fa-angle-left" onClick={this.moveLeft.bind(this)}/>;
      }
    } else {
      button_right = <span className="none"/>;
      button_left = <span className="none"/>;
    }
    return (
      <div className="info-box">
        <div className="box" ref={box => {
          this.box = box;
        }}>
          <p className="show">{word_html}<span className="single-word">:</span>{content}{button_right}</p>
          <p className="input">
            <input
              type="text"
              placeholder={placeholder}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />{button_left}
          </p>
        </div>
      </div>
    );
  }
}

InfoBox.propTypes = {
  data: PropTypes.objectOf({
    inputName: PropTypes.string,
    word: PropTypes.string,
    content: PropTypes.string,
    placeholder: PropTypes.string,
    canChange: PropTypes.bool,
    changeUserInfo: PropTypes.func
  }).required
};

export default InfoBox;
