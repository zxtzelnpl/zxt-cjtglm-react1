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

export const from16in8 = (index,teamName) => {
  return {
    type:actionTypes.TEAM_CHANGE_IN8,
    index,
    teamName
  }
}

export const from8in4 = (index,teamName) => {
  return {
    type:actionTypes.TEAM_CHANGE_IN4,
    index,
    teamName
  }
}

export const from4in2 = (index,teamName) => {
  return {
    type:actionTypes.TEAM_CHANGE_IN2,
    index,
    teamName
  }
}

export const from2inchampion = (teamName) => {
  return {
    type:actionTypes.TEAM_CHANGE_CHAMPION,
    teamName
  }
}
