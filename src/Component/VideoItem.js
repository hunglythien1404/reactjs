import React from 'react';
import Youtube from 'react-youtube';

class VideoItem extends React.Component {
  setOpts = () => {
    return {
      width: 250,
      height: 150,
    };
  };

  render() {
    return (
      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        <div className="card">
          <Youtube videoId={this.props.video.id.videoId} opts={this.setOpts()}
                   onPlay={() => this.props.handlePlay(this.props.video.id.videoId)}/>
          <div className="card-body">
            <h5 className="card-title"
                onClick={() => this.props.handlePlay(this.props.video.id.videoId)}>
              {this.props.video.snippet.title}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoItem;