import React from 'react';

export const homeContent = {
  headerSubText: "Join the discussion, collaborate with people in your group",
  learningJourneyHeader: "Your learning journey",
  learningJourney: (
      <p>
        Keep track of your progress as you go through the programme. 
        Click on any of the modules for more detail of the workshops, webinars,
        coaching and projects in each. You can also see a timetable of all the
        events in the programme <a href="/#/personal-learning-journey">here ></a>
      </p>
  ),
  messageFeed: "Everyone on the programme can view, post or comment here. We’ll post links and videos to enrich your development and share news about the leadership programme.",
  //Need to work out a better way to CMS the home screen tiles, just leaving it for now.
}

export const programmeContent = {
  tile1: {
    header: "Your leadership programme",
    content: "As an organisation, we are facing unprecedented change and need to rethink the way we provide public service to our customers across the Island. We cannot do this with the same mindset and approaches we have used in the past and it is now time for us to develop and enhance the skills and confidence to lead our organisation in a different way. The Managers to Leaders programme is our collective step towards this vision."
  },
  tile2: {
    header: "Powered by our values",
    content: "Our values are key to the way we act towards each other and how we interact with our customers every day."
  },
  carousel1: [{
    name: "Customer Focus",
    icon: <img src="assets/img/customer-focus-white.png" alt="values icon" />,
    copy: "We should never forget that we are here to serve the public, develop services to meet their needs efficiently, and provide value for money."
  }, {
    name: "Constantly Improving",
    icon: <img src="assets/img/contantly-improving-white.png" alt="values icon" />,
    copy: "We should always aim to be better, challenge habits and learn from mistakes."
  }, {
    name: "Better Together",
    icon: <img src="assets/img/better-together-white.png" alt="values icon" />,
    copy: "We work across boundaries and departments to deliver a better future for Jersey."
  }, {
    name: "Always Respectful",
    icon: <img src="assets/img/always-respectful-white.png" alt="values icon" />,
    copy: "We should care about people as individuals and always treat them with respect."
  }, {
    name: "We Deliver",
    icon: <img src="assets/img/we-always-deliver-white.png" alt="values icon" />,
    copy: "We should take responsibility, act responsibly and always do what we say."
  }],
  tile3: {
    icon: "paint-brush",
    header: "Designed just for you",
    content: "We have spent time with leaders and managers across States of Jersey to understand the challenges you are facing in your roles and what skills gaps there are. The programme is designed specifically to address these."
  },
  tile4: {
    icon: "question",
    header: "What's in it for me?",
    content: "A 9-month blended development programme comprising a range of learning activities including one-to-one coaching. It’s a unique opportunity to develop and build your leadership skills as well as network with your peers."
  },
  tile5: {
    header: "Our 5 essential Leadership Qualities",
    content: "Each module is based around a leadership principle which is designed to build your confidence and ability to deliver the highest quality public service."
  },
  carousel2: [{
    name: "Inspiring Connector",
    icon: <img src="assets/img/inspiring-connector.png" alt="module icon" />,
    copy: "Leaders should be engaging, great communicators and listeners, authentic and open, and respectful to others."
  }, {
    name: "Ambassador for Change",
    icon: <img src="assets/img/ambassador-for-change.png" alt="module icon" />,
    copy: "Leaders should advocate change, be resilient and agile, drive continuous improvement, be courageous and bold."
  }, {
    name: "Agile Decision Maker",
    icon: <img src="assets/img/agile-decision-maker.png" alt="module icon" />,
    copy: "Leaders should do things for the right reasons, empower others to make independent decisions and be accountable."
  }, {
    name: "People Leader",
    icon: <img src="assets/img/people-leader.png" alt="module icon" />,
    copy: "Leaders should motivate and support others, nurture talent, and be aware of their own strengths and areas needing development."
  }, {
    name: "Performance Driver",
    icon: <img src="assets/img/performance-driver.png" alt="module icon" />,
    copy: "Leaders should be focused on outcomes, effective and efficient, work smarter not harder, and set and deliver ambitious goals for themselves and others."
  }],
  tile6: {
    header: "A blended learning approach",
    content: "We have put together a blended programme which is made up of workshops, webinars, coaching and a live business challenge."
  },
  tile7: {
    icon: "users",
    header: "Workshop",
    content: "These face-to-face workshops will be highly experiential with lots of hands on activities and opportunities for practice, as well as time for discussion and reflection with your fellow participants."
  },
  tile8: {
    icon: "user",
    header: "Coaching",
    content: "These one-to-one confidential telephone sessions provide you with the opportunity to work through any challenges in a detailed discussion with your coach."
  },
  tile9: {
    icon: "laptop",
    header: "Webinar",
    content: "These 90-minute ‘virtual classroom’ sessions are hosted online so you will have flexibility to join the webinar from a location to suit you. The webinars are all highly participatory and interactive."
  },
  tile10: {
    icon: "briefcase",
    header: "Action Learning",
    content: "Action Learning is a useful approach to support the transfer of learning from the classroom to the workplace, applying insights to real work challenges."
  },
  tile11: {
    header: "Your development roadmap"
  },
  tile12: {
    header: "A message from the Corporate Management Board",
    videoUrl: "https://vimeo.com/150919913/"
  }
}

export const moduleContent = {
  messageFeed: "Everyone on the programme can view, post or comment here. We’ll post links and videos to enrich your development and share news about the leadership programme."
}
