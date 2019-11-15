export function editStudent(student) {
  return {
    type: '@student/EDIT',
    payload: {
      student,
    },
  };
}

export function createStudent() {
  return {
    type: '@student/CREATE',
  };
}
