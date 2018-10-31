import React from 'react';
import Youtube from 'react-youtube';

class VideoPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComment: false,
      comment: "",
      comments: [],
    };
  }

  //get 10 comments from youtube
  componentWillMount() {
    let arr = [];
    this.props.comment.forEach((comment) => arr.push(comment.snippet.topLevelComment.snippet.textDisplay));
    this.setState({
      comments: arr,
    });
  }

  //show comment box when play video
  handlePlay = () => {
    this.setState({
      isComment: true,
    });
  };

  //hide comment box when pause video
  handlePause = () => {
    this.setState({
      isComment: false,
    });
  };


  //save value of comment box every time user type
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };


  //save and push user comment
  handleClick = () => {
    let arr = this.state.comments.slice();
    arr.unshift(this.state.comment);
    this.setState({
      comment: "",
      comments: arr,
    });
  };

  render() {
    return (
      <div className="videoPlay ml-5">
        {this.props.video ?
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card">
              <Youtube videoId={this.props.video.id.videoId} className="youtube"
                       onPlay={this.handlePlay} onPause={this.handlePause}/>
              <div className="card-body">
                <h5 className="card-title">{this.props.video.snippet.title}</h5>
                <p className="alert-primary col-3">Comments</p>
                {/*{check and show comment box}*/}
                {this.state.isComment ?
                  <div>
                    <textarea placeholder="Your comment here" className="comment" name="comment"
                              value={this.state.comment} onChange={this.handleChange}/>
                    <button className="btn btn-success mt-1" onClick={this.handleClick}>Comment</button>
                  </div> : ""}
                {/*{show 10 comments}*/}
                {this.state.comments.map((comment, index) => {
                  return <p key={index}
                            className="commentbox">
                    {comment}</p>
                })}
              </div>
            </div>
          </div> : ""}
      </div>
    );
  }
}

export default VideoPlay;