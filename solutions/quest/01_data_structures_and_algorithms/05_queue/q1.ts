/**
Q1. Number of Students Unable to Eat Lunch
Easy
The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers 0 and 1 respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.

The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step:

If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue.
Otherwise, they will leave it and go to the queue's end.
This continues until none of the queue students want to take the top sandwich and are thus unable to eat.

You are given two integer arrays students and sandwiches where sandwiches[i] is the type of the i​​​​​​th sandwich in the stack (i = 0 is the top of the stack) and students[j] is the preference of the j​​​​​​th student in the initial queue (j = 0 is the front of the queue). Return the number of students that are unable to eat.

Example 1:
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0 
Explanation:
- Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1].
- Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0].
- Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,1].
- Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1].
- Front student takes the top sandwich and leaves the line making students = [] and sandwiches = [].
Hence all students are able to eat.

Example 2:
Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3
 

Constraints:
1 <= students.length, sandwiches.length <= 100
students.length == sandwiches.length
sandwiches[i] is 0 or 1.
students[i] is 0 or 1.
 */

function countStudents(students: number[], sandwiches: number[]): number {
  // as long as there are sandwiches
  while (sandwiches.length) {
    // get current sandwich
    const sandwich = sandwiches[0];
    // get the index of the first student who wants the sandwich
    const studentIndex = students.findIndex((student) => student === sandwich);
    // if the student exists
    if (studentIndex >= 0) {
      // as long as the student is not first in queue
      while (students[0] !== sandwich) {
        // add the first student to the end
        students.push(students[0]);
        // remove the first student
        students.shift();
      }

      // now that the first student is they who want the sandwich
      // remove the student
      students.shift();
      // remove the sandwich
      sandwiches.shift();
    } else {
      // if there is no student who can take the current sandwich
      // return the remaining number of students
      return students.length;
    }
  }

  // if we got here, all students ate
  return 0;
}

console.log("Expected 0 found ", countStudents([1, 1, 0, 0], [0, 1, 0, 1]));
console.log(
  "Expected 3 found ",
  countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]),
);

/**
 * Plan, Basic
 * While there is a sandwich
 * Check if there is a student who wants it
 * If not, return length of student array
 * Else, move all students before the one who wants it to the end of the array, in reverse (one by one?)
 * Repeat
 */
