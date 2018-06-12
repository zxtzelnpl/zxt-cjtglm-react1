import * as actionTypes from './actionTypes';

const initialState = {
  A: [/*'russia', 'egypt'*/],
  B: [/*'iran', 'morocco'*/],
  C: [/*'australia', 'denmark'*/],
  D: [/*'argentina', 'croatia'*/],
  E: [/*'brazil', 'costa_rica'*/],
  F: [/*'germany', 'korea'*/],
  G: [/*'belgium', 'england'*/],
  H: [/*'columbia', 'japan'*/],
  in8: [/*'russia', 'australia', 'brazil', 'belgium', 'egypt', 'denmark', 'costa_rica', 'england'*/],
  in4: [/*'russia', 'brazil', 'egypt', 'costa_rica'*/],
  in2: [/*'russia', 'egypt'*/],
  champion: null,
  ok:false
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
};

export default function world_cup(state = initialState, action) {
  let _state;
  switch (action.type) {
    case actionTypes.TEAM_CHANGE_ADD:

      if (state[action.groupName].length >= 2) {
        return state;
      }

      _state = {
        ...state
      };
      _state[action.groupName].push(action.country);
      return _state;
    case actionTypes.TEAM_CHANGE_DEL:
      _state = {
        ...state
      };
      _state[action.groupName] = _state[action.groupName].filter(team => {
        return team !== action.country;
      });
      return _state;

    /*16in8*/
    /*8in4*/
    /*4in2*/
    /*修改冠军*/
    case actionTypes.TEAM_CHANGE_IN8:
      _state = {
        ...state
      };
      let preTeamNameOfIn8 = _state.in8[action.index];

      if(typeof preTeamNameOfIn8==='undefined'){
        _state.in8[action.index] = action.teamName;
        _state.in8 = [..._state.in8];
      }
      else{
        _state.in8 = _state.in8.map((country,index)=>{
          if(index === action.index){
            return action.teamName
          }
          else{
            return country;
          }
        })

        _state.in4 = _state.in4.map(country=>{
          if(country===preTeamNameOfIn8){
            return action.teamName;
          }
          else{
            return country;
          }
        })

        _state.in2 = _state.in2.map(country=>{
          if(country===preTeamNameOfIn8){
            return action.teamName;
          }
          else{
            return country;
          }
        })

        if (_state.champion === preTeamNameOfIn8) {
          _state.champion = action.teamName;
        }
      }

      return _state;

    /*8in4*/
    /*4in2*/
    /*修改冠军*/
    case actionTypes.TEAM_CHANGE_IN4:
      _state = {
        ...state
      };
      let preTeamNameOfIn4 = _state.in4[action.index];

      if(typeof preTeamNameOfIn4==='undefined'){
        _state.in4[action.index] = action.teamName;
        _state.in4 = [..._state.in4];
      }
      else{
        _state.in4 = _state.in4.map((country,index)=>{
          if(index === action.index){
            return action.teamName
          }
          else{
            return country;
          }
        })

        _state.in2 = _state.in2.map(country=>{
          if(country===preTeamNameOfIn4){
            return action.teamName;
          }
          else{
            return country;
          }
        })

        if (_state.champion === preTeamNameOfIn4) {
          _state.champion = action.teamName;
        }
      }

      return _state;

    /*4in2*/
    /*修改冠军*/
    case actionTypes.TEAM_CHANGE_IN2:
      _state = {
        ...state
      };
      let preTeamNameOfIn2 = _state.in2[action.index];

      if(typeof preTeamNameOfIn2==='undefined'){
        _state.in2[action.index] = action.teamName;
        _state.in2 = [..._state.in2];
      }
      else{
        _state.in2 = _state.in2.map((country,index)=>{
          if(index === action.index){
            return action.teamName
          }
          else{
            return country;
          }
        })

        if (_state.champion === preTeamNameOfIn2) {
          _state.champion = action.teamName;
        }
      }

      return _state;

    /*修改冠军*/
    case actionTypes.TEAM_CHANGE_CHAMPION:
      return {
        ...state,
        champion:action.teamName
      };
    case actionTypes.TEAM_ALL_OK:
      return {
        ...state,
        ok:true
      }

    default:
      return state;
  }
}
