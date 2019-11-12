export function editStudent(student) {
  return {
    type: '@student/EDIT',
    payload: {
      student,
    },
  };
}
