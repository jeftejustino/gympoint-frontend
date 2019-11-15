import produce from 'immer';

const INITIAL_STATE = {
  registration: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/EDIT': {
        draft.registration = action.payload.registration;
        break;
      }

      case '@registration/CREATE': {
        draft.registration = null;
        break;
      }

      default:
    }
  });
}
