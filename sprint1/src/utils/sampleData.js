import videoPoster from "../assets/Images/video-list-0.jpg";
import videoPoster1 from "../assets/Images/video-list-1.jpg";
import videoPoster2 from "../assets/Images/video-list-2.jpg";
import videoPoster3 from "../assets/Images/video-list-3.jpg";
import videoPoster4 from "../assets/Images/video-list-4.jpg";
import videoPoster5 from "../assets/Images/video-list-5.jpg";
import videoPoster6 from "../assets/Images/video-list-6.jpg";
import videoPoster7 from "../assets/Images/video-list-7.jpg";
import videoPoster8 from "../assets/Images/video-list-8.jpg";

const sampleVideoData = {
  id: 'abc-123-def-456',
  title: "BMX Rampage: 2018 Highlights",
  description: `On a gusty day in Southern Utah, a group of 25 daring 
    mountain bikers blew the doors off what is possible on two wheels, unleashing 
    some of the biggest moments the sport has ever seen. While mother nature only 
    allowed for one full run before the conditions made it impossible to ride, that was 
    all that was needed for event veteran Kyle Strait, who won the event for the second time -- 
    eight years after his ﬁrst Red Cow Rampage title`,
  channel: "Red Cow",
  image: videoPoster,
  views: "1,104,561",
  likes: "165,312",
  duration: '3:51',
  video: 'VIDEO URL HERE!',
  timestamp: 1545165812000,// 12/18/2018
  comments: [
    {
      name: "Michael Lyons",
      timestamp: 1556934071867,
      comment: `They BLEW the ROOF off at their last show, once everyone started ﬁguring
             out they were going. This is still simply the greatest opening of a concert I have EVER witnessed`
    },
    {
      name: "Gary Wong",
      timestamp: 1547046189000,
      comment: `Every time I see him shred I feel so motivated to get off my couch and hop 
          on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!`
    },
    {
      name: "Theodore Duncan",
      timestamp: 1543871776000,
      comment: `How can someone be so good!!! You can tell he lives for this and loves to do it
         every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!`
    }
  ]
};

const sideVideos = [
  {
    id: '1',
    title: 'Become A Travel Pro In This Easy Lesson',
    channel: 'Scotty Cranmer',
    image: videoPoster1
  },
  {
    id: '2',
    title: 'Les Houches The Hidden Gem Of The Chamonix',
    channel: 'Bernard Patrick',
    image: videoPoster2
  },
  {
    id: '3',
    title: 'Travel Health Useful Medical Information For',
    channel: 'Lizzie Burton',
    image: videoPoster3
  },
  {
    id: '4',
    title: 'Cheap Airline Tickets Great Ways To Save',
    channel: 'Emily Harper',
    image: videoPoster4
  },
  {
    id: '5',
    title: 'Take A Romantic Break In A Boutique Hotel',
    channel: 'Ethan Owen',
    image: videoPoster5
  },
  {
    id: '6',
    title: 'Choose The Perfect Accommodations',
    channel: 'Lydia Perez',
    image: videoPoster6
  },
  {
    id: '7',
    title: 'Cruising Destination Ideas',
    channel: 'Timothy Austin',
    image: videoPoster7
  },
  {
    id: '8',
    title: 'Train Travel On Track For Safety',
    channel: 'Scotty Cranmer',
    image: videoPoster8
  },


]

export default [sampleVideoData, sideVideos];
