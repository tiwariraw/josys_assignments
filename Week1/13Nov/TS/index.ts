let mixedArray: (number | string | boolean)[] = [
  1,
  "abc",
  true,
  42,
  "xyz",
  false,
];

mixedArray.push("value", 11, false);
console.log("push", mixedArray);

let lastItem = mixedArray.pop();
console.log("last", lastItem);
console.log("pop", mixedArray);

let firstItem = mixedArray.shift();
console.log("firstitem", firstItem);
console.log("shift", mixedArray);

mixedArray.unshift("start", true);
console.log("unshift", mixedArray);

let mappedArray = mixedArray.map((item) => {
  if (typeof item === "number") return item * 2;
  if (typeof item === "string") return item.toUpperCase();
  return !item;
});
console.log("map", mappedArray);

let stringItems = mixedArray.filter((item) => typeof item === "string");
console.log("filter", stringItems);

let slicedArray = mixedArray.slice(1, 4);
console.log("slice", slicedArray);

mixedArray.splice(2, 2, "new");
console.log("splice", mixedArray);

mixedArray.forEach((item) => {
  console.log("foreach", `Value: ${item}, Type: ${typeof item}`);
});

let newMixedArray: (number | string | boolean)[] = [
  1,
  "apple",
  false,
  42,
  "banana",
  true,
  "apple",
  99,
];

let cnt = newMixedArray.reduce(
  (acc, item) => {
    if (typeof item === "number") {
      acc.numbers += 1;
    } else if (typeof item === "string") {
      acc.strings += 1;
    } else if (typeof item === "boolean") {
      acc.booleans += 1;
    }
    return acc;
  },
  { numbers: 0, strings: 0, booleans: 0 }
);

console.log("Type counts:", cnt);

function calc(input: string | number | boolean | number[]) {
  if (typeof input === "string") {
    return `String length: ${input.length}`;
  } else if (typeof input === "number") {
    return `Rounded number: ${Math.round(input)}`;
  } else if (typeof input === "boolean") {
    return input ? "Boolean is true" : "Boolean is false";
  } else if (Array.isArray(input)) {
    const sum = input.reduce((acc, num) => acc + num, 0);
    return `Sum of array: ${sum}`;
  } else {
    return "else block";
  }
}

console.log(calc("Hello TypeScript"));
console.log(calc(42.89));
console.log(calc(true));
console.log(calc([1, 2, 3, 4]));
