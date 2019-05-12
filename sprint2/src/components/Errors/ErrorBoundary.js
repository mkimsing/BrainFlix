import React from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../../assets/Images/corgi_sleeping.jpg'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  render() {
    if (this.state.errorInfo) {
      return (
        <>
          <section className='errorBG'>
            <div className='errorImgContainer'>
              <div className='errorDiv' style={{ backgroundImage: `url(${bgImage})` }} >
                <h1 className='genericTitle'> Something went wrong... </h1>
                <h1 className='errorTitle'> {` Uh Oh! ${this.state.error}`}</h1>
              </div >
            </div>
          </section>
          <div className='msgBottom'>
            <h3 className='errorCTA'> Try reloading the page or wait a few minutes then try again</h3>
            <Link to='/' onClick={this.props.unsetError}><button> Back to Home </button> </Link>
          </div>
        </>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary