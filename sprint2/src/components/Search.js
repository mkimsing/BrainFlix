import React, { Component } from 'react'
import apiInfo from "../utils/apiInfo";
import AxiosError from "../components/Errors/AxiosError";
import axios from "axios";
import RelatedVideo from './RelatedVideo'
import { Link } from 'react-router-dom'
export default class Search extends Component {
  state = {
    allVideos: [],
    filteredVideos: [],
    error: {
      caught: false,
      response: ''
    }
  };

  requestVideos = () => {
    let query = new URLSearchParams(this.props.location.search).get('filter')
    if (!this.props.location.search || query.trim() === '') {
      return
    }

    axios.get(apiInfo.API_URL + "/videos" + apiInfo.API_KEY)
      .then(response => {
        let filteredVideos = response.data.filter(video => {
          return video.title.toLowerCase().includes(query.toLowerCase())
        })
        this.setState({
          allVideos: response.data,
          filteredVideos: filteredVideos
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: {
            caught: true,
            response: error.response
          }
        })
      })
  }

  componentDidMount() {
    this.requestVideos()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.error.caught !== prevState.error.caught) {
      this.setState({
        error: {
          caught: false,
          response: ''
        }
      })
    }
    else if (prevProps.location.search !== this.props.location.search) {
      this.requestVideos();
    }
  }

  unsetError = () => {
    this.setState({
      error: {
        caught: false,
        response: ''
      }
    })
  }

  render() {
    let query = new URLSearchParams(this.props.location.search).get('filter')
    //Error
    if (this.state.error.caught) {
      return <AxiosError error={this.state.error.response} unsetError={this.unsetError} />
    }
    // Empty query
    if (!this.props.location.search || query.trim() === '') {
      return (
        <div className='searchResults'>
          <h1> Search Page </h1>
          <h4> Please enter a query to search</h4>
        </div>
      )
    }
    // No results found
    if (this.state.filteredVideos.length === 0) {
      return (
        <div className='searchResults'>
          <h1> No results found for: {query} </h1>
          <h4> Please try searching for something more general</h4>
        </div>
      )
    }

    //Found results for that query
    return (
      <div className='searchResults'>
        <h1> Search Results for: {query}</h1>
        {this.state.filteredVideos.map(video => {
          return (
            <Link to={`/videos/${video.id}`}>
              <RelatedVideo video={video} />
            </Link>
          );
        })}
      </div>
    )
  }
}
