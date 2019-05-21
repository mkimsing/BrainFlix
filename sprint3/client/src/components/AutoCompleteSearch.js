import React, { Component } from "react";
import apiInfo from "../utils/apiInfo";
import AxiosError from "./errors/AxiosError";
import axios from "axios";
import { withRouter } from "react-router-dom";
import AsyncSelect from "react-select/lib/Async";
class AutoCompleteSearch extends Component {
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
  };

  createOptions = inputValue => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiInfo.API_URL + "/videos" + apiInfo.API_KEY)
        .then(response => {
          let options = this.filterVideos(response.data, inputValue).map(
            video => {
              return { label: video.title, value: video.id };
            }
          );
          resolve(options);
        })
        .catch(error => {
          reject(error);
          console.log(error);
          this.setState({
            error: {
              caught: true,
              response: error.response
            }
          });
        });
    });
  };

  handleSelectChange = selectedOption => {
    if (selectedOption) {
      let location = {
        pathname: `/videos/${selectedOption.value}`
      };
      this.props.history.push(location);
    }
  };

  render() {
    if (this.state.error.caught) {
      return (
        <AxiosError
          error={this.state.error.response}
          unsetError={this.unsetError}
        />
      );
    }
    return (
      <AsyncSelect
        cacheOptions
        // defaultOptions
        noOptionsMessage={() => { return `Enter a value to search` }}
        isClearable
        loadOptions={this.createOptions}
        onChange={this.handleSelectChange}
        placeholder={`Search`}
        className={`searchForm__input`}
        classNamePrefix={`searchForm__input`}
      />
    );
  }
}

export default withRouter(AutoCompleteSearch);
