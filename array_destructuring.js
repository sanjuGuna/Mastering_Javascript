const num=[1,2,3,4,5]
const [a,b,c,...rem]=num
console.log(a,b,c,rem)

const [z,,x]=num
console.log(z,x)

const person={
    name:"sanjay",
    role:"Big Data Developer",
    salary:200000
};

const {name,salary}=person;
console.log(name," ",salary)