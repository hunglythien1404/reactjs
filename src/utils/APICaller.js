import axios from 'axios';
import * as type from '../const/constant';

//get comment by call API
export default function callAPI(videoID) {
  return axios(
    {
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/commentThreads?key=" + type.API_KEY + "&textFormat=plainText&part=snippet&videoId=" +
        videoID + "&maxResults=10"
    }
  ).catch(err => {
    console.log(err);
  });
}