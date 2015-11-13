export const events = [{
  id: 1,
  name: "Example Event",
  description: "Example Description",
  date: "Thursday 19th November 2015",
  activity: {
    name: "Name of activity",
    type: "Workshop"
  },
  facilitator: {
    id: 1,
    forename: "Jenny",
    surname: "Perkins",
    email: "email@email.com",
    properties: {
      bio: "Cum sociis natoque penatibus et magnis dis Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa snon commodo luctus, nisi erat porttitor"
    }
  },
  slots: [{
    id: 1,
    startDate: "10:00am",
    endDate: "11:00am",
    user: 1,
    location: "Telephone"
  }, {
    id: 2,
    startDate: "1:00pm",
    endDate: "2:00pm",
    user: null,
    location: "Telephone"
  }],
  properties: {}
}];
