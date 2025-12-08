let num=[1,2,3,4,5,6]
console.log(num)
const num1=num.map(num=>num*num*num)//more like for loop, dont change the original value in the list , 
                                    // In for loop it changes
console.log(num1)

const num_filter=num.filter(x=>x%2===0) // it's like where condition if satisfies add to the list
console.log(num_filter)

const sum=num_filter.reduce((accumulator,currentValue)=>accumulator+currentValue,0)
console.log(sum)

//To make function to get multiple arguments
function calc_sum(...numbers){//always get args as list
    console.log(numbers)
    //return numbers.reduce((a,b)=>a+b,0)
}
calc_sum(1,2,3,4,5)
//console.log(calc_sum(1,2,3,4,5))