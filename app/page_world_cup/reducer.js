import * as actionTypes from './actionTypes';

const initialState={
  A: ['russia', 'egypt'],
  B: ['iran', 'morocco'],
  C: ['australia', 'denmark'],
  D: ['argentina', 'croatia'],
  E: ['brazil', 'costa_rica'],
  F: ['germany', 'korea'],
  G: ['belgium', 'england'],
  H: ['columbia', 'japan'],
  in8:[],
  in4:[],
  in2:[],
  champion:''
  /*group_4_1:{
    up:'',
    down:''
  },
  group_4_2:{
    up:'',
    down:''
  },
  group_4_3:{
    up:'',
    down:''
  },
  group_4_4:{
    up:'',
    down:''
  },
  group_2_1:{
    up:'',
    down:''
  },
  group_2_2:{
    up:'',
    down:''
  },
  finals:{
    left:'',
    right:''
  },
  champion:'',*/
  /*A1:{
    team:null,
  },
  A2:{
    team:null,
  },
  B1:{
    team:null,
  },
  B2:{
    team:null,
  },
  C1:{
    team:null,
  },
  C2:{
    team:null,
  },
  D1:{
    team:null,
  },
  D2:{
    team:null,
  },
  E1:{
    team:null,
  },
  E2:{
    team:null,
  },
  F1:{
    team:null,
  },
  F2:{
    team:null,
  },
  G1:{
    team:null,
  },
  G2:{
    team:null,
  },
  H1:{
    team:null,
  },
  H2:{
    team:null,
  }*/
}

export default function world_cup(state = initialState, action) {
  let _state;
  switch (action.type) {
    case actionTypes.TEAM_CHANGE_ADD:

      if(state[action.groupName].length>=2){
        return state;
      }

      _state = {
        ...state
      }
      _state[action.groupName].push(action.country);
      return _state
    case actionTypes.TEAM_CHANGE_DEL:
      _state = {
        ...state
      }
      _state[action.groupName] = _state[action.groupName].filter(team=>{
        return team!==action.country;
      })
      return _state
    default:
      return state
  }
}
