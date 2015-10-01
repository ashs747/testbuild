/* eslint-disable */
export const feedStubBasic = {
    'programmeFeed1': {
      'messages': [{
        'id': '0',
        'user': {
          'forename': 'Matt',
          'surname': 'C',
          'profilePic': {
            'reference': 'profile-pic.jpg'
          },
        },
        'content': "First Post String",
        'files': [],
        'userCanEdit': true,
        'editing': false,
        'expandComments': false,
        'comments': [{
          'id': '22',
          'user': {
            'forename': 'Matt',
            'surname': 'C',
            'profilePic': {
              'reference': 'profile-pic.jpg'
              } 
            },
          'content': "Comment on First Post String",
          'userCanEdit': true,
          'editing': false,
          'expandComments': false,
          }, {
          'id': '33',
          'user': {
            'forename': 'Matt',
            'surname': 'T',

            'profilePic': {
              'reference': 'profile-pic.jpg'
              } 
            }, 
          'content': "Optional String",
          'userCanEdit':false,
          'editing': false,
          'expandComments': false,
        }],
      },
      {
        'id': '1',
        'user': {
          'forename': 'Matt',
          'surname': 'C',
          'profilePic': {
            'reference': 'profile-pic.jpg'
            } 
          },
        'content': "Optional String",
        'files': [],
        'comments': [],
        'userCanEdit': true,
        'editing': false,
        'expandComments': false,
      },
      {
        'id': '2',
        'user': {
          'forename': 'Matt',
          'surname': 'T',
          'profilePic': {
            'reference': 'profile-pic.jpg'
            } 
        },
        'content': "Optional String",
        'files': [],
        'comments': [],
        'userCanEdit': true,
        'editing': false,
        'expandComments': false,
      }]
    }
  }

/*eslint-enable*/