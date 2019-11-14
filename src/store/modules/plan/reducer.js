import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/EDIT': {
        draft.plan = action.payload.plan;
        break;
      }

      default:
    }
  });
}
