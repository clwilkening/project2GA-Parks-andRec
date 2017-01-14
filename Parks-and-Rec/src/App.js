import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      songs: {}
    };

    this.getSongs = this.getSongs.bind(this);
    this.handleNewSongInput = this.handleNewSongInput.bind(this);
    this.createSongTitle = this.createSongTitle.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
    this.deleteSong = this.deleteSong.bind(this);

  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs() {
    console.log(this.state)
    axios({
      url: '/songs.json',
      baseURL: 'https://parks-and-rec-82533.firebaseio.com/',
      method: "GET",
    }).then((response) => {
      //console.log(this.state.songs)
      //console.log(response)
      this.setState({
        songs: response.data
      });
     // this.renderSongs(); <-- didn't need it.
    }).catch((error) =>{
      console.log(error);
    });
  }

  createSongTitle(titleText) {
    let newTitle = { title: titleText, box: false }

    axios({
      url: '/songs.json',
      baseURL: 'https://parks-and-rec-82533.firebaseio.com/',
      method: "POST",
      data: newTitle
    }).then((response) => {
      console.log(response)
      let songs = {...this.state.songs};
      console.log(songs);
      let songTitleId = response.data.name
      songs[songTitleId] = newTitle;
      this.setState({ songs, });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleNewSongInput(e){
    if (e.charCode ===13) {
      this.createSongTitle(e.target.value);
      e.target.value="";
    }
  }

  renderSongs() {
    let songElements = [];

    for(let key in this.state.songs) {
      let song = this.state.songs[key]

      songElements.push(
        <div>
        <h4 key={key}>{song.title}</h4>
        <button>Edit Name</button>
        <button>Edit Song</button>
        <p>&#x1F5D1;</p>
        </div>
      );
    };
    return(
      <div>
        {songElements}
      </div>
    );
    // const songs = this.state.songs;
    // let songList = Object.keys(songs).reverse()
    //   .map((key) => <h4 key={key}>{songs[key].title}</h4>)
    // return songList;
    // console.log(songList)
    //I tried the above way and could not return more than one element. Tried with braces and wrapping in div.
  }

  deleteSong() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Parks and Rec.</h2>
        </div>
      <input
        className="title-input"
        placeholder="Name your song!"
        onKeyPress={this.handleNewSongInput}
      />
      {this.renderSongs()}
      </div>
    );
  }
}

export default App;


