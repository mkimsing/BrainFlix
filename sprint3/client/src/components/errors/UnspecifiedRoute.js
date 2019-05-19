import React from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../../assets/Images/sleeping_cat.jpg'
export default function UnspecifiedRoute() {
  console.log("ERROR! Tried to navigate to an unspecified Route")
  return (
    <>
      <section className='errorBG'>
        <div className='errorImgContainer'>
          <div className='errorDiv' style={{ backgroundImage: `url(${bgImage})` }} >
            <h1 className='genericTitle'> Something went wrong... </h1>
            <h1 className='errorTitle'> Hmmm... It does not seem like there is a page with that name</h1>
          </div >
        </div>
      </section>
      <div className='msgBottom'>
        <h3 className='errorCTA'> Please double check the URL and try again</h3>
        <Link to='/'><button> Back to Home </button> </Link>
      </div>
    </>
  )
}
