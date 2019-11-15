export function editPlan(plan) {
  return {
    type: '@plan/EDIT',
    payload: {
      plan,
    },
  };
}

export function createPlan() {
  return {
    type: '@plan/CREATE',
  };
}
