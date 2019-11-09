import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (draft.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        break;
      }

      default:
    }
  });
}
