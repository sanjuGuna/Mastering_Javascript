const fruits = ['apple', 'banana', 'grapes', 'mango']
console.log(fruits)

fruits.push('papaya')
console.log(fruits)

fruits.splice(2,0,'pomegranete','onion')
console.log(fruits)

fruits.splice(4,1)
console.log(fruits)

fruits.splice(1,1,'banana-copy')
console.log(fruits)

fruits.splice(fruits.indexOf('pomegranete'),1)
console.log(fruits)

console.log(fruits[9])
console.log(fruits[fruits.length-1]);