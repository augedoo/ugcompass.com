import {GET_FACILITIES} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_FACILITIES:
      return {...state, facilities: action.payload};
      

    default:
      return state;
  }
};
