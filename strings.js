const greeting = "Hello, World!"
const l=greeting[0]
console.log(greeting.toUpperCase())

console.log("switch case")
let a="Apple"
switch(a){
    case "Orange":
        console.log("The data is orange")
        break
    case "Apple":
        console.log("The data is apple")
        break
    default:
        console.log("The data not Found")
}
console.log()

//String concatenation
let str1="hello"
let str2=", World!"
let str3=str1.concat(str2)
console.log(str1.concat(str2))
console.log(str1.includes("hello"))
console.log(str1.includes("hellO"))
console.log(str1.indexOf("lo"))

console.log(str3.substring(0,5))

