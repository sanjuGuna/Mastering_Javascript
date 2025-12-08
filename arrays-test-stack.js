var arr = [];
arr["abc"] = 1;
arr["bcd"] = 2;
console.log(arr)
console.log("after storing 1 and 2",arr.length); // outputs 0
arr["1"] = "one"; // notice the subscript content is in quotes
console.log("after string with key 1 and value one",arr.length); // outputs 2
console.log(arr); // outputs [undifined, "one"]
console.log(arr["abc"]); // outputs 1