import React, { Component } from "react";

class ChannelBrowser extends Component {
  state = { searchInput: "" };

  /* Function that handles a change in the search channel input field */
  handleSearchChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  /* Function searches for the channel that user is looking for */
  searchChannel = (e) => {
    if (e.key === "Enter") {
      //do something
      this.props.searchChannel(this.state.searchInput);
      this.setState({ searchInput: "" });
    }
  };

  /* Render functions */

  renderResults() {
    return this.props.currentUser.channels.map((channel, index) => {
      return (
        <div
          key={channel._id}
          className={`channel-result ${
            index === this.props.currentUser.channels.length - 1
              ? "last-channel"
              : ""
          }`}
        >
          <p>
            <span className="channel-result-name"># {channel.name}</span> · 
            <span className="channel-result-members">
              {channel.members.length} members
            </span>
          </p>
          {channel.members.indexOf(this.props.currentUser._id) >= 0 ? (
            <button disabled class="joined-btn">
              Joined
            </button>
          ) : (
            <></>
          )}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="mainChatSection">
        <div className="mainChatHeader channel-browser-header">
          <p>Browse Channels</p>
          <button className="create-channel">Create Channel</button>
        </div>
        <div className="mainChat">
          <div className="searchChannelContainer">
            <input
              className="form-control searchChannelInput"
              placeholder="Search for a channel by name..."
              value={this.state.searchInput}
              onChange={(e) => this.handleSearchChange(e)}
              onKeyPress={(e) => this.searchChannel(e)}
            />
          </div>
          <div className="searchChannelResults">
            <div className="channelResultsLabel">
              <p>{this.props.channelResults.length} channels</p>
            </div>
            <div className="channelResultsContainer">
              {this.renderResults()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelBrowser;
