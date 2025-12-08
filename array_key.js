let fruits = ['apple', 'banana', 'grapes', 'mango']
console.log(fruits[1]) // Accessing the second element

let student={
    name: "John",
    age: 21,
    course: "Computer Science"
}
console.log(student["name"])

for(let i in student){
    console.log(i, ":", student[i])
}

//ternary operator
let age=18
let vote=(age>=18)?"major":"minor"
console.log(vote)

//arrow function
const arrow_function=(name)=>{//    this keyword cannot be used in arrow function ,it is a shorthand syntax
    return `name is ${name}`
}

console.log(arrow_function("sanjay"))

//variable spread operator
const aL=[1,2,3,4]
const bL=[5,6,7,8]
const rL=[...aL,...bL]
console.log(rL)

//spread operatpr for key-value
let students = {
    name: "sanjay",
    age: 19
};
console.log("students:", students);

let details = {
    ...students,          
    college: "KEC",       
    city: "Erode",        
    age: 20         //override existing property
};
console.log("details:", details);

//array of students
// Start with an array of students
let studentsList = [
    { name: "arun", age: 20 },
    { name: "kumar", age: 21 }
];

console.log("Before:", studentsList);

// Add the new student to the list
studentsList = [...studentsList, students];

console.log("After:", studentsList);