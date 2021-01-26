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

I use Promises a lot in the application I build for work, but I thought I'd review from the beginning what Promise does and how it should be handled.

A typical way someone would use Promises while fetching using an API:

```jsx
function GetGreetingForSubject({ subject }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState(null);

  useEffect(() => {
    async function fetchGreeting() {
      try {
        const response = await window.fetch('https://example.com/api/greeting');
        const data = await response.json();
        setGreeting(data.greeting);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    fetchGreeting();
  }, []);

  return isLoading ? (
    'loading...'
  ) : error ? (
    'ERROR!'
  ) : greeting ? (
    <div>
      {greeting} {subject}
    </div>
  ) : null;
}
```

Another example from (FFF)

```jsx
// sheeeesh callback HELL
import loadImage from "../someImage";
  let addImg = (src) => {
  let imgElement = document.createElement("img");
  imgElement.src = src;
  document.body.appendChild(imgElement);
}
loadImage("images/dog1.jpg", (error, img1) => {
  addImage(img1.src);
  loadImage("images/dog2.jpg", (error, img2) => {
    addImage(img2.src);
    loadImage("images/dog3.jpg", (error, img3) => {
      addImage(img3.src);
   })
  })
 })

// this code is not only ugly, it does not call in parallel!
// ========= converting to using Promises ==========
// loadImage callback
function loadImage(url, callback) {
   let image = new Image();
   image.onload = function() {
     callback(null, image);
   }
   image.onerror = function() {
     let message = `Could not load image at ${url}`;
     callback(new Error(msg);
   }
   image.src = url;
 }
export default loadImage;

// converting above to Promise
function loadImage(url) {
  return new Promise((resolve, reject) => {
   let image = new Image();
   image.onload = function() {
    resolve(image);
   }
   image.onerror = function() {
    let message = `Could not load image at ${url}`;
    reject(new Error(msg);
   }
   image.src = url;
  })
 }
export default loadImage;

// using Promise function we made above
import loadImage from "../someImage";
let addImg = (src) => {
  let imgElement = document.createElement("img");
  imgElement.src = src;
  document.body.appendChild(imgElement);
 } // still pretty bad
loadImage("images/dog1.jpg").then(img1 => {
 addImage(img1.src);
  loadImage("images/dog2.jpg").then(img2 => {
   addImage(img2.src);
   loadImage("images/dog3.jpg").then(img3 => {
    addImage(img3.src);
  })
 })
})

// better
Promise.all([
  loadImage("images/dog1.jpg")
  loadImage("images/dog2.jpg")
  loadImage("images/dog3.jpg")
]).then((images) => {
  // success
  // should return an array of the results
  images.forEach(img => addImg(img.src));
}).catch((error) => {
  // handle error here
  // this will throw if ANY of those fail
});

```

### Async / Await

Spent a decent amount of time reviewing notes and writing some pointers on this article.

Inside a function marked as async, you are allowed to place the await keyword in front of an expression that returns a promise. When you do, the execution of the async function is paused until the promise is **resolved.**

Both Promises and Async / Await can be used together.

```jsx
// function that gets user
async function fetchCatAvatars(userId) {
  const response = await
     fetch(`https://catappapi.herokuapp.com/users/${userId}`);
  const user = await response.json();

  // function that gets all the cats from that user
  return await Promise.all(user.cats.map(async function(catId) {
     const response = await
       fetch(`https://catappapi.herokuapp.com/cats/${catId}`);
     const catData = await response.json();
     return catData.imageUrl;
  })
}
```

---

## 11/27/2020

### Started the React-Fundamentals Workshop! 🏄🏼

- Exercises include background information, instructions, extra credit, tests, and the final version of the exercises.

#### First Exercise: Basic JS "Hello World"

- Pretty straightforward HTML stuff before beginning the React side.
- One thing I learned is that you can generate a root node on the document object without having to type the element directly into the HTML. (From completing the extra credit)

```jsx
const rootNode = document.body.getRootNode();
const rootElement = document.createElement('div'); // this creates the div element as the root node

rootElement.id = 'root';

// append the root node in the body tag
rootNode.body.appendChild(rootElement);
```

---

## 11/28/2020

### Continue the react-fundamentals workshop

#### Second Exercise: Intro to Raw React APIs

- Intro to Raw React API
- Got to practice using React.createElement, not using JSX yet.
- Can execute React codes inside HTML by importing sripts

```jsx
const rootElement = document.getElementById('root'); // rendering point

const element = React.createElement('div', {
  className: 'container',
  children: 'Hello World',
});

ReactDOM.render(element, rootElement);

// extra credit: have multiple children
const elementProps = {
  className: 'container',
  children: [
    React.createElement('span', { key: 1 }, 'Hello '),
    React.createElement('span', { key: 2 }, 'World'),
  ],
};
const elementType = 'div';
const reactElement = React.createElement(elementType, elementProps);

ReactDOM.render(reactElement, rootElement);
```

#### Third Exercise: Using JSX

Started getting into JSX

Learned how to convert React.createElement into using JSX -- way more convenient.

If you import the babel script, you can use it to compile it from JSX -> HTML elements (not suitable for production for obvious reasons)

```jsx
// 🐨 re-implement this using JSX!
// const element = React.createElement('div', {
//   className: 'container',
//   children: 'Hello World',
// })

const element = <div className='container'>Hello World</div>;

// extra credit (1)
const className = 'container';
const children = 'Hello World';
const firstElement = <div className={className}>{children}</div>;
const renderElement = (
  <React.Fragment>
    {element}
    {firstElement}
  </React.Fragment>
);

// extra credit (2)
const props = { children, className };
const secondElement = <div {...props} />;

// 💰 there are a few subtle differences between JSX and HTML. One such
// difference is how you apply a class to an element in JSX is by using

// `className` rather than `class`!
// 📜 You can learn the differences between JSX and HTML syntax from the React docs here:

ReactDOM.render(element, document.getElementById('root'));
```

#### Fourth Exercise: Creating Custom Components

- Last time using actual HTML

```javascript
<!-- Creating custom components -->
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>
  <script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>

  <script type="text/babel">
    // 🐨 Make a function called `message` which returns the JSX we want to share
    // ========== extra credit (2) ========== did it without noticing lol
    const Message = ({className, children, ...props}) => (
      <props.type className={className}>{children}</props.type>
    )

    // 🐨 use that function in place of the divs below with:
    // 💰 {message({children: 'Hello World'})} {message({children: 'Goodbye World'})}
    const element = (
      <div className="container">
      <Message type="div" className="message" children="Hello World"
      />.
      <Message type="div" className="message" children="Goodbye World"
      />
      </div>
    )
    // ========== extra credit (2) ==========
    // I now konw what kent wants
    const message = ({children}) => {
      return <div className="message">{children}</div>
    }
    const originalElement = (
      <div className="container">
        <div>{message({children: 'Hello World'})}</div>
        <div>{message({children: 'Goodbye World'})}</div>
      </div>
    )

    // extra credit (1)
    const helloElement = React.createElement(message, {children:
      'Hello World'})
    const byeElement = React.createElement(message, {children: 'Bye
       World'})
    const extraCreditOne = (
      <div className="container">
        {helloElement}
        {byeElement}
      </div>
    )
    // extra credit (2)
    const secondElement = null
    // extra credit (3) && extra credit (4)
    const NewMessage = ({subject, greeting}) => {
      return (
        <div className="message">
         {greeting}, {subject}
        </div>
      )
    }
    NewMessage.propTypes = {
      greeting: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
    }
    const thirdElement = (
      <div className="container">
        <NewMessage greeting="Hello" />
        <NewMessage greeting="Bye" />
      </div>
    )
    // extra credit (5)
    const fifthElement = (
      <React.Fragment>
        <div>{message({children: 'Hello World'})}</div>
        <div>{message({children: 'Goodbye World'})}</div>
      </React.Fragment>
    )
      // 💯 This is only the first step to making actual React components. The rest is in the extra credit!
      ReactDOM.render(thirdElement, document.getElementById('root'))
  </script>
</body>
```

#### Fifth Exercise: Styling

- Starting to use JSX
- Kent's answer is interesting because of a nested ternary statement like mine, he plucks in the size component directly by using the template literals

```jsx
// Styling
import * as React from 'react'
import '../box-styles.css'

// 💰 Use the className for the size and style (backgroundColor) for the color
// 💰 each of the elements should also have the "box" className applied
// 🐨 add a className prop to each of these and apply the correct class names
// 💰 Here are the available class names: box, box--large, box--medium, box--small
// 🐨 add a style prop to each of them as well so their background color
// matches what the text says it should be as well as `fontStyle: 'italic'`

const font = {fontStyle: 'italic'}
const smallBox =
  <div
    className="box box--small"
    style={{backgroundColor: 'lightblue', ...font}}
  >
    small lightblue box
  </div>
)

const mediumBox = (
  <div className="box box--medium" style={{backgroundColor: 'pink', ...font}}>
    medium pink box
  </div>
)

const largeBox = (
  <div className="box box--large" style={{backgroundColor: 'orange', ...font}}>
    large orange box
  </div>
)

// my answer
const Box = ({className, style, children}) => {
  const sizing =
    className === 'small'
      ? 'box box--small'
      : className === 'medium'
      ? 'box box--medium'
      : className === 'large'
      ? 'box box--large'
      : 'box'

  return (
    <div className={sizing} style={style}>
      {children}
    </div>
  )
}

// kent's answer
const BoxImproved = ({className = '', size, style, ...otherProps}) => {
  const sizeClassName = size ? `box--${size}` : ''
  return (
    <div
      className={`box ${sizeClassName} ${className}`.trim()}
      style={{...style}}
      {...otherProps}
    />
  )
}

const App = () => {
  return (
    <div>
      {smallBox}
      {mediumBox}
      {largeBox}
      <Box
        className="large"
        style={{backgroundColor: 'purple', fontStyle: 'italic'}}
      >
        Large Box
      </Box>
      <BoxImproved
        size="large"
        style={{fontStyle: 'italic', backgroundColor: 'grey'}}
      >
        Large Box Improved
      </BoxImproved>
    </div>
  )
}
export default App
```

#### Sixth Exercise: Forms

- As extra credit, kent had us use useRef to keep track of the value of the input element, which was interesting and I did not think about using that because the ref can be mutated and that is a good way of keeping a ref with an HTML element.

```jsx
// Basic Forms
import * as React from 'react';
const UsernameForm = ({ onSubmitUsername }) => {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input
  // 🐨 add the onSubmit handler to the <form> below
  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  const inputRef = React.useRef(null); // extra credit 1
  // const [error, setError] = React.useState('')
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    // setError(value !== value.toLowerCase() ? 'Username must be lower case' : '')
    setInputValue(value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // kent's way of getting the value
    const newValue = e.target.elements.usernameInput.value;
    console.log(newValue);

    inputRef.current = inputValue;
    onSubmitUsername(inputRef.current);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div style={{ color: 'red' }} role='alert'>
          {/* {error} */}
        </div>
        <label htmlFor='usernameInput'>Username:</label>
        <input
          onChange={handleChange}
          type='text'
          id='usernameInput'
          ref={inputRef}
          value={inputValue}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

const App = () => {
  const onSubmitUsername = (username) =>
    alert(`You entered:
      ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
};

export default App;
```

#### Seventh Exercise: Rendering Arrays

- In this example, I got to experience what not having the key prop does to an array especially when you're adding and removing elements inside the looped list.
- I also got to see how things get mixed up when you just use the index and not a unique `key`.
- Very excited to see the inner workings of how React renders a list that that key prop becomes so important when rendering a looped list.

```jsx
// Rendering Lists
import * as React from 'react';
const allItems = [
  { id: 'apple', value: '🍎 apple' },
  { id: 'orange', value: '🍊 orange' },
  { id: 'grape', value: '🍇 grape' },
  { id: 'pear', value: '🍐 pear' },
];

const App = () => {
  const [items, setItems] = React.useState(allItems);

  const addItem = () => {
    setItems([
      ...items,
      allItems.find((i) => !items.map(({ id }) => id).includes(i.id)),
    ]);
  };

  const removeItem = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
  };
  return (
    <div className='keys'>
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {items.map((item, index) => (
          // 🐨 add a key prop to the <li> below. Set it to item.id
          <li key={item.id}>
            <button onClick={() => removeItem(item)}>remove</button>
            <label htmlFor={`${item.id}-input`}>{item.value}</label>
            <input id={`${item.id}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

### Completed The React Fundamentals Workshop! 🧟‍♂️

---

## 11/29/20

### Started The React-Hooks Workshop 🚀

Prereq: watch Kent's workshop on React Hooks -- [link]("https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf")

#### First Exercise: `useState` -- greeting

- Use `useState` to keep track of the value of the input.

```jsx
import React, { useState } from 'react';

const Greeting = ({ initialName = '' }) => {
  const [name, setName] = useState(initialName);
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor='name'>Name: </label>
        <input value={name} onChange={handleChange} id='name' />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
};

const App = () => {
  return <Greeting />;
};

export default App;
```

#### Second Exercise: `useEffect` - persistent state

- I've gotten REALLY familiar with the useEffect hook once I converted the majority of the class components into functional components.

- The first couple of exercises were pretty straight forward, but once I got to the Custom Hook and Flexible localStorage Hook sections, I got to really see the potential of writing custom Hooks.

* **localStorage useEffect**

```jsx
import React, { useEffect, useState } from 'react';

const Greeting = ({ initialName = '' }) => {
  const [name, setName] = useState(
    window.localStorage.getItem('name') || initialName
  );

  useEffect(() => {
    window.localStorage.setItem('name', name);
  }, [name]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor='name'>Name: </label>
        <input value={name} onChange={handleChange} id='name' />
      </form>
    </div>
  );
};

const App = () => {
  return <Greeting />;
};

export default App;
```

- Lazy State Initialization

```jsx
// old way
const [name, setName] = useState(window.localStorage.getItem("name") || initialValue);

// lazy state init
const [name, setName] = useState(() => {}))
```

Lazy state init gets triggered first (as seen on Hooks Flow video) and is used to optimize computationally expensive processes (such as reading from localStorage).

- Effect Dependencies

```jsx
useEffect(() => {
  window.localStorage.setItem('name', name);
}); // runs every time component gets re-rendered

useEffect(() => {
  window.localStorage.setItem('name', name);
}, [name]); // runs whenever name is changed
```

In the most dumbed-down sense - effect dependencies are the little array brackets at the end of the `useEffect` call that accepts arguments, which tells React to re-render when that dependency has been changed.

- Custom Hook
  Instead of writing `window.localStorage.setItem()` or `window.localStorage.getItem()` every time, we can write a custom hook that will do that for us.

```jsx
import React, { useEffect, useState } from 'react'

const useLocalStorageState = () => {
  const [state, setState] = useState(() => window.localStorage.getItem(key) || defaultValue)

  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

const Greeting = ({ initialName = '' }) => {
  const [name, setName] = useLocalStorageState('name', initialName)
  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
      <form>
        <label>Name: </label>
        <input />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    <div>
  )
}

const App = () => {
  return <Greeting />
}

export default App
```

- Flexible localStorage Hook

How can we make the above custom hook more flexible for the users to use and make it even **more** efficient?!

```jsx
// ================ custom hooks =================================
import React, { useEffect, useState, useRef } from 'react'

const useLocalStorageState = (
  key,
  defaultValue = '',
  { serialize: JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {

      // the try/catch is here in case the localStorage value was
      // set before we had the serialization in place
      try {
        return deserialize(valueInLocalStroage)
      } catch (err) {
        return window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })
  }

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKEy = prevKey.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKey.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

// ================================================================
const Greeting = ({ initialName: '' }) => {
  const [name, setName] = useLocalStorageState('name', initialName)
  const handleChange = e => {
    setName(e.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor='name'>Name: </label>
        <input value={name} onChange={handleChange} id='name' />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}
```

- As you can see: the component that uses the custom hooks doesn't change much, but the custom hooks are capable of receiving different types of params without having the apps explode.

#### Third Exercise: Hooks Flow

- Diagram

![react hooks flow](https://cdn-images-1.medium.com/max/1600/1*ec7c-jxoT64JdaPfMGp7gA.png 'React Hooks Flow')

- Example:

```jsx
// Hook flow
import React, {useEffect} from 'react'

function Child() {
  console.log('%c Child: render start', 'color: MediumSpringGreen')
  const [count, setCount] = React.useState(() => {
    console.log('%c Child: useState(() => 0)', 'color: tomato')
    return 0
  })

  useEffect(() => {
    console.log('%c    Child: useEffect(() => {})', 'color: LightCoral')

    return () => {
      console.log( '%c Child: useEffect(() => {}) cleanup 🧹', 'color: LightCoral')
    }
  })

  useEffect(() => {
    console.log(
      '%c Child: useEffect(() => {}, [])', 'color: MediumTurquoise',
    )

    return () => {
      console.log( '%c Child: useEffect(() => {}, []) cleanup 🧹', 'color: MediumTurquoise')
    }
  }, [])

  useEffect(() => {
    console.log('%c Child: useEffect(() => {}, [count])', 'color: HotPink')

    return () => {
      console.log('%c Child: useEffect(() => {}, [count]) cleanup 🧹', 'color: HotPink')
    }
  }, [count])

  const element = (
    <button onClick={() => setCount(previousCount => previousCount + 1)}>
      {count}
    </button>
  )
  console.log('%c Child: render end', 'color: MediumSpringGreen')

  return element
}

function App() {
  console.log('%cApp: render start', 'color: MediumSpringGreen')
  const [showChild, setShowChild] = React.useState(() => {
    console.log('%cApp: useState(() => false)', 'color: tomato')

    return false
  })

  useEffect(() => {
    console.log('%cApp: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log('%cApp: useEffect(() => {}) cleanup 🧹', 'color:
         LightCoral')
    }
  })

  useEffect(() => {
    console.log('%cApp: useEffect(() => {}, [])', 'color:
      MediumTurquoise')
    return () => {
      console.log(
      '%cApp: useEffect(() => {}, []) cleanup 🧹',
      'color: MediumTurquoise',
     )
   }
 }, [])

  useEffect(() => {
    console.log('%cApp: useEffect(() => {}, [showChild])', 'color:
      HotPink')
    return () => {
      console.log(
        '%cApp: useEffect(() => {}, [showChild]) cleanup 🧹',
        'color: HotPink',
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: 'solid',
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  )
  console.log('%cApp: render end', 'color: MediumSpringGreen')

  return element
}

export default App
```

#### Hooks Flow

**Render:**

1. App: render start
2. App: `useState(() => false)` // lazy state intializer
3. App: render ends
4. App: `useEffect(() => {})`
5. App: `useEffect(() => {}, [])`
6. App: `useEffect(() => {}, [showChild])`

**Update:**

1. App: render start
2. App: (parent component) render end
   - Child: render start
   - Child: `useState(() => 0)`
   - Child: render end
   - Child: `useEffect(() => {})`
   - Child: `useEffect(() => {}, [])`
   - Child: `useEffect(() => {}, [count])`
3. App: `useEffect(() => {})` -> cleanup
4. App: `useEffect(() => {}, [showChild])` -> cleanup
5. App: `useEffect(() => {})`
6. App: `useEffect(() => {}, [showChild])` (SHOW CHILD TRIGGERED)
   - Child: render start
   - Child: render end
   - Child: `useEffect(() => {})` -> cleanup
   - Child: `useEffect(() => {}, [count])` -> cleanup
   - Child: `useEffect(() => {})`
   - Child: `useEffect(() => {}, [count])` (HIDE CHILD TRIGGERED)
7. App: render start
8. App: render end (all cleanups run on the child bc of the unmount)
   - Child: `useEffect(() => {})` -> cleanup
   - Child: `useEffect(() => {}, [])` -> cleanup
   - Child: `useEffect(() => {}, [count])` -> cleanup
9. App: `useEffect(() => {})` -> cleanup
10. App: `useEffect(() => {}, [showChild])` -> cleanup
11. App: `useEffect(() => {})`
12. App: `useEffect(() => {}, [showChild])`

---
