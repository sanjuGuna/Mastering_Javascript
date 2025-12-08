function greet(name){
    console.group(`Hello, ${name}`)
}

function ageCheck(age){
    if (age < 18){
        console.log("Minor") 
    }else{
        console.log("Major") 
    }
}
greet("sanjay")
ageCheck(19)
