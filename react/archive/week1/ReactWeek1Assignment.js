class Student {
 name;
 email;
 community;
 constructor(name, email, community) {
  this.name = name;
  this.email = email;
  this.community = community;
 }
}

class Bootcamp {
 name;
 level;
 students;
 constructor(name, level, students = []) {
  this.name = name;
  this.level = level;
  this.students = students;
 }
 registerStudent(student) {
  let hasExistingEmail = false;
  for(let i = 0; i < this.students.length; i +=1) {
   if (this.students[i].email === student.email) {
    hasExistingEmail = true;
    break;
   }
  }
  if (!hasExistingEmail) {
   this.students.push(student);
   console.log(`Registering ${student.email} to the bootcamp Web Dev Fundamentals.`)
  }
  return this.students;
 }
}

const bootcampOne = new Bootcamp("React", "Week One");
const studentOne = new Student("Jack", "jack@yahoo.com", "Madison")
const studentTwo = new Student("Jill", "jill@gmail.com", "Madison")
const studentThree = new Student("Bucky", "bucky@wisc.edu", "Madison")

let currentStudentList;
[studentOne, studentTwo, studentThree, studentTwo].forEach((student) => {
 console.log(`trying to register ${student.email}`);
 currentStudentList = bootcampOne.registerStudent(student);
 console.log('current student list', currentStudentList.map(student => student.email))
})