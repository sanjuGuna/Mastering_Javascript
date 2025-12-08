const myList=[1,2,3,4,5]
let myString="hello"
console.log(myList)
console.log(myString)
myList[0]=100
myString[0]="H" // it does not change anything as it is immutable
let another_string = myString.replace('h','H');
console.log(myList)
console.log(myString)
console.log(another_string)