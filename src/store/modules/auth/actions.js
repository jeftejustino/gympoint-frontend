export function SignInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function SignInSuccess(token, profile) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: profile,
  };
}

export function SIgnInFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}
