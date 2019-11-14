export function editPlan(plan) {
  return {
    type: '@plan/EDIT',
    payload: {
      plan,
    },
  };
}
