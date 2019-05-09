import React from 'react'

class RelatedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef(); //Ref to the related video card's title
    this.origTitle = this.props.video.title;
    this.state = {
      titleText: this.props.video.title
    }
  }

  // modifyText = () => {
  //   let charsPerLine = this.titleRef.current.offsetWidth / (14 / 1.8)
  //   let maxLength = (charsPerLine * 2) - 3;
  //   let newStr = this.updateText(this.origTitle, maxLength)
  //   this.setState({
  //     titleText: newStr
  //   })
  // }

  // componentDidMount() {
  //   //Wait for document to be ready (css applied) before checking widths
  //   let stateCheck = setInterval(() => {
  //     if (document.readyState === 'complete') {
  //       clearInterval(stateCheck);
  //       // Doc ready
  //       let charsPerLine = this.titleRef.current.offsetWidth / (14 / 1.8)
  //       let maxLength = (charsPerLine * 2) - 3;
  //       let newStr = this.updateText(this.origTitle, maxLength)
  //       this.setState({
  //         titleText: newStr
  //       })
  //     }
  //   }, 100);

  //   //Add event listener to update text/ellipsis on window resize
  //   window.addEventListener("resize", this.modifyText);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.modifyText)
  // }

  // /**
  //  * Update text if it is greater than maxTextLength to truncate and replace
  //  * ending with elipsis (...)
  //  */
  // updateText = (text, maxTextLength) => {
  //   let ret = text;
  //   if (ret.length > maxTextLength) {
  //     ret = ret.substr(0, maxTextLength - 3) + "...";
  //   }
  //   return ret;
  // }

  render() {
    let { channel, image } = this.props.video;
    return (
      <div className='videoCard'>
        <img src={image} className='videoCard__img' alt=" Related Video Thumbnail" />
        <div className='videoCard__text'>
          <h2 className='videoCard__title' ref={this.titleRef}>{this.state.titleText}</h2>
          <h4 className='videoCard__channel'>{channel}</h4>
        </div>
      </div>
    )
  }
}

export default RelatedVideo;