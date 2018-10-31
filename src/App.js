import React from 'react';
import searchVideo from 'youtube-api-search';
import * as type from './const/constant';
import VideoPlay from './Component/VideoPlay';
import VideoList from './Component/VideoList';
import LoginForm from './Component/LoginForm';
import './App.css';
import callAPI from './utils/APICaller';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      videoPlay: null,
      videoRest: [],
      comment: [],
      isLogin: false
    };
  }


  //find 5 video with keyword "ReactJS" on Youtube and set state
  componentWillMount() {
    searchVideo(
      {
        key: type.API_KEY,
        term: "ReactJS",
      }, (videos) => {
        this.setState({
          videos: videos,
          videoPlay: videos[0],
          videoRest: videos.slice(1),
        }, () => {
          //get 10 comments from first video
          callAPI(this.state.videoPlay.id.videoId).then(res => {
            this.setState({
              comment: res.data.items,
            });
          })
        });
      }
    );


  }

  //reaplace the main video when click videos on the list
  handlePlay = (id) => {
    let arr = [];
    this.state.videos.forEach((video) => {
      if (video.id.videoId === id) {
        this.setState({
          videoPlay: video,
        });
      } else {
        arr.push(video);
      }
    });
    this.setState({
      videoRest: arr,
      isComment: false,
    }, () => {
      //get 10 comments from the chosen videos
      callAPI(this.state.videoPlay.id.videoId).then(res => {
        this.setState({
          comment: res.data.items
        });
      })
    });
  };


  checkLogin = (isLogin) => {
    this.setState({
      isLogin: isLogin
    });
  };

  render() {
    return (
      <div className="row">
        <LoginForm isLogin={this.checkLogin}/>
        {this.state.isLogin ?
          <div className="content">
            <VideoPlay video={this.state.videoPlay} comment={this.state.comment}/>
            <VideoList videos={this.state.videoRest} handlePlay={this.handlePlay}/>
          </div> : ""}
      </div>
    );
  }
}

export default App;