// ===================={ Imports }==================== //

import React, { Component } from "react";
import MessageList from "./MessageList";

// =================== { Component Setup } =========== //

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      data: [],
      class: "blue",
      isListening: false
    };

    this._handleSpeechListening = this._handleSpeechListening.bind(this);
    this._handleSpeechResponse = this._handleSpeechResponse.bind(this);
	}
	
	/**
	 * Method to start listening user's voice command and append the previous 
	 * message states
	 */
  _handleSpeechResponse() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent =
      window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    const sitesList = ["twitter", "reddit", "facebook", "youtube", "wikipedia"];
    const sitesURL = [
      "https://twitter.com",
      "https://reddit.com",
      "https://facebook.com",
      "https://youtube.com",
      "https://wikipedia.org"
    ];
    const self = this;

    recognition.onresult = function(event) {
      const speechResult = event.results[0][0].transcript;

      self.setState({ message: speechResult });

      const newMessage = {
        text: speechResult,
        id: Date.now(),
        class: self.state.class
      };

      self.setState(prevState => ({
        data: prevState.data.concat(newMessage),
        message: ""
      }));

      console.log("Confidence: " + event.results[0][0].confidence);

      if (speechResult.toLowerCase().indexOf("open") !== -1) {
        const siteIndex = sitesList.indexOf(
          speechResult.toLowerCase().slice(5)
        );
        if (siteIndex >= 0) {
          const win = window.open(sitesURL[siteIndex], "_blank");
          if (win) {
            //Browser has allowed it to be opened
            win.focus();
          } else {
            //Browser has blocked it
            alert("Please allow popups for this website");
          }
        }
      }
    };

    recognition.onspeechend = function() {
      recognition.stop();
      self.setState({
        isListening: false
      });
    };

    recognition.onerror = function(event) {
      self.setState({
        isListening: false,
        message: "Error occurred in recognition: " + event.error
      });

      const newMessage = {
        text: "Error occurred in recognition: " + event.error,
        id: Date.now(),
        class: self.state.class
      };

      self.setState(prevState => ({
        data: prevState.data.concat(newMessage),
        message: ""
      }));
    };
  }


	/**
	 * Method over the form submission to start the button listening to the user's
	 * speech, sets the status of islistening to be true
	 * @param {*} event 
	 */
  _handleSpeechListening(event) {
    event.preventDefault();

    this.setState({
      isListening: true
    });

    this._handleSpeechResponse();
  }

  render() {
    const { data, isListening } = this.state;

    return (
      <div className="chat-app">
        <MessageList data={data} />
        <div className="message-form">
          <form onSubmit={this._handleSpeechListening}>
            <input
              ref="inputMessage"
              type="text"
              placeholder="Click on the button to start listening..."
              value={isListening ? "Listening..." : ""}
            />
            <button type="submit" >
              <i className="fa fa-microphone" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;
