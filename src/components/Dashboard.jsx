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
    this.parseSpeech = this.parseSpeech.bind(this);
    this.searchTerm = this.searchTerm.bind(this);
    this.openSite = this.openSite.bind(this);
    this.greeting = this.greeting.bind(this);
  }

  /**
   * Method to update is the request is a greeting
   * @param {*} speech
   */
  greeting(speech) {
    this.setState({ message: "Hello! What can I do for you ?" });

      const newMessage = {
        text: "Hello! What can I do for you ?",
        id: Date.now(),
        class: this.state.class
      };

      this.setState(prevState => ({
        data: prevState.data.concat(newMessage),
        message: ""
      }));
  }

  /**
   * Allow google search for the recognised term if that is the question
   * @param {*} speech
   */
  searchTerm(speech) {
    var win = window.open(
      "https://www.google.co.in/search?q=" + speech,
      "_blank"
    );
    if (win) {
      //Browser has allowed it to be opened
      win.focus();
    } else {
      //Browser has blocked it
      alert("Please allow popups for this website");
    }
  }

  /**
   * Method to open sites if the speech said so
   * @param {*} speech
   */
  openSite(speech) {
    var words = speech.split(" ");
    for (var i = 0; i < words.length; i++) {
      if (words[i].indexOf(".") !== -1) {
        var win = window.open("https://" + words[i], "_blank");
        if (win) {
          //Browser has allowed it to be opened
          win.focus();
        } else {
          //Browser has blocked it
          alert("Please allow popups for this website");
        }
        return;
      }
    }
    this.searchTerm(speech);
  }

  /**
   * Checks what the speech exactly means
   * @param {*} speech
   */
  parseSpeech(speech) {
    // Check if speech is a question
    var questionKeywords = [
      "who",
      "what",
      "when",
      "where",
      "why",
      "how",
      "is",
      "can",
      "does",
      "do",
      "search",
      "find",
      "look"
    ];
    for (var i = 0; i < questionKeywords.length; i++) {
      if (speech.indexOf(questionKeywords[i]) !== -1) {
        this.searchTerm(speech);
        return;
      }
    }
    // Check if speech is a command to open website
    var openKeywords = ["open", "navigate", "browse", "take"];
    for (var j = 0; j < openKeywords.length; j++) {
      if (speech.indexOf(openKeywords[j]) !== -1) {
        this.openSite(speech);
        return;
      }
    }
    // Star Wars Easter Egg
    if (speech === "hello there") {
      this.setState({ message: "General Kenobi, You are a bold one!" });

      const newMessage = {
        text: "General Kenobi, You are a bold one!",
        id: Date.now(),
        class: this.state.class
      };
      this.setState(prevState => ({
        data: prevState.data.concat(newMessage),
        message: ""
      }));
      return;
    }

    // Check if speech is a greeting
    var greetKeywords = ["hi", "hello", "hey"];
    for (var k = 0; k < greetKeywords.length; k++) {
      if (speech.indexOf(greetKeywords[k]) !== -1) {
        this.greeting(speech);
        return;
      }
    }
    // If none of the above conditions are met
    this.setState({ message: "Sorry, I can not understand that, yet." });

      const newMessage = {
        text: "Sorry, I can not understand that, yet.",
        id: Date.now(),
        class: this.state.class
      };

      this.setState(prevState => ({
        data: prevState.data.concat(newMessage),
        message: ""
      }));
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
      self.parseSpeech(speechResult.toLowerCase());
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
            <button type="submit">
              <i className="fa fa-microphone" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;
