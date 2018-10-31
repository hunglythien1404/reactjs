import React from 'react';
import VideoItem from './VideoItem';

class VideoList extends React.Component {
  render() {
    return (
      <div className="videoList">
        {this.props.videos.map((video, index) => <VideoItem key={index}
                                                            video={video}
                                                            handlePlay={(id) => this.props.handlePlay(id)}/>)}
      </div>
    );
  }
}

export default VideoList;