import React from 'react'

export default function relatedVideo(props) {
  let { title, channel, image } = props.video;
  return (
    <div className='videoCard'>
      <img src={image} className='videoCard__img' />
      <div className='videoCard__text'>
        <h2 className='videoCard__title'>{title}</h2>
        <h4 className='videoCard__channel'>{channel}</h4>
      </div>
    </div>
  )
}

//TODO add ellipses using JS?
// /**
//  * @param  text          string       - text to shorten
//  * @param  maxTextLength int          - desired max length of shorten string
//  * @return ret           string       - new shortened string
//  */
// function shorten(text, maxTextLength) {
//   var ret = text;
//   if (ret.length > maxTextLength) {
//     ret = ret.substr(0, maxTextLength - 3) + "...";
//   }
//   return ret;
// }