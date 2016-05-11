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

export const learningJourneyContent = {
  body: (supportUrl) => {
    return (
      <div>
        <p>Keep track of your progress and see what events are coming up next. After each activity we’ll ask you for your feedback and to complete your learning log. If you’re not able to make any of the dates please click <a target="_blank" href={supportUrl}>here ></a></p>
        <p>Click on any of the module or activity titles to visit the dedicated page for each and access any pre-work or resources.</p>
      </div>
    )
  }
}

export const myCohortContent = {
  messageFeed: "This is a private feed. Only members of your cohort and our facilitators can view, post or comment on this board. As you work on your business challenge you can use this board to share back ideas and collaborate. You can upload videos or photos from your phone, tablet or PC as well as adding links to Vimeo or YouTube videos."
}

export const toolkitContent = {
  body: "A collection of tools designed to support you through the programme and beyond. Straightforward tips and techniques to put into practice straight away."
}

export const onBoardingContent = {
  slide1: {
    title: "Welcome to your portal for the Managers to Leaders programme.",
    body: "Come on in, we’ve been expecting you!"
  },
  slide2: {
    title: "A message from the Corporate Management Board",
    videoUrl: "https://vimeo.com/150919913"
  },
  slide3: {
    title: "Your learning journey",
    image: "assets/img/on-boarding-learning-journey-new.png",
    content: (
      <div>
        <p>We have identified 5 essential Leadership Qualities which are the building blocks for every great leader in the States.</p>
        <p>The 9-month ‘Managers to Leaders’ programme is built around these qualities and has been designed specifically to support transformational leadership at the States of Jersey.</p>
      </div>
    )
  },
  slide4: {
    title: "An interactive learning experience",
    image: "assets/img/areas-of-expertise.png",
    content: (
      <div>
        <p>The programme is delivered to you using a blended approach which will include workshops, webinars, coaching and Action Learning.</p>
        <p>It includes a large variety of experiential activities and self-learning tools that will help you to accelerate, stretch and grow.</p>
      </div>
    )
  },
  slide5: {
    title: "Track your progress and see upcoming events",
    image: "assets/img/track-your-progress.png",
    content: (
      <div>
        <p>Your personalised learning journey gives you all the key dates and information you need to stay on-track.</p>
        <p>As you’ll be learning in a cohort most of the dates are fixed but you can book your coaching sessions at a time to suit you.</p>
        <p>We’ll send you email reminders about upcoming events so you don’t forget.</p>
      </div>
    )
  },
  slide6: {
    title: "Accessible on any device",
    image: "assets/img/any-device.png",
    content: (
      <div>
        <p>This portal is here to guide you through your development journey.  You can access it on any device with an internet connection.</p>
        <p>We’ll send you an email with the web address - store it in your bookmarks for quick access.</p>
        <p>Webinars are best experienced on a laptop or desktop.</p>
      </div>
    )
  },
  slide7: {
    title: "Now, add a photo and password"
  }
}
