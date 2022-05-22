import * as actions from './actions';

export const initialState = {
  history: [],
  currentSubject: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.ADD: {
      return {
        ...state,
        history: state.history.concat([state.currentSubject]),
      };
    }
    case actions.CLEAR: {
      return {
        ...state,
        currentSubject: null,
      };
    }
    case actions.SELECT: {
      return {
        ...state,
        currentSubject: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
