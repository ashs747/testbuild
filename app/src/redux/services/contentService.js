import moment from 'moment-timezone';
import requesty from '../../request';
var request = requesty();

export function getProject(id) {
  //return request.post("/variation-generator", body).end();
  return Promise.resolve({
    icon: "search",
    title: "Project title 2nd line if needed",
    time: "90 mins",
    overview: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    learningOutcomes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    projectCopy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    journeyModule: {
      name: "Module 3 - Agile decision maker",
      activities: [{
        name: "Project title, 2nd line if needed",
        activityUsers: [{

        }],
        properties: {
          type: "Project",
          deadline: "16.10.2015"
        }
      }],
      startDate: moment("2015-10-15"),
      endDate: moment("2015-11-20")
    },
    steps: [{
      id: 1,
      number: 1,
      title: "Introduction",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.enim ad minim veniam, quis nostrud.",
      image: null
    }, {
      id: 2,
      number: 2,
      title: "Planning",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.enim ad minim veniam, quis nostrud.",
      image: "http://www.localcelebrationcakes.co.uk/nicedeb1-5.jpg"
    }, {
      id: 3,
      number: 3,
      title: "Another Title",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.enim ad minim veniam, quis nostrud.",
      image: null
    }],
    resources: [{
      title: "Example resource - Word",
      reference: "http://google.com?1",
      type: {
        icon: "file-word-o",
        typeSlug: "document"
      }
    }, {
      title: "Example resource - Video",
      reference: "http://google.com?2",
      type: {
        icon: "youtube-play",
        typeSlug: "video"
      }
    }, {
      title: "Example resource - Word",
      reference: "http://google.com?3",
      type: {
        icon: "file-word-o",
        typeSlug: "document"
      }
    }, {
      title: "Example resource - Video",
      reference: "http://google.com?4",
      type: {
        icon: "youtube-play",
        typeSlug: "video"
      }
    }, {
      title: "Example resource - Word",
      reference: "http://google.com?5",
      type: {
        icon: "file-word-o",
        typeSlug: "document"
      }
    }, {
      title: "Example resource - Video",
      reference: "http://google.com?6",
      type: {
        icon: "youtube-play",
        typeSlug: "video"
      }
    }, {
      title: "Example resource - Word",
      reference: "http://google.com?7",
      type: {
        icon: "file-word-o",
        typeSlug: "document"
      }
    }, {
      title: "Example resource - Video",
      reference: "http://google.com?8",
      type: {
        icon: "youtube-play",
        typeSlug: "video"
      }
    }, {
      title: "Example resource - Link",
      reference: "http://google.com?9",
      type: {
        icon: "external-link",
        typeSlug: "external"
      }
    }, {
      title: "Example resource - Link",
      reference: "http://google.com?10",
      type: {
        icon: "external-link",
        typeSlug: "external"
      }
    }]
  });
}

export function getActivity(slug) {
  return Promise.resolve({
    journeyModule: {
      name: "Module 3 - Agile decision maker",
      activities: [{
        name: "Workshop/Webinar title 2nd line if needed",
        activityUsers: [{}],
        properties: {
          type: "Webinar"
        }
      }],
      startDate: moment("2015-10-15"),
      endDate: moment("2015-11-20")
    },
    resources: [{
      title: "Example resource - Word",
      reference: "http://google.com?1",
      type: {
        icon: "file-word-o",
        typeSlug: "document"
      }
    }, {
      title: "Example resource - Video",
      reference: "http://google.com?2",
      type: {
        icon: "youtube-play",
        typeSlug: "video"
      }
    }],
    preWork: [{
      title: "Example resource - Link",
      reference: "http://google.com?9",
      type: {
        icon: "external-link",
        typeSlug: "external"
      }
    }],
    courseNotes: [{
      title: "Example resource - Link",
      reference: "http://google.com?8",
      type: {
        icon: "external-link",
        typeSlug: "external"
      }
    }, {
      title: "Example resource - Link",
      reference: "http://google.com?10",
      type: {
        icon: "external-link",
        typeSlug: "external"
      }
    }],
    icon: "wrench",
    title: "Workshop/Webinar title 2nd line if needed",
    type: "Webinar",
    content: `Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus.

##### Objectives

Nullam quis risus eget urna mollis ornare vel eu leo. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
Curabitur blandit tempus porttitor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur.`
  });
}
