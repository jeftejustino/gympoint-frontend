import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  signed: false,
  token: null,
  profile: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        draft.token = action.payload.token;
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
