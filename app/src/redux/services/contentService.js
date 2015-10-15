import request from 'cirrus/services/request';

export function getResources(cohortId) {
  //return request.post("/variation-generator", body).end();
  return Promise.resolve({
    projects: [{
      title: "Project title 2nd line if needed",
      reference: "http://google.com?",
      type: {
        icon: "briefcase",
        typeSlug: "project"
      }
    }, {
      title: "Project title 2nd line if needed",
      reference: "http://google.com",
      type: {
        icon: "briefcase",
        typeSlug: "project"
      }
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
    }]
  });
};

export function getFAQs() {
  //return request.post("/variation-generator", body).end();
  return Promise.resolve([{
    group: "About",
    title: "This is an example question",
    answer: "This is an example answer"
  }, {
    group: "About",
    title: "This is another example question",
    answer: "This is an example answer"
  }, {
    group: "About",
    title: "This is an example question 2",
    answer: "This is an example answer"
  }, {
    group: "About",
    title: "This is another example question 2",
    answer: "This is an example answer"
  }, {
    group: "About",
    title: "This is an example question 3",
    answer: "This is an example answer"
  }, {
    group: "Another-catagory",
    title: "This is another example question",
    answer: "This is an example answer"
  }, {
    group: "Final-catagory",
    title: "This is an example question",
    answer: "This is an example answer"
  }, {
    group: "Final-catagory",
    title: "This is another example question",
    answer: "This is an example answer"
  }]);
}
