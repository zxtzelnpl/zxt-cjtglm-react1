import * as actionTypes from './actionTypes';

export const add = (groupName,country)=>{
  return {
    type:actionTypes.TEAM_CHANGE_ADD,
    groupName,
    country
  }
}

export const del = (groupName,country)=>{
  return {
    type:actionTypes.TEAM_CHANGE_DEL,
    groupName,
    country
  }
}
