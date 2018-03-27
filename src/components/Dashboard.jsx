// ===================={ Imports }==================== //

import React, { Component } from 'react';
import MessageList from './MessageList';

// =================== { Component Setup } =========== //

class Dashboard extends Component{
  constructor(props){
    super(props);

    this.state ={
      message: '',
      data: [],
      class: "blue"
    }

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event){
    event.preventDefault();

    const inputMessage = this.refs.inputMessage;
		this.setState({message: inputMessage.value});
		
		if(!inputMessage.value.trim()) {
			return
		}
		
		var newMessage = {
			text: inputMessage.value,
			id: Date.now(),
			class: this.state.class
		}
		
		this.setState((prevState) =>({
			data: prevState.data.concat(newMessage),
			message: ''
		}));
		
		inputMessage.value = '';
  }

  render(){

    const { data } = this.state;

    return(
      <div className="chat-app">
				<MessageList data={ data } />
				<div className="message-form">
					<form onSubmit={this._handleSubmit}>
					  <input ref="inputMessage" type="text" placeholder="Type a message..."/>
						<button><i className="fa fa-microphone"></i></button>
					</form>
				</div>
			</div>
    );
  }
}

export default Dashboard;