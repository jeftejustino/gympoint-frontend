export function editRegistration(registration) {
  return {
    type: '@registration/EDIT',
    payload: {
      registration,
    },
  };
}

export function createRegistration() {
  return {
    type: '@registration/CREATE',
  };
}
