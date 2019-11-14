import produce from 'immer';

const INITIAL_STATE = {
  student: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/EDIT': {
        draft.student = action.payload.student;
        break;
      }

      default:
    }
  });
}
