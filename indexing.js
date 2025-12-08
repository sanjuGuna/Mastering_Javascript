const mylist= [5,2,4,3,1]
const strings = "hello"

const slicedlist = mylist.slice(2,4)
const slicedstring= strings.slice(3,5)

console.log(slicedlist)
console.log(slicedstring)

console.log("Concatenation")
const concatedstring = `${strings} ,World!`
const concatedStrings = strings + " ,World"
console.log(concatedstring)
console.log(concatedStrings)

console.log("Sorting the list of number is non-ncreasing order")
const sortedList=[...mylist].sort((a,b)=>b-a); // compare every element swaps if postive ,no swap for negative
console.log(sortedList)

