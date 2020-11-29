import React, {useReducer} from 'react'
import FacilitiesContext from './facilitiesContext'
import facilitiesReducer from './facilitiesReducer'
import {GET_FACILITIES} from '../types'
import axios from 'axios'

const FacilitiesState = (props) => {
  const initialState = {
    facilities : [],
  }

  const [state, dispatch] = useReducer(facilitiesReducer, initialState)

  // Actions
  const getFacilities = async () => {
    const facilities = await axios.get('https://ugcompass.herokuapp.com/api/v1/facilities');
    dispatch({type: GET_FACILITIES, payload:  facilities.data.data})
  }



  return (<FacilitiesContext.Provider value={{facilities: state.facilities, getFacilities}}>
    {props.children}
  </FacilitiesContext.Provider>)
}

export default FacilitiesState;
