import React, { Component } from "react";
import Comment from "../components/comment";
class Comments extends Component {
  state = {
    comments: [
      {
        name: "Michael Lyons",
        timestamp: "1556934071867",
        comment: `They BLEW the ROOF off at their last show, once everyone started ﬁguring
             out they were going. This is still simply the greatest opening of a concert I have EVER witnessed`
      },
      {
        name: "Gary Wong",
        timestamp: "1547046189000",
        comment: `Every time I see him shred I feel so motivated to get off my couch and hop 
          on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!`
      },
      {
        name: "Theodore Duncan",
        timestamp: "1543871776000",
        comment: `How can someone be so good!!! You can tell he lives for this and loves to do it
         every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!`
      }
    ]
  };
  render() {
    return <Comment comments={this.state.comments} />;
  }
}

export default Comments;
