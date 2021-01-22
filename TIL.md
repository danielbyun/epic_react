# Epic React: What I Learned

Series of summaries on what I learned from going through Kent C. Dodd's react course: Epic React.

As well as sort of a `diary` while doing this course.

The [link](“https://github.com/danielbyun/epic_react”) to my `Epic React` Github Repository.

---

## Background:

I work as a web developer, for both frontend and backend. But since we have a dedicated backend developer I focus mainly on the frontend and act as a secondary backend developer.

Coming from a Java, Spring Boot, MySQL background, my first project was an admin panel for the execs and board members to view the sales of our API and various other services. That project was built with Spring Boot, Spring Security, Thymeleaf (rendered server-side), Hibernate, JPA, and MySQL.

After that project, I have built some other automated tools for our database using Spring Boot, but due to the quick pace nature of a startup company, we realized that we needed to create a platform that better served our B2B customers as well as the B2C customers that we were targeting after.

---

## 11/23/2020

The company I work for in Gangnam, SK, approved purchasing this course for me - hoping that this would help solidify the project that I am single-handedly in charge of and to help future React developers that they might hire.

They did see how qualified Kent C. Dodd was and what sort of material he was offering - and that the course was available for a lifetime.

I really put in all my effort to not skip anything and really get familiar with all the concepts that Kent stated that I should be familiar with. I attended his old Paypal workshop (uploaded on YouTube) to get to know his teaching style and other topics I might not know from JavaScript. But turns out just by reading his article I did not know that JavaScript had such capabilities as the ones Kotlin did.

#### Section 1: Welcome to Epic React

Went through how the course is set up, how to set up my machine to be able to run through the exercises, and what is expected of from taking this course.

This course is set up interesting that I clone the workshop repo, complete the exercises, then run the test and the app.

---

## 11/24/2020

#### Section 2: React Fundamentals

This section's prerequisites: [JavaScript to know for react](https://kentcdodds.com/blog/javascript-to-know-for-react)

Kent recommends that you know enough about the closure, so I read this article that he suggested: [Closure](https://whatthefork.is/closure)

Below I will add some key points that I have learned from going through the article.

Since Kent said that knowing closure was important, I went ahead and also reviewed `scope` and `hoisting`.

#### Closure:

What I learned about closure is that most (if not all) JavaScript developers sort of use closure without realizing it.

For example:

```jsx

let users = [“Alice”, “Dan”, “Jessica”];
let query = “A”;
let user = users.filter(user => user.startsWith(query));

```

The fact that we're able to use the query variable when it was declared `outside` of the `users.filter` but was still accessible means that we used `closure` here.

That is the simplest way that can display how closure works, the closure also works with functions.

- A simple example with functions

```jsx

	const eat = () => {
		let food = ‘cheese’;
		console.log(`${food} is good`);
	}

	eat(); // Logs: ‘cheese is good’;

	// ==========

	const food = ‘cheese’;
	const eat = () => {
		console.log(`${food} is good`);
	}

	eat(); // logs: ‘cheese is good’

	food = ‘pizza’;

	eat(); // logs: ‘pizza is good’

	food = ‘sushi’l;

	eat(); // logs: ‘sushi is good’

```

- This made me realize how dangerous global variables can be, if you’re not careful with it you will possibly not realize where the function is getting the variables from , and get unexpected outputs.

Combining outside variables that can be accessed by any functions and wrapping code in a function.

```jsx

  // declare the function
  const liveADay = () => {
    // accessible inside liveADay function
    const food = ‘cheese’;

    const eat = () => {
      console.log(`${food} is good`) // food is accessible
    }

    eat(); // eat function is accessible inside this function
  }

liveADay(); // call it - executes eat()

```

Another interesting example I found:

```jsx
const createCounter = (fromNumber = 0) => {
  // outer function scope
  // total is a private property
  const total = fromNumber;

  return () => {
    total += 1;
    return total;
  };
};

const count = createCounter();

console.log(count()); // outputs: 1
console.log(count()); // outputs: 2
console.log(count()); // outputs: 3
console.log(count()); // outputs: 4

// The total stays inside the createCounter function
```

### Scope:

Scope = Context

> Anything declared inside of a scope is available for anything else in the same scope, including the child scope.

Local blocks are created by parenthesis:

```jsx
// variable a is only available inside this block
if (fruit === 'banana') {
  const a = 1; // a is only available inside this if statement
}

{
  // this also works - which is wild
  const test = 'I hate tests';
  console.log(test); // I hate tests
}

console.log(test); // ReferenceError: count is not defined
```

'_var_' and '_function_' declarations are hoisted = put up to the top of the file on execution.

This means you can access these BEFORE the declaration

```jsx
if (true) {
  const fruit = 'banana';
}

console.log(fruit); // outputs: 'banana'
console.log(getSpecialFruit()); // outputs: 'kiwi'

const getSpecialFruit = () => {
  return 'kiwi';
};
```

EXCEPTION

```jsx
console.log(getSpecialFruit()); // outputs: 'kiwi'
console.log(fruit); // ReferenceError: fruit is not defined

const getSpecialFruit = () => {
  const fruit = 'banana';
  return 'kiwi';
};
```

'_let_' and '_const_' declarations only are available INSIDE the scope they are used in

```jsx
if (true) {
  let fruit = 'banana';
}

console.log(fruit); // ReferenceError: fruit is not defined
```

'_let_' and '_const_' declarations do not override ancestor scope declarations with the **same name**

```jsx
let fruit = 'orange';

if (true) {
  let fruit = 'banana';
  console.log(fruit); // outputs: 'banana'
}

console.log(fruit); // outputs: 'orange'
```

---

Now continuing on with Kent's article on JavaScript I should know for React:

### Template Literals

Familiar with template literals -- saved my life on so many occasions whenever I needed to concatenate strings with variables.

```jsx
const greeting = 'hello';
const subject = 'world';

// old way
console.log(greeting + ' ' + subject + '!'); // hello world!

// template literal
console.log(`${greeting} ${subject}!`); // hello world!
```

### Shorthand property names

```jsx

const a = 'hello';
const b  = 42;
const c = { d: [true, false] };
console.log({ a, b, c });

// same as:
console.log( { a: a, b: b, c: c );

// in React:
const counter = () => {
  const [count, setCount] = useCounter( { initialCount, step } );

  return <button onClick={setCount}>{count}</button>
}

```

### Arrow Functions

```jsx

/*
  One thing to note about the example above is that the opening and the closing parenthesis (. This is a common way to leverage the arrow function's implicit return capabilities when working with JSX.
*/

const getFive = () => 5;
const addFive = a => a + 5;
const divide = (a, b) => a / b;

// this is the same as:
function getFive() {
  return 5;
}

function addFive(a) {
  return a + 5;
}

function divide(a, b) {
  return a / b;
}

// in React:
function TeddyBearList({ teddyBears }) {
  return (
    <ul>
      {teddyBears.map(teddyBear => (
        <li key={teddyBear.id}>
          <span>{teddyBear.name}</span>
        </li>
      )}
    <ul>
  )
}

// also can be converted to:
const TeddyBearList = ({ teddyBears }) => {
  return (
    <ul>
      {teddyBears.map(teddyBear =>(
        <li>
          <span></span>
        </li>
      ))}
    </ul>
  )
}

```

### Destructuring

I know how to destructure one or two levels from objects and arrays but I did not realize how much deeper you can go with destructing in JavaScript. I intend to learn how to take advantage of it but all the while writing readable and maintainable code.

```jsx
// const obj = {x: 3.6, y: 7.8}
// makeCalculation(obj)
function makeCalculation({ x, y: d, z = 4 }) {
  return Math.floor((x + d + z) / 3);
}

// this is the same as
function makeCalculation(obj) {
  const { x, y: d, z = 4 } = obj;
  return Math.floor((x + d + z) / 3);
}

// which is the same as
function makeCalculation(obj) {
  const x = obj.x;
  const d = obj.y;
  const z = obj.z === undefined ? 4 : obj.z;
  return Math.floor((x + d + z) / 3);
}

// in React:
function UserGitHubImg({ username = 'ghost', ...props }) {
  return <img src={`https://github.com/${username}.png`} {...props} />;
}
```

Kent referred us to the MDN article about destructing and I found more interesting things about destructring.

I think nesting and the fact that you can destruct even during a for-loop were wild concepts to learn.

```jsx
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20

({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}

const x = [1, 2, 3, 4, 5];
const [y, z] = x;
console.log(y); // 1
console.log(z); // 2

// default values
let a, b;

[a = 5, b = 7] = [1];
console.log(a); // 1
console.log(b); // 7

// parsing an array returned from a function
const f = () => {
  return [1, 2];
};

let a, b;
[a, b] = f();
console.log(a); // 1
console.log(b); // 2

// IGNORING some returned values
// you can ignure return values that you're not interested in
/* 
I was doing this without knowing because I saw someone do it on YouTube and I assumed the comma just lets the function know that whatever has the comma has replaced is being ignored.
*/
function f() {
  return [1, 2, 3];
}
const [a, , b] = f();
console.log(a);
// 1 console.log(b); // 3  const [c] = f(); console.log(c); // 1

// assigning new variables names and providing default values
const { a: aa = 10, b: bb = 5 } = { a: 3 };
console.log(aa); // 3
console.log(bb); // 5

// nesting ***
const metadata = {
  title: 'Scratchpad',
  translations: [
    {
      locale: 'de',
      localization_tags: [],
      last_edit: '2014-04-14T08:43:37',
      url: '/de/docs/Tools/Scratchpad',
      title: 'JavaScript-Umgebung',
    },
  ],
  url: '/en-US/docs/Tools/Scratchpad',
};

let {
  title: englishTitle, // rename
  translations: [
    {
      title: localeTitle, // rename
    },
  ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle); // "JavaScript-Umgebung"

// For of iteration and destructing ***
const people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith',
    },
    age: 35,
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones',
    },
    age: 25,
  },
];

// iterates through everything
for (const {
  name: n,
  family: { father: f },
} of people) {
  console.log('Name: ' + n + ', Father: ' + f);
}
// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"

// combined array and object destructuring
const props = [
  { id: 1, name: 'Fizz' },
  { id: 2, name: 'Buzz' },
  { id: 3, name: 'FizzBuzz' },
];

const [, , { name }] = props;
console.log(name); // "FizzBuzz"
```

### Parameter Defaults

```jsx

// add(1)
// add(1, 2)
function add(a, b = 0) {
  return a + b
}

// is the same as
const add = (a, b = 0) => a + b
// also the same as
function add(a, b) {
  b = b === undefined ? 0 : b;
  return a + b;
}

// in React:
function useLocalStorageState({
  key,
  initialValue,
  serialize = v => v,
  deserialize = v => v,
}) {
  const [state, setState] = useState(() => deserialize(window.localStorage.getItem(key) || initialValue);
  const serializedState = serialize(state);

  useEffect(() => {
    window.localStorage.setItem(key, serializedState)
  }, [key, serializedState])

  return [state, setState];
}

```

---

## 11/25/2020

### Rest / Spread

Viewed some JavaScript videos from FunFunFunction on YouTube: (some to review, some to hear different explanations and live examples)

```jsx

const obj1 = {
  a: "a from obj1";
  b: "b from obj1";
}

const obj2 = {
  b: "b from obj2",
  c: "c from obj2"
}

console.log({ ...obj1, ...obj2 });
// is the same as
console.log(Object.assign({}, obj1, obj2);

function add(first, ...rest) {
  return rest.reduce((sum, next) => sum + next, first)
}

// is the same as
function add(){
  const first = arguments[0];
  const rest = Array.from(arguments).slice(1);

  return res.reduce((sum, next) => sum + next, first)
}

```

### Reduce

One of the most interesting Higher-Order Functions from the JavaScript arrays - MPJ broke it down for me to really understand how the `.reduce()` works

```jsx

// Simple example

// the old way (iterative way)
const orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
]
let totalAmount = 0;
for (let i = 0; i < orders.length; i++){
  totalAmount += orders[i].amount;
}

// using reduce
// sum is the final number, order is the iterated element
let totalAmount = orders.reduce((sum, order) => {
  return sum + order.amount;
}, 0) // starting point

// WAY MORE COMPLEX COMPLEX EXAMPLE
// mission: turn the text inside a file into an object literal

// file text
mark johansson waffle iron 80 2
mark johansson blender 200 1
mark johansson knife 10 4
Nikita Smith waffle iron 80 1
Nikita Smith knife 10 2
Nikita Smith pot 20 3

// goal
{
  "mark johansson": [
    { name: "waffle iron", price: "80", quantity: "2" },
    { name: "blender", price: "200", quantity: "1" },
    { name: "knife", price: "10", quantity: "4" }
  ],
  "Nikita Smith": [
    { name: "waffle iron", price: "80", quantity: "1" },
    { name: "knife", price: "10", quantity: "2" },
    { name: "pot", price: "20", quantity: "3" }
  ]
}

import fs from 'fs'; // filesystem

const output = fs.readFileSync("data.txt", "utf8")
  .trim() // get rid of white space at the end
  .split("\n"); // split by new lines
// output logs this
[
  "mark johansson\twaffle iron\t80\2",
  "mark johansson\tblender\t200\t1",
  "mark johansson\tknife\t10\t4",
  "Nikita Smith\twaffle iron\t80\t1",
  "Nikita Smith\tknife\t10\t2",
  "Nikita Smith\tpot\t20\t3"
]

const mapped = output.map(line => line.split("\t"); // split from \t
// result
[
  [ "mark johansson", "waffle iron", "80", "2" ],
  [ "mark johansson", "blender", "200", "1" ],
  [ "mark johansson", "knife", "10", "4" ],
  [ "Nikita Smith", "waffle iron", "80", "1" ],
  [ "Nikita Smith", "knife", "10", "2" ],
  [ "Nikita Smith", "pot", "20", "3" ]
]

// REDUCE
mapped.reduce((customers, line) => {
  customers[line[0]] = customers[line[0]] || [];
  customers[line[0]].push({
    name: line[1],
    price: line[2],
    quantity: line[3]
  })

  return customers;
}, {})

```

### Currying

- Currying is an interesting concept in that it's a function that doesn't take all the arguments upfront. It can be chained with another function with the parameter.

```jsx
// simple example
// old way
let dragon = (name, size, element) =>
  `${name} is a ${size} dragon that breathes ${element}!`;

// can be converted using currying
let dragon = (name) => (size) => (element) =>
  `${name} is a ${size} dragon that breathes ${element}!`;

// and then you can call it whenever you're ready
let fluffyDragon = dragon('fluffy'); // name parameter
let ginormousDragon = fluffyDragon('ginormous'); // size parameter

console.log(ginormousDragon('fire')); // finally, element parameter
```

- Real example using `lodash.js`

```jsx

import _ from 'lodash';
let dragons = [
  { name: "fluffykins", element: "lightning" },
  { name: "noomi", element: "lightning" },
  { name: "karo", element: "fire" },
  { name: "dommer", element: "timewarp" },
]

let hasElement = _.curry(element, obj) => obj.element === element)  let lightningDragon =   dragons.filter(hasElement("lightning"));

console.log(lightningDragon);

// logs
[
  { name: "fluffykins", element: "lightning" },
  { name: "noomi", element: "lightning" }
]

```

### Recursion

- Recursion is just a function that calls itself until it can't anymore.
- So it is crucial that there is a base statement that can break out of the recursive loop.

```jsx

// classic countdown example
const countdown = (num) => {
  if num === 0 return; // base case
  countdown(num - 1);
}

countdown(10);

// 10
// 9
// 8
// ...
// 1

// advanced example of creating a tree that organizes
// an array of objects into a usable tree
const categories = [
  { id: "animals", "parent": null },
  { id: "mammals", "parent": "animals" },
  { id: "cats", "parent": "mammals" },
  { id: "dogs", "parent": "mammals" },
  { id: "chihuahua", "parent": "dogs" },
  { id: "labrador", "parent": "dogs" },
  { id: "persian", "parent": "cats" },
  { id: "siamese", "parent": "cats" }
]

const makeTree = (categories, parent) => {
  let node = {};

  // parent that isn't null
  categories
    .filter(category => category.parent === parent)
    .forEach(category => node[category.id] = makeTree(cateogries, c.id);

  return node;
}

// expected output:
/*
{
 animals: {
   mammals: {
     dogs: {
       chihuahua: null,
       labrador: null
     },
     cats: {
       persian: null,
       siamese: null
    }
   }
 }
}
*/

```

---

## 11/26/2020

### Promises
