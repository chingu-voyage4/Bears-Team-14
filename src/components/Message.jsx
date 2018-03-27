// ===================={ Imports }==================== //

import React, { Component } from 'react';


// =================== { Component Setup } =========== //

class Message extends Component{
  render(){

    const { className, message } = this.props;
    return(
      <div className="message">
      <div ref="anim" className={className}>
        {message}
        <span>
        
        </span>
      </div>
    </div>
    );
  }
}

export default Message;