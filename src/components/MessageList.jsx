// ===================={ Imports }==================== //

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Message from './Message';

// =================== { Component Setup } =========== //

class MessageList extends Component{

  constructor(props){
    super(props);

    this.state={
      time: (new Date()).toDateString()
    }
  }

  componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollTop = 10000;
	}

  render(){
    const { data } = this.props;
    const { time } = this.state;

    return(
      <div ref="messageContainer" className="message-container">
				<div className="time-float">{time}</div>
				{data.map((item) => (
					<Message message={item.text} key={item.id} timeStamp={item.id} className={item.class.concat(" user right")} />
				))}
			</div>
    );
  }
}

export default MessageList;