import {castPropertiesToObject} from '../helpers/genericHelpers';

export function reducer(state = {}, action) {
  switch (action.type) {
    case 'INITIAL_DATA_UPDATED':
      var newState = {...state};
      var field = action.payload.field;
      var value = action.payload.value;

      if (field.indexOf("properties.") > -1) {
        var propsField = field.split('.')[1];
        newState.properties[propsField] = value;
        return newState;
      }
      newState[field] = value;
      return newState;
      break;

    case 'FETCHED_INITIAL_USER':
      switch (action.status) {
        case 'RESOLVED':
          let user = castPropertiesToObject(action.payload);
          let newState = {...state, ...user};
          return newState;

        case 'REJECTED':
          return {...state};

        default:
          return {...state};
      }

    case 'LOGOUT':
      return {};

    case 'FETCH_COHORT':
      switch (action.status) {
        case 'RESOLVED':
          return {...state,
            cohortMembers: action.payload.users ? action.payload.users.map(castPropertiesToObject) : []
          };
      }

    case 'TOKEN_CHECKED':
      switch (action.status) {
        case 'RESOLVED':
          var user = action.payload.user;
          return {
            ...state,
            ...user,
            loggedIn: true
          };

        case 'REJECTED':
          return {
            loggedIn: false
          };
        default:
          return state;
      }

    case 'USER_SAVED':
      switch (action.status) {
        case 'RESOLVED':
          return {
            ...state,
            detailsLoading: false,
            detailsError: false,
            detailsSuccess: true
          };

        case 'REJECTED':
          return {
            ...state,
            detailsLoading: false,
            detailsError: true,
            detailsSuccess: false
          };

        default:
          return {
            ...state,
            detailsLoading: true,
            detailsError: false,
            detailsSuccess: false
          };
      }

    default:
      return state;

    case 'USER_CLEAR_DETAILS_FORM':
      return {
        ...state,
        detailsError: false,
        detailsSuccess: false,
        passwordError: false,
        passwordSuccess: false,
        password: null,
        confirm: null
      };

    case 'USER_SAVE_PASSWORD':
      switch (action.status) {
        case 'RESOLVED':
          return {
            ...state,
            passwordLoading: false,
            passwordError: false,
            passwordSuccess: true
          };

        case 'REJECTED':
          return {
            ...state,
            passwordLoading: false,
            passwordError: true,
            passwordSuccess: false
          };

        default:
          return {
            ...state,
            passwordLoading: true,
            passwordError: false,
            passwordSuccess: false
          };
      }

    case 'USER_UPDATE_PROFILE':
      return {
        ...state,
        profilePic: action.payload.profilePic
      };

    case 'SAVE_USER_DETAILS':
      switch (action.status) {
        case 'RESOLVED':
          return {
            ...state,
            onBoardingLoading: false,
            onBoardingError: action.error
          };

        case 'REJECTED':
          return {
            ...state,
            onBoardingLoading: false,
            onBoardingError: action.error
          };

        default:
          return {
            ...state,
            onBoardingLoading: true,
            onBoardingError: null
          };
      }
  }
}
