import React from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../../assets/Images/sad_pitbull.jpg'
export default class AxiosError extends React.Component {

  render() {
    let { status, statusText, data } = this.props.error
    let JSX;
    switch (status) {
      case 404: {
        JSX = (
          <>
            <section className='errorBG'>
              <div className='errorImgContainer'>
                <div className='errorDiv' style={{ backgroundImage: `url(${bgImage})` }} >
                  <h1 className='genericTitle'> Something went wrong... </h1>
                  <h1 className='errorTitle'> {`Error ${status} ${statusText}: ${data.message}`}</h1>
                </div >
              </div>
            </section>
            <div className='msgBottom'>
              <h3 className='errorCTA'> Please double check the video you specified exists</h3>
              <Link to='/' onClick={this.props.unsetError}><button> Back to Home </button> </Link>
            </div>
          </>
        )
        break;
      }
      default: {
        JSX = (
          <>
            <section className='errorBG'>
              <div className='errorImgContainer'>
                <div className='errorDiv' style={{ backgroundImage: `url(${bgImage})` }} >
                  <h1 className='genericTitle'> Something went wrong... </h1>
                  <h1 className='errorTitle'> {`Error ${status} ${statusText}: ${data.message}`}</h1>
                </div >
              </div>
            </section>
            <div className='msgBottom'>
              <Link to='/' onClick={this.props.unsetError}><button> Back to Home </button> </Link>
            </div>
          </>
        )
      }
    }
    return (
      JSX
    )
  }
}
