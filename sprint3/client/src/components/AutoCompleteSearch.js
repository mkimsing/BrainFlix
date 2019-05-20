import React, { Component } from 'react'
import apiInfo from "../utils/apiInfo";
import AxiosError from "./errors/AxiosError";
import axios from "axios";

import AsyncSelect from 'react-select/lib/Async'
export default class AutoCompleteSearch extends Component {
  state = {
    allVideos: [],
    error: {
      caught: false,
      response: ""
    }
  };

  filterVideos = (videos, query) => {
    return videos.filter(video => {
      return video.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  createOptions = (inputValue) => {
    new Promise((resolve, reject) => {
      axios
        .get(apiInfo.API_URL + "/videos" + apiInfo.API_KEY)
        .then(response => {
          let options = this.filterVideos(response.data, inputValue).map(video => {
            return { label: video.title, value: video.id }
          });
          resolve(options)
        })
        .catch(error => {
          reject(error)
          console.log(error);
          this.setState({
            error: {
              caught: true,
              response: error.response
            }
          });
        });
    })
  }

  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { label: "Apple", value: 1 },
          { label: "Facebook", value: 2 },
          { label: "Netflix", value: 3 },
          { label: "Tesla", value: 4 },
          { label: "Amazon", value: 5 },
          { label: "Alphabet", value: 6 },
        ]);
      }, 1000);
    });

  render() {
    console.log(this.promiseOptions())
    if (this.state.error.caught) {
      return (
        <AxiosError
          error={this.state.error.response}
          unsetError={this.unsetError}
        />
      );
    }
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={this.createOptions} />
    )
  }
}
