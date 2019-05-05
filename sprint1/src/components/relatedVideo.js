import React from 'react'

class relatedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.origTitle = this.props.video.title;
    this.state = {
      titleText: this.props.video.title
    }
  }

  componentDidMount() {
    //Wait for document to be ready (css applied) before checking widths
    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        // document ready
        let charsPerLine = this.titleRef.current.offsetWidth / (14 / 1.8)
        let maxLength = (charsPerLine * 2) - 3;
        let newStr = this.updateText(this.origTitle, maxLength)
        this.setState({
          titleText: newStr
        })
      }
    }, 100);

    //Add event listener to update text/ellipsis  on window resize
    window.addEventListener("resize", () => {
      let charsPerLine = this.titleRef.current.offsetWidth / (14 / 1.8)
      let maxLength = (charsPerLine * 2) - 3;
      let newStr = this.updateText(this.origTitle, maxLength)
      this.setState({
        titleText: newStr
      })
    });
  }

  /**
   * @param  text          string       - text to shorten
   * @param  maxTextLength int          - desired max length of shorten string
   * @return ret           string       - new shortened string
   */
  updateText = (text, maxTextLength) => {
    let ret = text;
    if (ret.length > maxTextLength) {
      ret = ret.substr(0, maxTextLength - 3) + "...";
    }
    return ret;
  }

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

// Min-width: 329px


export default relatedVideo;