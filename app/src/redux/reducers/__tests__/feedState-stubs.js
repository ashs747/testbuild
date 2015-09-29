/* eslint disable */
export const feedStubBasic = {
  Feeds: {
    'programmeFeed1': {
      'messages': [{
        'guid': '0',
        'user': {
          'name': 'Matt C',
          'resource': ''
        },
        'textContent': "First Post String",
        'files': [],
        'userCanEdit': true,
        'editing': false,
        'expandComments': false,

        'comments': [{
          'guid': '22',
          'user': {
            'name': 'Matt C',
            'resource': ''
            },
          'textContent': "Comment on First Post String",
          'userCanEdit': true,
          'editing': false,
          'expandComments': false,
          }, {
          'guid': '33',
          'user': {
            'name': 'Matt T',
            'resource': ''
            }, 
          'textContent': "Optional String",
          'userCanEdit':false,
          'editing': false,
          'expandComments': false,
        }],
      },
      {
        'guid': '1',
        'user': {
          'name': 'Matt C',
          'resource': ''
          },
        'textContent': "Optional String",
        'files': [],
        'comments': [],
        'userCanEdit': true,
        'editing': false,
        'expandComments': false,
      },
      {
        'guid': '2',
        'user': {
          'name': 'Matt T',
          'resource': ''
        },
        'textContent': "Optional String",
        'files': [],
        'comments': [],
        'userCanEdit': true,
        'editing': false,
        'expandComments': false,
      }]
    }
  }
}