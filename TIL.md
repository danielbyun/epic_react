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

This section's prerequisites: [JavaScript to know for react](https://kentcdodds.com/blog/jsx-to-know-for-react)

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
  One thing to note about the example above is that the opening and the closing parenthesis (. This is a common way to leverage the arrow function's implicit return capabilities when working with jsx.
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
- Got to practice using React.createElement, not using jsx yet.
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

#### Third Exercise: Using jsx

Started getting into jsx

Learned how to convert React.createElement into using jsx -- way more convenient.

If you import the babel script, you can use it to compile it from jsx -> HTML elements (not suitable for production for obvious reasons)

```jsx
// 🐨 re-implement this using jsx!
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

// 💰 there are a few subtle differences between jsx and HTML. One such
// difference is how you apply a class to an element in jsx is by using

// `className` rather than `class`!
// 📜 You can learn the differences between jsx and HTML syntax from the React docs here:

ReactDOM.render(element, document.getElementById('root'));
```

#### Fourth Exercise: Creating Custom Components

- Last time using actual HTML

```jsx
<!-- Creating custom components -->
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>
  <script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>

  <script type="text/babel">
    // 🐨 Make a function called `message` which returns the jsx we want to share
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

- Starting to use jsx
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

## 11/30/20

### Fourth Exercise: Lifting State

- The exercise was pretty straightforward:

  - Practicing passing state down via props to children components or vice versa.

```jsx
import React, { useState } from 'react';

const Name = ({ name, onNameChange }) => {
  return (
    <div>
      <label htmlFor='name'>Name: </label>
      <input id='name' value={name} onChange={onNameChange} />
    </div>
  );
};

const FavoriteAnimal = ({ animal, onAnimalChange }) => {
  return (
    <div>
      <label htmlFor='animal'>Favorite Animal: </label>
      <input id='animal' value={animal} onChange={onAnimalChange} />
    </div>
  );
};

const Display = ({ name, animal }) => {
  return <div>{`Hey you ${name}, your favorite animal is: ${animal}!`}</div>;
};

const App = () => {
  const [name, setName] = useState('');
  const [animal, setAnimal] = useState('');

  return (
    <form>
      <Name name={name} onNameChange={(e) => setName(e.target.value)} />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display animal={animal} name={name} />
    </form>
  );
};

export default App;
```

_Colocating State:_

I don't even know what this means.

- Colocating just means to keep the `state` as close as to where it's relevant as possible.
- Try not to lift or drop too much

* Only use props and state when it's absolutely needed.

Improving the above example to only using states that use them

```jsx
import React, { useState } from 'react';

const Name = () => {
  const [name, setName] = useState('');

  return (
    <div>
      <label htmlFor='name'>Name: </label>
      <input id='name' value={name} onChange={setName} />
    </div>
  );
};

const FavoriteAnimal = ({ animal, onAnimalChange }) => {
  return (
    <div>
      <label htmlFor='animal'>Favorite Animal: </label>
      <input id='animal' value={animal} onChange={onAnimalChange} />
    </div>
  );
};

const Display = ({ animal }) => {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
};

const App = () => {
  const [animal, setAnimal] = useState('');

  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display animal={animal} />
    </form>
  );
};

export default App;
```

### Fifth Exercise: `useState`--tic tact toe

Managed State & Derived State

- Instead of managing each variable as a state, if the variable depends on the changes from one unified point, use `derived state` like so:

```jsx
const Board = () => {
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  const [nextValue, setNextValue] = useState(calculateNextValue(squares));

  const [winner, setWinner] = useState(calculateWinner(squares));

  const [status, setStatus] = useState(calculateStatus(squares));

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;

    const newNextValue = calculateNextValue(squaresCopy);
    const newWinner = calculateWinner(squaresCopy);

    const newStatus = calculateStatus(newWinner, squaresCopy, newNextValue);

    setSquares(squaresCopy);
    setNextValue(newNextValue);
    setWinner(newWinner);

    setStatus(newStatus);
  }

  // return beautiful jsx
};
```

- The problem with this approach is that when the state starts getting complicated the state _may_ fall out of sync with the true component state (`squares`) . It could fall out of sync (for example) because we forgot to update it for a complex sequence of interactions.

* The best way is to approach this is to have the `squares` (the main state) to update other variables that depend on the `squares` state.

```jsx
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function selectTwoSquares(square1, square2) {
    if (winner || squares[square1] || squares[square2]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square1] = nextValue;
    squaresCopy[square2] = nextValue;
    setSquares(squaresCopy);
  }

  // return beautiful jsx
}
```

### Preserve State in LocalStorage

- Very similar to the previous exercise

```jsx
// retrieve on load
const [squares, setSquares] = useState(
  () =>
    JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null)
);

// set on change
useEffect(() => {
  window.localStorage.setItem('squares', JSON.stringify(squares));
}, [squares]);
```

### `useLocalStorageState` Custom HOok

- We created this custom hook in the previous exercise, just implementing it without using `window.localStorage.getIem() || window.localStorage.getItem()`

```jsx
const [squares, setSquares] = useLocalStorageState(
  'squares',
  Array(9).fill(null)
);
```

- We don't need the `useEffect` here because useLocalStorageState checks whether it is a `get` or a `set` depending on if the key already exists or not
- When we use `setSquares` anywhere, the `useLocalStorageState` hook will check

#### Add Game History Feature -- REVIEW NEEDED

- This one was a bit tougher than the other ones.
- Use localStorage to store each marked `squres`
- Store the # of steps

---

## 12/1/20

Continuing the Game History Feature on the `useState: tic tac toe` section:

- TODO: just gonna pass this now -- bue definitely do come back tot his and try implementing it again. (After completing the workshop)

#### Sixth exercise: `useRef` and `useEffect` -- DOM Interaction

- Use `React.useRef` to create a reference on an HTML DOM to be able to manipulate it directly.

```jsx
// useRef and useEffect: DOM interaction
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt';

const Tilt = ({ children }) => {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = React.useRef();
  useEffect(() => {
    const tiltNode = tiltRef.current;

    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    return () => {
      tiltNode.vanillaTilt.destroy();
    };
  }, []);
  return (
    <div className='tilt-root' ref={tiltRef}>
      <div className='tilt-child'>{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <Tilt>
      <div className='totally-centered'>vanilla-tilt.js</div>
    </Tilt>
  );
};

export default App;
```

#### Seventh Exercise: `useEffect` -- HTTP requests

The next four items I have used a lot because of my work project and the size of the project required me to research and implement.

#### Fetch Data

- Fetch data from an API with `useEffect asynchronously`:

```jsx
const [pokemon, setPokemon] = useState({});

useEffect(() => {
  fetchPokemon(pokemonName).then((res) => setPokemon(res));
}, [pokemonName]);
```

#### Handle Errors

- By having an `error` state, you can handle errors and display to the user when needed:

```jsx
const [error, setError] = useState('');

useEffect(() => {
  fetchPokemon(pokemonName)
    .then((res) => setPokemon(res))
    .catch((err) => setError(err));
}, [pokemonName]);

// use div with role = "alert" for screen readers
```

#### Use a status

- Just like the `error` state, you can manage the `status` state to display the process of the app to the user
- Kent recommends `idle`, `pending`, `resolved`, `rejected`, instead of `isLoading` to deliver a clear message to the process of the `fetch` call.

```jsx
const [status, setStatus] = useState('idle');

useEffect(() => {
  setStatus('pending');

  fetchPokemon(pokemonName)
    .then((res) => {
      setStatus('resolved');
      setPokemon(res);
    })
    .catch((err) => {
      setStatus('rejected');
      setError(err);
    });
}, [pokemonName]);

// just like the error message, you can render the status
```

#### Store the State in an Object

- When you have separate `setState` calls, whether it'd be `setError`, `setStatus`… You can easily run into bugs because the component will re-render when a `setState` is called.

* In order to prevent that, we can store the `state` as an object.

```jsx
const [state, setState] = useState({
  pokemon: {},
  error: '',
  status: 'idle',
});

useEffect(() => {
  setState({
    status: 'pending',
  });

  fetchPokemon(pokemonName).then((res) => {
    setState({
      status: 'resolved',
      pokemon: res,
    }).catch((err) => {
      setState({
        status: 'rejected',
        error: err,
      });
    });
  });
}, [pokemonName]);
```

---

## 12/2/20

Continuing `useEffect` -- HTTP requests

**`ErrorBoundary` Component** --- **REVIEW NEEDED**

- Instead of wrapping the `ErrorBoundary` on a lot of different components, you can make customized `ErrorBoundary` components with an appropriate `FallbackComponent` to better utilize the `ErrorBoundary` without having to wrap the entire application.

```jsx
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role='alert'>
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

// ...App component (return statement)
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <AppToRender state={someState} />
</ErrorBoundary>;
```

#### Re-mount the `ErrorBoundary`

- One bug in that `ErrorBoundary` is that once it's been mounted it will not unmount and display the correct child component after.

* In order to fix that we can put in a `key` prop to tell the `ErrorBoundary` to unmount and re-mount whenever that prop has been changed.

```jsx
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role='alert'>
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

// ...App component (return statement)
<ErrorBoundary key={someState} FallbackComponent={ErrorFallback}>
  <AppToRender state={someState} />
</ErrorBoundary>;
```

#### Use `react-error-boundary`

[react-error-boundary link](https://github.com/bvaughn/react-error-boundary)

- Instead of writing our own `ErrorBoundary` components, we can take advantage of a third-party library called `react-error-boundary`

* Very similar implementation but flexible so that we don't have to write them from scratch

* Also, we can leverage using `React Hooks` instead of having to write them in `classes` which is the only way to write `ErrorBoundary` components at this time of writing (12/3/20)

#### Reset the `ErrorBoundary`

- There is a very TINY bug where the state is re-initialized, the app will seem like it's starting from scratch again instead of seamlessly transitioning into the `pending` state again.
- Okay that was a little confusing but here are the steps

In this pokemon example in the course,

1. `pokemon` is null, and the app will prompt the user to type a name to search a `pokemon`.
2. when the user types the pokemon name, it'll execute an HTTP request and show the display.

3. We have handled the error using the `ErrorBoundary` component, and the `status` inside the `state`.

4. So the bug appears when the user types a non-existent pokemon and gets an error message, and when the user types a different name the app will reset to the beginning stage - prompting the user to type a pokemon name, which can seem buggy.

So we're going to use `onReset` prop in the `ErrorBoundary` from `react-error-boundary` to reset the `PokemonName`

```jsx
// this is one of the ways to do it but kind of a workaround
const [{status, pokemon, errorMessage}], setState] = useState({
  status: "idle",
  pokemon: null,
  errorMessage: ""
})

// leveraging the onReset prop
const handleReset = () => setPokemonName("");

// App.js
return (
  ...app,
  <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}>
    <PokemonInfo pokemonName={pokemonName} />
  </ErrorBoundary>
)
```

#### use `resetKeys`

We're using `ErrorBoundary` to handle all different types of errors. But now we don't have that feature of the user being able to just change the `pokemonName` to re-render the app.

`react-error-boundary` offers another useful prop called `resetKeys` to keep track of and re-render the child component.

`resetKeys` is an array of values - when changed, the `ErrorBoundary` will reset itself and re-render.

```jsx
<ErrorBoundary
  key={pokemonName}
  FallbackComponent={ErrorFallback}
  onReset={handleReset}
  resetKeys={[pokemonName]}>
  <PokemonInfo pokemonName={pokemonName} />
</ErrorBoundary>
```

### Completed the React Hooks Workshop! 💸

---

## 12/3/20

Completed all the incomplete summary points in this blog post.

### Started the Advanced React Hooks Workshop! 👻

`useReducer`

\*\*Definitely need to review `useReducer`

- using `useState` can definitely take you far in `React` development, but when you want to separate the state logic from the components that make the state changes, `useReducer` should be implemented because it can come quite handy.

Simple Example:

```jsx
function nameReducer(previousName, newName) {
  return newName
}

const initialNameValue = 'Joe'

function NameInput() {
  const [name, setName] = React.useReducer(nameReducer,
    initialNameValue)
  const handleChange = event => setName(event.target.value)

  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  )
}
// counter example:
const countStepReducer = (prevCount, newCount) => {
  return prevCount + newCount
}

function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useReducer(countReducer, initialCount)

  const increment = () => setCount(count + step)

  return (...)
}

// will increment by 1 on every click
```

- It has an initial value of 'Joe' and when `setName` is called, it will return the `newName` - whatever the user has inputted.

* This is not a typical use-case for `useReducer`, you would usually use it for an object.

### Extra Credit 1: Accept Step as Action (with the `Counter` example)

```jsx
const countReducer = (count, step) {
  return count + step
}

// use this API
const [count, changeCount] = useReducer(countReducer, initialCount);
const increment = () => changeCount(step);
```

### Extra Credit 2: `setState` with Object

```jsx
const countReducer = (state, action) => ({ ...state, ...action });

const [state, setState] = useReducer(countReducer, {
  count: initialCount,
});
const { count } = state;
const increment = () => setState({ count: count + step });
```

- Change the state from a number to an object that has a number as a property.
- Pluck the property off
- Update the increment function
- Call `setState` with an object that has a property for the value that we want to update
- The count reducer was updated to accept the WHOLE state object and the UPDATED version of that STATE OBJECT. WE merge these two things together to get our new state values.

### Extra Credit 3: Object or Function

```jsx
const countReducer = (state, action) => ({
  ...state,
  ...(typeof action === 'function' ? action(state) : action)
})

const [state, setState] = useReducer(countReducer, {
  count: initialCount
})
const { count } = state;
const increment = () => setState(currentState => ({ count: currentState.count + step })
```

- Similar to extra credit 2 - but this API supports both `function` and `object`

### Extra Credit 4: Traditional Dispatch Object (similar to `redux`)

```jsx
const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { count: state.count + action.step };
    }
    default: {
      throw new Error(`The action of ${action.type} does not exist`);
    }
  }
};

const [state, dispatch] = useReducer(countReducer, {
  count: initialCount,
});

const { count } = state;
const increment = () => dispatch({ type: 'INCREMENT' });
```

- `dispatch` you can check via using a `switch` statement and the action.type and running the appropriate action and returning the `state`

## 12/4/20

Prereq materials `useCallback`:

- [Kent's article on `useCallback`](https://kentcdodds.com/blog/usememo-and-usecallback)
- [`useCallback` vs `useMemo`](https://medium.com/@jan.hesters/usecallback-vs-usememo-c23ad1dc60)
- [Kent's talk on `AHA Programming`](https://kentcdodds.com/blog/aha-programming)

## 12/5/20

Prereq materials for `useCallback`:

- [Memoization and react](https://epicreact.dev/memoization-and-react/)

### Exercise: Extract Logic into Hook - REVIEW

- We're extracting logic into a `custom hook` named `useAsync` to fetch and wait for the promise to resolve and then using `useReducer` to `set state`.
- This was a little bit difficult to understand.

```jsx
// useCallback: custom hooks
import React, { useEffect, useReducer, useState } from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon';

// typical reducer
const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

// custom hook
const useAsync = (asyncCallback, initialValues, dependencies) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialValues,
  });
  useEffect(() => {
    const promise = asyncCallback();
    if (!promise) {
      return;
    }
    dispatch({ type: 'pending' });
    promise.then(
      (data) => {
        dispatch({ type: 'resolved', data });
      },
      (error) => {
        dispatch({ type: 'rejected', error });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
};

const PokemonInfo = ({ pokemonName }) => {
  const state = useAsync(
    () => {
      if (!pokemonName) {
        return;
      }
      return fetchPokemon(pokemonName);
    },
    { status: pokemonName ? 'pending' : 'idle' },
    [pokemonName]
  );

  // 🐨 this will change from "pokemon" to "data"
  const { data: pokemon, status, error } = state;

  if (status === 'idle' || !pokemonName) {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }
  throw new Error('This should be impossible');
};

const App = () => {
  const [pokemonName, setPokemonName] = useState('');
  const handleSubmit = (newPokemonName) => {
    setPokemonName(newPokemonName);
  };
  const handleReset = () => {
    setPokemonName('');
  };

  return (
    <div className='pokemon-info-app'>
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className='pokemon-info'>
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
};

const AppWithUnmountCheckbox = () => {
  const [mountApp, setMountApp] = useState(true);

  return (
    <div>
      <label>
        <input
          type='checkbox'
          checked={mountApp}
          onChange={(e) => setMountApp(e.target.checked)}
        />
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
};

export default AppWithUnmountCheckbox;
```

## 12/6/20

Took the day off.

## 12/7/20

Seoul is starting a lockdown for the next three weeks..

So went to the gym and worked out every part of my body for 2-3 hours.
Could not even a lift a finger to code 😭

Lies.

`Context`

One interesting point I read from Kent's introduction to `Context` is this:

- While context makes sharing state easy, it's not the only solution to P`rop Drilling` pains and it's not necessarily the best solution either.
- React's composition model is powerful and can be used to avoid issue with prop drilling as well. !!!

## 12/8/20

Ok back to our regular programming (haha get it)

### Continued and finished Context

### Exercise

- Create the `Context` and `Provider` to create a `wrapper` where the child components within the `Provider` can access the value and the setter function.

```jsx
// useContext: simple Counter
import * as React from 'react';

const CountContext = React.createContext(); // no default value yet

const CountProvider = (props) => {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
};

const CountDisplay = () => {
  const [count] = React.useContext(CountContext);
  return <div>{`The current count is ${count}`}</div>;
};

const Counter = () => {
  const [, setCount] = React.useContext(CountContext);
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>Increment count</button>;
};

const App = () => {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
};

export default App;
```

### Extra Credit 1:

- Create a Consumer Hook - ex: `useCount()`

* Aka create a custom hook that can display clearly where / how the error occurred if the `Consumer` uses the `Context` incorrectly.

```jsx
// useContext: simple Counter - extra credit 1
import * as React from 'react';

const CountContext = React.createContext(); // no default value yet

export const useCount = () => {
  const context = React.useContext(CountContext);
  if (!context) throw new Error('useCount must be used within the Provider');

  return context;
};

const CountProvider = (props) => {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
};

const CountDisplay = () => {
  const [count] = useCount();
  return <div>{`The current count is ${count}`}</div>;
};

const Counter = () => {
  const [, setCount] = useCount();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>Increment count</button>;
};

const App = () => {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
};

export default App;
```

### Extra Credit 2

- We need to store the `cache` of the Pokemon app somewhere and be able to display in a different component

```jsx
// useContext: Caching response data in context
// 💯 caching in a context provider (exercise)
import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'
import {useAsync} from '../utils'

const PokemonCacheContext = React.createContext()
const usePokemonCacheContext = () => {
const context = React.useContext(PokemonCacheContext)

if (!context)
  throw new Error(
    'usePokemonCacheContext must be used within the
    PokemonCacheProvider',
  )

  return context
}

const PokemonCacheProvider = props => {
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer,   {})
  const value = [cache, dispatch]

  return <PokemonCacheContext.Provider value={value} {...props} />
}

const pokemonCacheReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return {...state, [action.pokemonName]: action.pokemonData}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const PokemonInfo = ({pokemonName}) => {
  const [cache, dispatch] = usePokemonCacheContext()
  const {data: pokemon, status, error, run, setData} = useAsync()

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})

          return pokemonData
        }),
      )
    }
  }, [cache, dispatch, pokemonName, run, setData])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

const PreviousPokemon = ({onSelect}) => {
  const [cache] = usePokemonCacheContext()
  return (
    <div>
      Previous Pokemon
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{margin: '4px auto'}}>
            <button
              style={{width: '100%'}}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const PokemonSection = ({onSelect, pokemonName}) => {
  return (
    <div style={{display: 'flex'}}>
      <PokemonCacheProvider>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info" style={{marginLeft: 10}}>
          <PokemonErrorBoundary
            onReset={() => onSelect('')}
            resetKeys={[pokemonName]}
          >
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
          </div>
      </PokemonCacheProvider>
    </div>
  )
}

const App = () => {
  const [pokemonName, setPokemonName] = React.useState(null)
  const handleSubmit = newPokemonName => {
    setPokemonName(newPokemonName)
  }
  const handleSelect = newPokemonName => {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  )
}

export default App
```

## 12/9/20

### Started and finished `useLayoutEffect`

### Exercise

- Just replace `useEffect` with `useLayoutEffect`
- [`useEffect` vs `useLayoutEffect` difference](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect)
- The main point is that when you refer to the `hooks flow` chart, the `layoutEffect` gets run BEFORE the browser paints the screen, which can cause a little bit of flash and weird UX

> _You use `useEffect` almost all of the time and you use `useLayoutEffect` IF the side effect that you are performing makes an observable changes to the DOM that will require the browser to paint that update that you've made._

### Started and finished `useImperativeHandle`

### Exercise

- Another `effect` that's not really used at all

### Completed Advanced React Hooks Workshop ️️️️️🧟‍♂️

## 12/10/20

### Started Advanced React Patterns Workshop ☄️

- Prereq: [Kent's blog post on Inversion of Control](https://kentcdodds.com/blog/inversion-of-control) and [Kent's video about implementing Inversion of Control](https://egghead.io/lessons/javascript-implement-inversion-of-control)

## 12/11/20

- Continued reading the prereq above

Typical nightmare scenarios for developers:

1. You build a reusable bit of code (a function, a React component, or React hook, etc) and share it (to co-workers or publishing it as OSS).
2. Someone approaches you with a new case that your code doesn't _quite_ support, but could with a little tweak.
3. You add an argument / prop options to your reusable code and associated logic for that use of use case to be supported.
4. Repeat steps **2** and **3** a few times (or many times 😳).
5. The reusable code is not a nightmare to use and maintain 😫

Why the scenario above becomes a nightmare:

1. 😨 Bunde size and/or performance: There's just more code for devices to run and that can impact performance in **negative** ways
2. 😖 Maintenance Overhead: Before, your reusable code only had a few options and it was focused on doing that one thing well, but not it can do a bunch of different things and you need documentation for those features. WHO'S GONNA MAINTAIN IT??
3. 🐛 Implementation Complexity: It's never just a `if` statement. Each branch of logic in your code compounds with the existing branches of logic. If the user doesn't use all of the available options, you now have to make sure the whole thing doesn't break if they selectively use the props.
4. 🤦🏽 API Complexity: Each new argument/option/prop you add to your reusable code makes it harder for end-users to use because you now have a huge README/docs site that documents all of the features and people have to learn everything available to use effectively.

Wiki definition of `Inversion of Control`

- ...in traditional programming, the custom code that expresses the purpose of the program calls into reusable libraries to take care of generic tasks, but with inversion of control, it is the framework that calls into the custom, or task-specific, code.

* AKA: Make your abstraction do less stuff and make your users do that instead.

* Example:

```jsx
// let's pretend that Array.prototype.filter does not exist function filter(array) {
  let newArray = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (element !== null && element !== undefined) {
       newArray[newArray.length] = element
    }
  }

  return newArray
}

// use case:
filter([0, 1, undefined, 2, null, 3, 'four', ''])

// [0, 1, 2, 3, 'four', '']
```

- Thoughtlessly enhanced

```jsx
function filter(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
  } = {}
) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[index];
    if (
      (filterNull && element === null) ||
      (filterUndefined && element === undefined) ||
      (filterZero && element === 0) ||
      (filterEmptyString && element === '')
    ) {
      continue;
    }
    newArray[newArray.length] = element;
  }
  return newArray;
}

filter([0, 1, undefined, 2, null, 'four', '']);
```

## 12/12/20

- Visited family so didn't have much time to study or do any sort of work
- Started implementing iPad to maximize my productivity

## 12/13/20

- Continue learning about **Inversion of Control**

Best way to inverse the control to the users instead of having one function that complies with ANY and ALL requirements

```jsx
// let's pretend that Array.prototype.filter does not exist
function filter(array, filterFn) {
    let newArray = []
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      if (filterFn(element)) {
        newArray[newArray.length] = element
      }
    }
  return newArray
}

// use case:
filter([0, 1, undefined, 2, null, 3, 'four', ''],
    el => el !== null && el !== undefined));
// [0, 1, 2, 3, 'four', '']

filter([0, 1, undefined, 2, null, 3, 'four', ''],
    el => el !== undefined);
// [0, 1, 2, null, 3, 'four', ''];

filter([0, 1, undefined, 2, null, 3, 'four', ''],
    el => el !== null);
// [0, 1, 2, undefined, 3, 'four', ''];

filter([0, 1, undefined, 2, null, 3, 'four', '',]
    el => el !== undefined &&  el !== null && el !== 0 );
// [1, 2, 3, 'four', '']

filter([0, 1, undefined, 2, null, 3, 'four', ''],
    el => el != undefined &&  el !== null && el !== '');
// [0. 1. 2. 3. 'four']
```

- If deemed necessary, you can supply a different function with whatever the users' require

```jsx
function filterWithOptions(
  array,
  {
    filterNull = true,
    filterUndefined = true,
    filterZero = false,
    filterEmptyString = false,
  } = {}
) {
  return filter(
    array,
    (element) =>
      !(
        (filterNull && element === null) ||
        (filterUndefined && element === undefined) ||
        (filterZero && element === 0) ||
        (filterEmptyString && element === '')
      )
  );
}
```

### Inversion of Control Patterns

#### 1. Compount Components

- `Compound Components` and `State Reducers` are two common patterns that are basically a form of inversion of control

Compound Components Example:

```jsx
function App() {
  return (
    <Menu
      buttonContents = {
        <>
          Actions <span aria-hidden>v</span>
        </>
      }
      items = {[
        { contents: "Download", onSelect: () => alert("download")},
        {
          contents: "Create a copy",
          onSelect: () => alert("Create a copy")
        },
        { contents: "Delete", onSelect: () =0> alert("Delete")}
      ]}
   />
)}
```

But if you needed to have line breaks, this would become very complicated for no reason. So, a better approach would be:

```jsx
function App() {
  return (
    <Menu>
      <MenuButton>
        Actions
        <span aria-hidden>v</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert('download')}>Download</MenuItem>
        <MenuItem onSelect={() => alert('Create a Copy')}>
          Create a copy
        </MenuItem>
        <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
```

#### 2. State Reducer

A good example of how to solve a problem of component logic customization:

```jsx
function stateReducer(state, changes) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        // we're fine with any changes Downshift wants to make
        // except we're going to leave isOpen and highlightedIndex as-is.
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex,
      };
    default:
      return changes;
  }
}

// then to render:
<Downshift stateReducer={stateReducer} {...restOftheProps} />;
```

## 12/24/20

Completed `Context Module Functions` & `Compound Components` 💸

I have a feeling this pattern is going to be used a lot in my work project right now. I have a bunch of `Contexts` and needed a way to manage the state better without clogging the `Provider`

The basic idea is that you extract helper functions to better manage the `Context`.

1. `useReducer` - manage the complex states and implement `dispatch` function to update the state depending on the `action.type`

2. Create a custom hook with the context so that it can be extracted from the `Provider` code and can be consumed with the `children` components

EXAMPLE: (The functions are all in one file, but would normally be separated)

```jsx
// Context Module Functions
import * as React from 'react';
import { dequal } from 'dequal';
// ./context/user-context.js
import * as userClient from '../user-client';
import { useAuth } from '../auth-context';

const UserContext = React.createContext();
UserContext.displayName = 'UserContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'start update': {
      return {
        ...state,
        user: { ...state.user, ...action.updates },
        status: 'pending',
        storedUser: state.user,
      };
    }
    case 'finish update': {
      return {
        ...state,
        user: action.updatedUser,
        status: 'resolved',
        storedUser: null,
        error: null,
      };
    }
    case 'fail update': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
        user: state.storedUser,
        storedUser: null,
      };
    }
    case 'reset': {
      return {
        ...state,
        status: null,
        error: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = React.useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  });
  const value = [state, dispatch];

  return;
  <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

// helper function
const updateUser = async (dispatch, user, updates) => {
  dispatch({ type: 'start update', updates: updates });

  try {
    const updatedUser = await userClient.updateUser(user, updates);
    dispatch({ type: 'finish update', updatedUser });

    return updatedUser;
  } catch (error) {
    dispatch({ type: 'fail update', error });
    throw error;
  }
};
export { UserProvider, useUser };

// src/screens/user-profile.js
// import {UserProvider, useUser} from './context/user-context'
const UserSettings = () => {
  const [{ user, status, error }, userDispatch] = useUser();
  const isPending = status === 'pending';
  const isRejected = status === 'rejected';
  const [formState, setFormState] = React.useState(user);
  const isChanged = !dequal(user, formState);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(userDispatch, user, formState).catch((err) => {
      // ignore the error
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }} htmlFor='username'>
          Username
        </label>
        <input
          id='username'
          name='username'
          disabled
          readOnly
          value={formState.username}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }} htmlFor='tagline'>
          Tagline
        </label>
        <input
          id='tagline'
          name='tagline'
          value={formState.tagline}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }} htmlFor='bio'>
          Biography
        </label>
        <textarea
          id='bio'
          name='bio'
          value={formState.bio}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <button
          type='button'
          onClick={() => {
            setFormState(user);
            userDispatch({ type: 'reset' });
          }}
          disabled={!isChanged || isPending}>
          Reset
        </button>
        <button
          type='submit'
          disabled={(!isChanged && !isRejected) || isPending}>
          {isPending
            ? '...'
            : isRejected
            ? '✖ Try again'
            : isChanged
            ? 'Submit'
            : '✔'}
        </button>
        {isRejected ? (
          <pre style={{ color: 'red' }}>{error.message}</pre>
        ) : null}
      </div>
    </form>
  );
};

const UserDataDisplay = () => {
  const [{ user }] = useUser();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

const App = () => {
  return (
    <div
      style={{
        height: 350,
        width: 300,
        backgroundColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        overflow: 'scroll',
      }}>
      <UserProvider>
        <UserSettings />
        <UserDataDisplay />
      </UserProvider>
    </div>
  );
};

export default App;
```

### Compound Components

- For example, one parent component has the context, and whatever child components the developer wants to add, will automatically get the `state` and `props` from the `Context Provider`

```jsx
const Toggle = ({ children }) => {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, (child) => {
    React.cloneElement(child, {
      on,
      toggle,
    });
  });
};

const App = () => {
  return (
    <div>
      <Toggle>
        <ToggleOn />
        <ToggleOff />
      </Toggle>
    </div>
  );
};
```

- The above **works** BUT: if the developer wanted to add a non-custom component like any HTML tag, it'll throw an error.
- To fix:

```jsx
// Compound Components
import * as React from 'react';
import { Switch } from '../switch';

const Toggle = ({ children }) => {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, (child) => {
    if (typeof child.type === 'string') {
      return child;
    }

    const newChild = React.cloneElement(child, {
      on,
      toggle,
    });

    return newChild;
  });
};

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({ on, children }) => (on ? children : null);

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({ on, children }) => (!on ? children : null);

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;

const App = () => {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span on='false' toggle=''>
          Hello
        </span>
        <ToggleButton />
      </Toggle>
    </div>
  );
};

export default App;
```

## 12/15/20

Completed `Flexible Compound Components` & `Prop Collections & Getters` 🕺🏽

- Can we make `Compound Components` EVEN more flexible??

* For example, what if developers wanted to add their own `evenHandlers`?

```jsx
// Flexible Compound Components
import * as React from 'react';
import { Switch } from '../switch';

const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

const Toggle = ({ onToggle, children }) => {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const value = { on, toggle };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

const useCustomContext = () => {
  const context = React.useContext(ToggleContext);
  if (context === undefined) {
    throw new Error(`useCustomContext must be used within a Provider`);
  }

  return context;
};

const ToggleOn = ({ children }) => {
  const { on } = useCustomContext();
  return on ? children : null;
};

const ToggleOff = ({ children }) => {
  const { on } = useCustomContext();
  return on ? null : children;
};

const ToggleButton = ({ ...props }) => {
  const { on, toggle } = useCustomContext();
  return <Switch on={on} onClick={toggle} {...props} />;
};

const App = () => {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  );
};

export default App;
```

### Prop Collections & Getters

- How to safely (and with flexibility) pass down props needed for each component while allowing developers to add custo props they want to also add to the components

```jsx
import * as React from 'react';
import { Switch } from '../switch';

const useToggle = () => {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const togglerProps = { 'aria-pressed': on, onClick: toggle };

  return { on, togglerProps };
};

const App = () => {
  const { on, togglerProps } = useToggle();

  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label='custom-button' {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
};

export default App;
```

## 12/16/20

### Completed State Reducer 🧹

Pretty simple exercise showing how _Inversion of Control_ works:

```jsx
// State Reducer
import * as React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach((fn) => fn?.(...args));

const toggleReducer = (state, { type, initialState }) => {
  switch (type) {
    case 'toggle': {
      return { on: !state.on };
    }
    case 'reset': {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
};

const useToggle = ({ initialOn = false, reducer = toggleReducer } = {}) => {
  const { current: initialState } = React.useRef({ on: initialOn });
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { on } = state;

  const toggle = () => dispatch({ type: 'toggle' });
  const reset = () => dispatch({ type: 'reset', initialState });

  const getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  };

  const getResetterProps = ({ onClick, ...props } = {}) => {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  };

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
};

const App = () => {
  const [timesClicked, setTimesClicked] = React.useState(0);
  const clickedTooMuch = timesClicked >= 4;

  const toggleStateReducer = (state, action) => {
    switch (action.type) {
      case 'toggle': {
        if (clickedTooMuch) {
          return { on: state.on };
        }
        return { on: !state.on };
      }
      case 'reset': {
        return { on: false };
      }
      default: {
        throw new Error(`Unsupported type: ${action.type}`);
      }
    }
  };

  const { on, getTogglerProps, getResetterProps } = useToggle({
    reducer: toggleStateReducer,
  });

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked((count) => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid='notice'>
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid='click-count'>Click count: {timesClicked}.</div>
      ) : null}
      <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
        Reset
      </button>
    </div>
  );
};

export default App;
```

## 12/17/20

Celebrated with the company on the new funding! 🍾

- FYI - with the end of the year approaching and a lot of plans being made there are gonna be a decent amount of days where I will not be able to study/update this blog.
- ALSO - started different course like `CSS GRID` by `Wes Bos` and `Javascript - Understanding the weird parts` so the blog might not be updated every day, because I might have just done exercises on the other courses.

## 12/18/20 - 12/20/20

Tomfoolery

## 12/21/20

😅 Back at it again

Started and completed Control Props - AND ADVANCED REACT PATTERNS WORKSHOP 🚀🧨 \*\*NEED REVIEW

12/22/20–12/23/20 shenanigans again

12/24/20 - not feeling well, just did a couple of CSS-Grid videos

## 12/25/20

Did a whole chunk of 📦 CSS-Grid 📦

## 12/26/20

🎨 FINISHED CSS-Grid damn 🖼

## 12/27/20

🎅 Holiday SZN SHEnanigans 🧑‍🎄

## 12/28/20

🎄 Started React Performance Workshop 🎄 (def review)

### Exercise 1:

Code Splitting

- Code Split

Using `React.lazy` to only load the code when it's needed. `React.Lazy` needs to be accompanied by `Suspense` with a `Fallback` prop to dipslay something while the `component` loads

Exercise:

```jsx
import * as React from 'react'

const Globe = React.lazy(() => import("../globe");

const App = () => {
  const [showGlobe, setShowGlobe] = React.useState(false)

  return (
    <div>
      <label>
        <input type="checkbox" checked={showGlobe} onChange={e => setShowGlobe(e.target.checked)} />
      </label>
      <div>
        <React.Suspense fallback={<div>...globe loading</div>}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  )
}
```

- Eager Loading

First Extra Credit: 🔥 eager loading

So instead of having the users wait while the lazily loaded components to load, we can eager load when we 'THiNK' the user is ready to have the component loaded. For this extra credit - we implement the lazy load on `label` so that the component loads when the user is ready to interact with the `component`.

```jsx
import * as React from 'react';

const loadGlobe = () => import('../globe');
const Globe = React.lazy(() => loadGlobe); // removes redundant code

const App = () => {
  const [showGlobe, setShowGlobe] = React.useState(false);

  return (
    <div>
      <label type='checkbox' onMouseEnter={loadGlobe} onFocus={loadGlobe}>
        <input
          type='checkbox'
          checked={showGlobe}
          onChange={(e) => setShowGlobe(e.target.checked)}
        />
      </label>
      <div>
        <React.Suspense fallback={<div>...globe loading</div>}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  );
};
```

- Webpack Magic Comments

Second Extra Credit: 💯 Webpack magic comments

Didn't know this existed but you can have the browser prefetch dynamic sources. ️🤟

You can have it prefetch on a `link` in regular `HTML` but in `React` you can use it directly on the import statement

```jsx
// regular HTML
<link rel='prefetch' as='script' href='...whatever link' />;

// React
import * as React from 'react';

const Globe = React.lazy(() => () =>
  import(/* webpackPrefetch: true */ '../globe')
);

const App = () => {
  const [showGlobe, setShowGlobe] = React.useState(false);

  return (
    <div>
      <label type='checkbox'>
        <input
          type='checkbox'
          checked={showGlobe}
          onChange={(e) => setShowGlobe(e.target.checked)}
        />
      </label>
      <div>
        <React.Suspense fallback={<div>...globe loading</div>}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  );
};
```

---

## 12/28/20

Back on my bullshiz 🤡

## 12/29/20

Started a ⌨ Typescript ⌨️ course!

So now I got Epic React Course, JavaScript - Understanding The Weird Parts, and TypeScript course going at the same time. 😅

## 12/31/20

⌚️ Started `React.memo` for Reducing re-renders ⌚️

### Exercise

This exercise was pretty simple-just had to wrap the function using `React.memo` to reduce unnecessary re-renders and view the difference in the `console`.

```jsx
// there are many different ways to wrap the function using React.memo
const Menu = React.memo(() => {}); // wrap the anonymous function
const Menu = React.memo(function Menu() {}); // wrap with the name

function Menu() {}
Menu = React.memo(Menu); // kent's preferred way
```

### Extra Credit 1: Use a custom comparator function

`React.memo` actually takes a second parameter where you can pass in a custom comparator.

So in order to check if the new value in the prop is the same as the old value in the prop to `re-render` we used this comparator.

```jsx
const Menu = React.memo(function Menu({
  itmes,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}>
          {item.name}
        </ListItem>
      ))}
    </ul>
  );
});

const ListItem = React.memo(function ListItem({
  getItemProps,
  item,
  index,
  selectedItem,
  highlightedIndex,
  ...props
}) {
  const isSelected = selectedItem?.id === item.id;
  const isHighlighted = highlightedIndex === index;

  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgrey' : 'inherit',
        },
        props,
      })}
    />
  );
});
```

## 🍸🥂🍾🎉🎊 1/1/21 HAPPY NEW YEAR!! 🍸🥂🍾🎉🎊

## 1/2/21

🍾 Finished `React.memo` for Reducing re-renders 💯

### Extra Credit 2: Pass only primitive values

The custom comparator we used in the previous extra credit is way too tedious and too much work.

We can fix that just by passing primitive values and doing the calculations a little bit above the custom they are sitting in.

Instead of conditionally rendering ON the component, we can have the conditions checked in the parent component which then would stop the unnecessary re-render without the complicated comparator function.

```jsx
const Menu = React.memo(function Menu({
  itmes,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          isSelected={selectedItem?.id === item.id}
          isHighlighted={highlightedIndex === index}>
          {item.name}
        </ListItem>
      ))}
    </ul>
  );
});

const ListItem = React.memo(function ListItem({
  getItemProps,
  item,
  index,
  isSelected,
  isHighlighted,
  ...props
}) {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgrey' : 'inherit',
        },
        props,
      })}
    />
  );
});
```

### Started 🪟 Window Large Lists with react-virtual 🪟

A common practice when you have to render a lot of items on the page is to use `virtualization` or `windowing`

Just because you have a lot of things to render to the user does not mean you have to render all of them at the same time if it's not in the visible space that the user interacts with.

## 1/3/21

### Exercise: Render Large Lists

```jsx
// ...other imports
import { useVirtual } from 'react-virtual';

// for styling
const getVirtualRowStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: size,
  transform: `translateY(${start}px)`,
};

const Menu = ({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
  listRef,
  virtualRows,
  totalHeight,
}) => {
  return (
    <ul {...getMenuProps({ ref: listRef })}>
      {/* li with an inline style for the height */}
      <li style={{ height: totalHeight }} />
      {virtualRows.map(({ index, size, start }) => {
        const item = items[index];
        return;
      })}
    </ul>
  );
};

const ListItem = ({
  getItemProps,
  item,
  index,
  isHighlighted,
  isSelected,
  style,
  ...props
}) => {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
          fontWeight: isSelected ? 'bold' : 'normal',
          ...style,
        },
        ...props,
      })}
    />
  );
};

const App = () => {
  const forceRerender = useForceRerender();
  const [inputValue, setInputValue] = React.useState('');

  const { data: items, run } = useAsync({ data: [], status: 'pending' });

  React.useEffect(() => {
    run(getItems(inputValue));
  }, [inputValue, run]);

  const listRef = React.useRef();

  // virtualization
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 10,
  });

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputvalue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(
        selectedItem ? `You selected ${selectedItem.name}` : 'Selection Cleared'
      ),
    itemToString: (item) => (item ? item.name : ''),
    // reset scrollIntoView bc we got it with react-virtual
    scrollIntoView: () => {},
    onHighlightedIndexChange: () =>
      highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
  });

  // return UI CODE
  return;
};
```

This could be used in so many of the tables we have (without paging) and the chat messages for my work project!

Instead of rendering ALL of the list items (in this example it was like 16,000+) we only render 20 `li`s and on every scroll event, it renders the elements depending on the scroll

### Finished Window Large Lists with `react-virtual`

### Started 🤔 Optimize Context Value 🤔

## 1/4/21 - 1/5/21

- Don't know what happened here, just was not feeling up to it. One of them days 🤷‍♀️

## 1/6/21

### Finished Optimize Context Value

Another useful thing about `useMemo` is that it allows you to stabilize a value so that when there's an equality comparison, we can know that the value hasn't actually changed. This can come quite handy when it comes to context value so that not every child gets re-rendered when only part of the context gets updated.

In our example, we memoized the two components that do the most work and render the UI. But we notice that even though the two components have been memoized, they re-render unnecessarily because `appState` context value changed.

```jsx
const AppStateContext = React.createContext()
const initialGrid = Array.from({length: 100}, () => Array.from({length: 100}, () => Math.random() * 100),)

const AppReducer = (state, {type, dogName}) => {
  switch (type) {
    case "TYPED_IN_DOG_INPUT": {
      return {...state, dogName}
    }
    case "UPDATE_GRID_CELL": {
      return {...state, grid: updateGridCellState(state.grid, action)}
    }
    case "UPDATE_GRID": {
      return {...state, grid: updateGridState(state.grid){
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const AppProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(appReducer, {
    dogName: "",
    grid: initialGrid
  })
  // because this value isn't memoized, so whatever changes in that
  // state, it'll cause the whole thing to re-render
  const value = [state, dispatch]

  return (
    <AppStateContext.Provider value={value}>
      {children} // re-render happens here (1)
    </AppStateContext.Provider>
  )
}

const useAppState = () => {
  const context = React.useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppProvider')
  }

  return context
}

function Grid() {
  const [, dispatch] = useAppState()
  const [rows, setRows] = useDebouncedState(50)
  const [columns, setColumns] = useDebouncedState(50)

  const updateGridData = () => dispatch({type: "UPDATE_GRID"})

  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell{
    />
  )
}
Grid = React.memo(Grid)

function Cell({row, column}) {
  const [state, dispatch] = useAppState()
  const cell = state.grid[row][column]
  const handleClick = () => dispatch({type: "UPDATE_GRID_CELL", row, column})

  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, ${cell / 100})`
      }}
    >
      {Math.floor(cell)}
   </button>
  )
}
Cell = React.memo(Cell)

const DogNameInput = () => {
  const [state, dispatch] = useAppState()
  const {dogName} = state

  const handleChange = e => {
    const newDogName = e.target.value
    dispatch({type: "TYPED_IN_DOG_INPUT", dogName: newDogName})
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>
        </div>
      ) : null}
    </form>
  )
}

const App = () => {
  const forceRerender = useForceRerender()

  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <AppProvider>
        <div>
          <DogNameInput />
          <Grid />
        </div>
      </AppProvider>
    </div>
  )
}

export default App
```

--

# Started 💯💯 Fix Perf Death by a Thousand Cuts 💯💯

## 1/7/21

### Exercise (Colocate State):

### Extra Credit 1 (Separate Contexts):

## 1/8/21 - 1/10/21

🚗 Road Trip Weekend

Took some time off!

## 1/11/21

Extra Credit 2 (Consuming Components) + Extra Credit 3 (Slice of App State):

## 1/11/21 - 1/17/21

Ok - really. Enough taking time off this course. I need to get back to it.

## 1/18/21

I only took this day off because I wanted to test my video-editing skills - to see if I still got it and apparently I do!

Going to purchase an anamorphic lens and begin making quick little Instagram videos just for fun.

## 1/19/21

Extra Credit 4 (Use Recoil): Bring in Recoil - create a custom hook to update the cell atoms using recoil, remove memoization on the components that didn't need them anymore due to recoil.

> _Always think about the abstraction you're using, don't just willy nilly apply all these complexities._

### Started 💻 Production Performance Monitoring 💻

### Exercise: Add Performance Monitoring

```jsx
import * as React from 'react';
import reportProfile from '../report-profile';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);

  return <button onClick={increment}>{count}</button>;
};

const App = () => {
  return (
    <div>
      <React.Profiler id='counter' onRender={reportProfile}>
        <div>
          Profiled counter
          <Counter />
        </div>
        <div>
          Unprofiled counter
          <Counter />
        </div>
      </React.Profiler>
    </div>
  );
};

export default App;
```

- **The start time** is when React begins rendering this update.

* ** The actual duration** is the time spent rendering the committed update.

* **The base duration** is the estimated time to render the entire subtree without memoization - this can give you an idea of some optimizations that you could potentially make.

* **The commit time** is when React actually committed the update. \*relative to start time. You can subtract the two and get an idea for that actual duration.

### Extra Credit 1: Use Trace API

```jsx
import * as React from 'react';
import { unstable_trace as trace } from 'scheduler/tracing';
import reportProfile from '../report-profile';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  // 1st arg = the name of the thing we're tracing
  // 2nd arg = when this interaction started
  // 3rd arg = callback func for the thing that we want to have happen
  const increment = trace('click', performance.now(), () =>
    setCount((c) => c + 1)
  );

  return <button onClick={increment}>{count}</button>;
};

const App = () => {
  return (
    <div>
      <React.Profiler id='counter' onRender={reportProfile}>
        <div>
          Profiled counter
          <Counter />
        </div>
        <div>
          Unprofiled counter
          <Counter />
        </div>
      </React.Profiler>
    </div>
  );
};

export default App;
```

### End of React Performance Workshop

## 1/20/21 - 1/27/21

Been updating `TIL.md` on here.

Working on other aspects of my life - but the goal is to finish testing and suspense by the end of Feb

# Started Testing React Apps

## 2/2/21

Start reading pre-requisites for testing

[JavaScript Test](https://kentcdodds.com/blog/but-really-what-is-a-javascript-test)

[JavaScript Mock](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)

### But Really, What is a JavaScript Test?

#### Example

Let's write tests for these two functions

```jsx
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { sum, subtract };
```

**Step 1**

```jsx
// basic test
const actual = true;
const expected = false;

if (actual !== expected) {
  throw new Error(`${actual} is not ${expected}`);
}
```

> A test is code that throws an error when the actual result of something does not match the expected output.

_It is alwasy easier to test 'pure functions' like the example_

> The part that says `actual !== expected` is called an 'assertion'

```jsx
// test for the functions above
const { sum, subtract } = require('./math');

let result, expected;

result = sum(3, 7);
expected = 10;

if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

result = subtract(7, 3);
expected = 4;

if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```

RESULT:

```jsx
$ node 1.js
/Users/kdodds/Desktop/js-test-example/1.js:8
  throw new Error(`${result} is not equal to ${expected}`)
  ^
Error: -4 is not equal to 10
    at Object.<anonymous> (/Users/kdodds/Desktop/js-test-example/1.js:8:9)
    at Module._compile (module.js:635:30)
    at Object.Module._extensions..js (module.js:646:10)
    at Module.load (module.js:554:32)
    at tryModuleLoad (module.js:497:12)
    at Function.Module._load (module.js:489:3)
    at Function.Module.runMain (module.js:676:10)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:608:3
```

> One of the most important parts of testing frameworks (or assertion libraries) is how helpful their error messages are.

**Step 2**

```jsx
const assert = require('assert');
const { sum, subtract } = require('./math');

let result, expected;

result = sum(3, 7);
expected = 10;
assert.strictEqual(result, expected);

result = subtract(7, 3);
expected = 4;
assert.strictEqual(result, expected);
```

RESULT:

```jsx
$ node 2.js
assert.js:42
  throw new errors.AssertionError({
  ^
AssertionError [ERR_ASSERTION]: -4 === 10
    at Object.<anonymous> (/Users/kdodds/Desktop/js-test-example/2.js:8:8)
    at Module._compile (module.js:635:30)
    at Object.Module._extensions..js (module.js:646:10)
    at Module.load (module.js:554:32)
    at tryModuleLoad (module.js:497:12)
    at Function.Module._load (module.js:489:3)
    at Function.Module.runMain (module.js:676:10)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:608:3
```

**Step 3**

```jsx
const { sum, subtract } = require('./math');

let result, expected;

result = sum(3, 7);
expected = 10;
expect(result).toBe(expected);

result = subtract(7, 3);
expected = 4;
expect(result).toBe(expected);

const expect = (actual) => {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
};
```

```jsx
$ node 3.js
/Users/kdodds/Desktop/js-test-example/3.js:17
        throw new Error(`${actual} is not equal to ${expected}`)
        ^
Error: -4 is not equal to 10
    at Object.toBe (/Users/kdodds/Desktop/js-test-example/3.js:17:15)
    at Object.<anonymous> (/Users/kdodds/Desktop/js-test-example/3.js:7:16)
    at Module._compile (module.js:635:30)
    at Object.Module._extensions..js (module.js:646:10)
    at Module.load (module.js:554:32)
    at tryModuleLoad (module.js:497:12)
    at Function.Module._load (module.js:489:3)
    at Function.Module.runMain (module.js:676:10)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:608:3
```

**Step 4**

> How would you see which function was broken?

```jsx
const { sum, subtract } = require('./math');

test('sum adds numbers', () => {
  const result = sum(3, 7);
  const expected = 10;

  expect(result).toBe(expected);
});

test('subtract subtracts numbers', () => {
  const result = subtract(7, 3);
  const expected = 4;

  expect(result).toBe(expected);
});

const test = (title, callback) => {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✕ ${title}`);
    console.error(error);
  }
};

const expect = (actual) => {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
};
```

RESULT:

```jsx
$ node 4.js
✕ sum adds numbers
Error: -4 is not equal to 10
    at Object.toBe (/Users/kdodds/Desktop/js-test-example/4.js:29:15)
    at test (/Users/kdodds/Desktop/js-test-example/4.js:6:18)
    at test (/Users/kdodds/Desktop/js-test-example/4.js:17:5)
    at Object.<anonymous> (/Users/kdodds/Desktop/js-test-example/4.js:3:1)
    at Module._compile (module.js:635:30)
    at Object.Module._extensions..js (module.js:646:10)
    at Module.load (module.js:554:32)
    at tryModuleLoad (module.js:497:12)
    at Function.Module._load (module.js:489:3)
    at Function.Module.runMain (module.js:676:10)
✓ subtract subtracts numbers
```

**Step 5**

```jsx
const { sum, subtract } = require('./math');

test('sum adds numbers', () => {
  const result = sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test('subtract subtracts numbers', () => {
  const result = subtract(7, 3);
  const expected = 4;

  expect(result).toBe(expected);
});
```

RESULT:

```jsx
$ jest
 FAIL  ./5.js
  ✕ sum adds numbers (5ms)
  ✓ subtract subtracts numbers (1ms)
● sum adds numbers
expect(received).toBe(expected)
    Expected value to be (using Object.is):
      10
    Received:
      -4
      4 |   const result = sum(3, 7)
      5 |   const expected = 10
    > 6 |   expect(result).toBe(expected)
      7 | })
      8 |
      9 | test('subtract subtracts numbers', () => {
      at Object.<anonymous>.test (5.js:6:18)
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.6s, estimated 1s
Ran all test suites.
```

### Conclusion

> JavaScript test is some code which sets up some state, performs some action, and makes an assertion on the new state.

### But Really, What is a JavaScript Mock?

**Step 0**

```jsx
import { getWinner } from './utils';

const thumbWar = (player1, player2) => {
  const numberToWin = 2;
  let player1Wins = 0;
  let player2Wins = 0;

  while (player1Wins < numberToWin && player2Wins < numberToWin) {
    const winner = getWinner(player1, player2);

    if (winne === player1) {
      player1Wins++;
    } else if (winner === player2) {
      player2Wins++;
    }
  }

  return player1Wins > player2Wins ? player1 : player2;
};

export default thumbWar;
```

We're going to pretend that the function is making a call to some third party machine learning service that has a **a testing environment we don't control and is unreliable so we want to mock it out for tests**.

> This is one of the (rare) situations where mocking is really your only choice to reliably test your code.

```jsx
// test code
import thumbwar from '../thumb-war';

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds');
  expect(['Ken Wheeler', 'Kent C. Dodds'].includes(winner)).toBe(true);
});

/*
  only assert that the winner is one of the players, and maybe that's enough. 
  But if we really want to ensure that our `thumbWar` function is integrating properly with `getWinner`, then we'll want to create a MOCK for it and asser on a real winner.
 */
```

**Step 1**

The Simplest form of mocking is _monkey-patching values_.

```jsx
import thumbWar from '../thumb-war';
import * as utils from '../utils';

test('returns winner', () => {
  const originialGetWinner = utils.getWinner;
  // eslint-disable-next-line import/namespace
  utils.getWinner = (p1, p2) => p2;

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds');
  expect(winner).toBe('Kent C. Dodds');

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner;
});
```

- Things to notice:

  1. Import the utils module as a `*` import so we have an object that we can manipulate.
  2. Store the original function at the beginning of our test and restore it at the end so other tests aren't impacted by the changes we're making to the `utils` module.

- **the actual mock**

  - `utils.getWinner = (p1, p2) => p2`

- This is monkey-patching mocking. It's effective (we're now able to ensure there's a specific winner of the thumbWar game), but there are some limitations to this.
  1. One thing that's annoying is the eslint warning, so we've disabled that (again, don't actually do this as it makes your code non-spec compliant!
  2. Again, more on this later). Also, we don't actually know for sure whether the `utils.getWinner` function was called as much as it should have been (twice, for a best 2 out of 3 game).
  3. This may or may not be important for the application, but it's important for what I'm trying to teach you so let's improve that!

**Step 2**

```jsx
import thumbWar from '../thumb-war';
import * as utils from '../utils';

test('returns winner', () => {
  const originalGetWinner = utils.getWinner;
  // eslint-disable-next-line import/namespace
  utils.getWinner = (...args) => {
    utils.getWinner.mock.calls.push(args);
    return args[1];
  };
  utils.getWinner.mock = { calls: [] };

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds');
  expect(winner).toBe('Kent C. Dodds');
  expect(utils.getWinner.mock.calls).toHaveLength(2);
  utils.getWinner.mock.calls.forEach((args) => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds']);
  });

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner;
});
```

- Two assertions
  ```jsx
  expect(utils.getWinner.mock.calls).toHaveLength(2);
  utils.getWinner.mock.calls.forEach((args) => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds']);
  });
  ```

> Now so long as our mock can model what the real world version does, we can get back a little confidence that our code is working despite having to mock out what getWinner is actually doing.

**Step 3**

```jsx
import thumbWar from '../thumb-war';
import * as utils from '../utils';

test('returns winner', () => {
  const originalGetWinner = utils.getWinner;
  // eslint-disable-next-line import/namespace
  utils.getWinner = jest.fn((p1, p2) => p2);

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds');
  expect(winner).toBe('Kent C. Dodds');
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  utils.getWinner.mock.calls.forEach((args) => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds']);
  });

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner;
});
```

- We've wrapped the mock impelentation with `jest.fn`

- This does all the same stuff, but we're using a special Jest mock function, some special assertions we can use for that purpose

**Step 4**

- Jest has a utility called `spyOn`.

```jsx
import thumbWar from '../thumb-war';
import * as utils from '../utils';

test('returns winner', () => {
  jest.spyOn(utils, 'getWinner');
  utils.getWinner.mockImplementation((p1, p2) => p2);

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds');
  expect(winner).toBe('Kent C. Dodds');

  utils.getWinner.mockRestore();
});
```

- Mock functions are also called spies (which is why the API for this is called `spyOn`). By default, Jest will keep the original implementation of `getWinner` but still keep track of how it's called.
- We don't want the original implementation to be called so we use `mockImplementation` to mock out what happens when it's called
- Then at the end we use `mockStore` to clean up after ourselves just as we were before.

**Step 5**

- Addressing eslint errors

  ```jsx
  import thumbWar from '../thumb-war';
  import * as utilsMock from '../utils';

  jest.mock('../utils', () => {
    return {
      getWinner: jest.fn((p1, p2) => p2),
    };
  });

  test('returns winner', () => {
    const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds');
    expect(utilsMock.getWinner).toHaveBeenCalledTimes(2);
    utilsMock.getWinner.mock.calls.forEach((args) => {
      expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds']);
    });
  });
  ```

**Step 6**

- If you don't want to duplicate code, you can have better file structure

  ```jsx
  other/whats-a-mock/
  ├── __mocks__
  │   └── utils.js
  ├── __tests__/
  ├── thumb-war.js
  └── utils.js
  ```

- And inside the `__mocks__/utils.js`

  ```jsx
  // __mocks__/utils.js
  export const getWinner = jest.fn((p1, p2) => p2);
  ```

- Updated Test

  ```jsx
  // __tests__/thumb-war.js
  import thumbWar from '../thumb-war';
  import * as utilsMock from '../utils';

  jest.mock('../utils');

  test('returns winner', () => {
    const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds');
    expect(winner).toBe('Kent C. Dodds');
    expect(utilsMock.getWinner).toHaveBeenCalledTimes(2);
    utilsMock.getWinner.mock.calls.forEach((args) => {
      expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds']);
    });
  });
  ```

---

## 2/9/21

## Simple Test with ReactDOM

### Intro

> "The more your tests resemble the way your software is used, the more
> confidence they can give you." -
> @kentcdodds

- Always Consider who the users are:

  1. The end user that's interacting with our code (clicking buttons/etc)
  2. The developer user that's actually using our code (rendering it, calling your functions, etc.

### Exercise 1: Render Counter Component

- In order to render a component while testing with the ReactDOM you have to render it like you did when you created the jsx element.
- You need to render the element, but also pass the second argument as a `div`, which should be inside the document body so that the user can interact with it.

  ```jsx
  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render.append(div);
  ```

### Exercise 2: Test Counter Component

- We want to test the Counter Component, and this component contains a message that we can test if the component has been rendered correctly.

  ```jsx
  // expect() is called an assertion
  // the message has to be exactly the same
  expect(message.textContent).toBe('Current count: 0'); // should pass
  ```

- You ALWAYS need to see if the test is not giving false positives by making it fail.

  ```jsx
  expect(message.textContent).toBe('Current count: 1'); // should fail
  ```

### Exercise 3: Increment and Decrement Buttons

- Here we can interact with the Counter component and make sure that the `increment` and `decrement` buttons do the right things.

  1. Grab the buttons

  ```jsx
  // grabs all the buttons in the div
  // decrement first because of the way the component is designed
  const [decrement, increment] = div.querySelectorAll('button')

  // Counter Component
  <div>
    <div> Current count: {count} </div>
    <button onClick={decrement}>Decrement</button>
    <button onClick={increment}>Increment</button>
  </div>
  ```

  2. Make assertions

  - Increment

    ```jsx
    // === assume the test has been cleared ===
    increment.click();
    expect(message.textContent).toBe('Current count: 1'); // passing

    // === assume the test has been cleared ===
    // break the assertion
    increment.click();
    expect(message.textContent).toBe('Current count: 2'); // failing
    ```

  - Decrement

    ```jsx
    // === assume the test has been cleared ===
    decrement.click();
    expect(message.textContent).toBe('Current Count: -1'); // passing

    // === assume the test has been cleared ===
    decrement.click();
    expect(message.textContent).toBe('Current Count: -2'); // failing
    ```

### Exercise 4: Cleaning up Test Environments

- Notice the assumption I had to put in there, that is a big issue when testing.
  ```jsx
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  div.remove();
  ```
- You should always keep your tests isolated to prevent problems from piling up. These issues are hard to detect and will give you mountains of headaches.
- `div.remove()` above works but what if the tests fail before removing the div?

- #### `beforeEach`
  - super handy in this case.
    ```jsx
    beforeEach(() => {
      document.body.innerHTML = '';
    });
    ```

### Extra Credit: Add use dispatchEvent

- When we're using `clickEvent` that works for this case but sometimes you need to include the `MouseOverEvent` and `clickEvent` will not suffice.
- `dispatchEvent` lets you:

  - Configure that `MouseEvent` if you want to change what button is being used to click.

- Changing `increment` and `decrement` clicks to using `dispatchEvent`

  ```jsx
  // increment
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true, // it will bubble up - react requires bubbles
    cancelable: true,
    button: 0, // left click
  });
  increment.dispatchEvent(incrementClickEvent);
  expect(message.textContent).toBe('Current count: 1');

  // decrement
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  decrement.dispatchEvent(decrementClickEvent);
  expect(message.textContent).toBe('Current count: 0');
  ```

- We have the `bubbles: true` because the button will bubble up, which is important because React uses event delegation, and a bubbling is required for event delegation to work.
- This same reason we have to append this element to the `document.body`. Otherwise, event delegation wouldn't work either.
- We configure the button to be cancelable, and also set the button to zero, which turns it into a left-click.
- We need to configure the `clickEvent` so that it bubbles so that React can take advantage of its event delegation and make it cancelable because that's how the event is going to be by default when the user clicks on the button. Setting button to zero makes it a left-click.

## 2/15/21

- Update previously completed exercises that I didn't update on here.

## Simple Test with React Testing Library

### Intro

- Kent created this library because he liked the way that teting is written where it's all implementation detail-free and it's focused on the users that are actually using our component, but didn't like the boilerplate.
- `React Testing Library` gets rid of the unnecessary boilerplate, and adds some ability to query things in the way that the user looks around for things on our page as well.

### Exercise 1: Rendering

- With `React Testing Library`'s render, you can provide your own base elements if you want to, but the library will default to a new `div`.
- The library keeps track of all the divs.
  - It will keep track of all the divs that it's creating as well as removing the divs and finally unmounting the components that were rendered.
- It cleans up for you automatically, [so no need to worry about the clean up](#beforeEach).

### Exercise 2: Firing Events

- Little background info on `act`

  - `fireEvent` is wrapped with `act()`. If you ever see an act warning, then that's something you need to deal with, but you never need to wrap a call to `fireEvent` in `act`.
  - DO NOT wrap the `fireEvent` with another `act`!!

- By using the container from using `React Testing Library`'s render, we can do the same thing when getting the buttons

  ```jsx
  const [decrement, increment] = container.querySelectorAll('button');
  const message = container.firstChild.querySelector('div');

  // instead of making a new MouseEvent, we can use fireEvent from the library to 'fire' the event.
  fireEvent.click(increment);
  expect(message.textContent).toBe('Current count: 1'); // passing

  fireEvent.click(decrement);
  expect(message.textContent).toBe('Current count: 0'); // passing
  ```

- `fireEvent` cleans up bunch of boilerplate code by not using `MouseEvent` and also has a variety of actions you can call (pretty much every event that is available to the browser you have available in here to ÷fire the different events that your components might be listening to).

### Extra Credit: Assertions

- Let's make the error messages a little bit more helpful

```jsx
// use jest DOM assertion
import '@testing-library/jest-dom';

// you can import in the file, or have a jest.config.js file

// or with CRA, you need to use the setupTests.js and import it on there globally

expect(message).toHaveTextContent('Current count: 2');
```

- The error message will now be:
  > Expected element to have text content:
  > `Current count: 2`
  > Received:
  > `Current count: 1`

## Avoid Implementation Details

### Intro

- Impelentation Details:

  - A term refering to how an abstraction accomplishes a certain outcome.
  - Basically, something that the users do not care about.

- Prerequisites

  1. [`screen`](https://testing-library.com/docs/dom-testing-library/api-queries#screen)
  2. [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
  3. [the query docs](https://testing-library.com/docs/dom-testing-library/api-queries).

  - `screen` notes

    > All of the queries exported by DOM Testing Library accept a container as the first argument. Because querying the entire document.body is very common, DOM Testing Library also exports a screen object which has every query that is pre-bound to document.body (using the within functionality). Wrappers such as React Testing Library re-export screen so you can use it the same way.

    - Example:

    ```jsx
    import { render, screen } from '@testing-library/react';
    render(
      <div>
        <label htmlFor='example'>Example</label>
        <input id='example' />
      </div>
    );
    const exampleInput = screen.getByLabelText('Example');
    ```

  - Testing Implementation Details notes:

    > Testing implementation details is a recipe for a disaster. Why is that? And what does it even mean?

    - Why is testing implementation details bad?
      1. Can break when you refactor application code. **False negatives**
      2. MAy not fail when you break application code. **False positives**

    > _To be clear, the test is: "does the software work". If the test passes, then that means the test came back "positive" (found working software). If it does not, that means the test comes back "negative" (did not find working software). The term "False" refers to when the test came back with an incorrect result, meaning the software is actually broken but the test passes (false positive) or the software is actually working but the test fails (false negative)._

    - Example:

      ```jsx
      import * as React from 'react';
      import AccordionContents from './accordion-contents';

      class Accordion extends React.Component {
        state = { openIndex: 0 };
        setOpenIndex = (openIndex) => this.setState({ openIndex });
        render() {
          const { openIndex } = this.state;

          return (
            <div>
              {this.props.items.map((item, index) => {
                <>
                  <button onClick={() => this.setOpenIndex(index)}>
                    {item.title}
                  </button>
                  {index === openIndex ? (
                    <AccordionContents>{item.contents}</AccordionContents>
                  ) : null}
                </>;
              })}
            </div>
          );
        }
      }
      ```

    - Example that tests implementation details

      ```jsx
      // __tests__/accordion.enzyme.js
      import * as React from 'react';
      // if you're wondering why not shallow,
      // then please read https://kcd.im/shallow
      import Enzyme, { mount } from 'enzyme';
      import EnzymeAdapter from 'enzyme-adapter-react-16';
      import Accordion from '../accordion';

      // Setup enzyme's react adapter
      Enzyme.configure({ adapter: new EnzymeAdapter() });

      test('setOpenIndex sets the open index state properly', () => {
        const wrapper = mount(<Accordion items={[]} />);

        expect(wrapper.state('openIndex')).toBe(0);
        wrapper.instance().setOpenIndex(1);
        expect(wrapper.state('openIndex')).toBe(1);
      });

      test('Accordion renders AccordionContents with the item contents', () => {
        const hats = { title: 'Favorite Hats', contents: 'Fedoras are classy' };
        const footware = {
          title: 'Favorite Footware',
          contents: 'Flipflops are the best',
        };
        const wrapper = mount(<Accordion items={[hats, footware]} />);
        expect(wrapper.find('AccordionContents').props().children).toBe(
          hats.contents
        );
      });
      ```

    - False negatives when refactoring

      - Why do a lot of people think UI testing is distasteful?!
        - A lot of complains are: "Every time I make a change to the code, the tests break!"
      - Real-life example (scenario)

        - Let's say I come in and I'm refactoring this accordion to prepare it to allow for multiple accordion items to be open at once. A refactor doesn't change existing behavior at all, it just changes the **implementation**. So let's change the **implementation** in a way that doesn't change the behavior.
        - Let's say that we're working on adding the ability for multiple accordion elements to be opened at once, so we're changing our internal state from openIndex to `openIndexes`:

        ```jsx
        class Accordion extends React.Component {
        - state = {openIndex: 0}
        - setOpenIndex = openIndex => this.setState({openIndex})

        * state = {openIndexes: [0]}
        * setOpenIndex = openIndex => this.setState({openIndexes: [openIndex]})
          render() {

        - const {openIndex} = this.state
        * const {openIndexes} = this.state

        return (
          <div>
            {this.props.items.map((item, index) => (
              <>
                <button onClick={() => this.setOpenIndex(index)}>
                  {item.title}
                </button>

        -            {index === openIndex ? (

        *            {openIndexes.includes(index) ? (
                        <AccordionContents>{item.contents}</AccordionContents>
                      ) : null}
                    </>
                  ))}
                </div>
              )
          }
        }
        ```

        - error message

        ```
        expect(received).toBe(expected)
        Expected value to be (using ===):
          0
        Received:
        undefined
        ```

        > Test failing when the component works fine - false negative. Tests which test implementation details can give you a false negative when you refactor your code. This leads to brittle and frustrating tests that seem to break anytime you so much as look at the code.

    - False positives
      > false positive: we didn't get a test failure, but we should have! We need to add another test to verify clicking the button updates the state correctly. And then I need to add a coverage threshold of 100% code coverage so we don't make this mistake again.
    - The best way to prevent all these is to write tests that are implementation detail free

      - Example that solves all the issues above:

        ```jsx
        // __tests__/accordion.rtl.js
        import '@testing-library/jest-dom/extend-expect';
        import * as React from 'react';
        import { render, screen } from '@testing-library/react';
        import userEvent from '@testing-library/user-event';
        import Accordion from '../accordion';

        test('can open accordion items to see the contents', () => {
          const hats = {
            title: 'Favorite Hats',
            contents: 'Fedoras are classy',
          };
          const footware = {
            title: 'Favorite Footware',
            contents: 'Flipflops are the best',
          };
          render(<Accordion items={[hats, footware]} />);

          expect(screen.getByText(hats.contents)).toBeInTheDocument();
          expect(screen.queryByText(footware.contents)).not.toBeInTheDocument();

          userEvent.click(screen.getByText(footware.title));

          expect(screen.getByText(footware.contents)).toBeInTheDocument();
          expect(screen.queryByText(hats.contents)).not.toBeInTheDocument();
        });
        ```

    - Implementation Detail:

      > _Implementation details are things which users of your code will not typically use, see, or even know about._

      - flow
        1. Who is the user of this code?
           a. end-users
           b. developers
           **End-users and developers are the two 'users' that our application code needs to consider.**

    - Problem with hooks

      - `Enzyme` has a lot of issues with hooks still.
      - So use `React Testing Library`! lol

    - Conclusion:
      - How to avoid testing implementati on details
        1. Use the right tool to start.
        2. Follow this process.
        - What part of your untested codebase would be really bad if it broke? (The checkout process)
        - Try to narrow it down to a unit or a few units of code (When clicking the
          'checkout' button a request with the cart items is sent to / checkout)
        - Look at that code and consider who the 'users' are (The developer rendering the checkout form, the end user clicking on the button)
        - Write down a list of instructions for that user to manually test that code to make sure it's not broken. (render the form with some fake data in the cart, click the checkout button, a fake successful response, make sure the success message is displayed).
        - Turn that list of instructions into an automated test.

  - the query docs notes

    #### Queries are the method that `Testing Library` gives you to find elements on the page.

    ***

    - There are several types of queries
      1. get
      2. find
      3. query
    - The difference between them is whether the query will throw an error if no element is found or if it will return a Promise and retry.

    #### After selecting an element, you can use the `Events API` or `user-event` to fire events and simulate user interactions with the page, or use Jest and `jest-dom` to make assertions about the element.

    #### Action APIs like `waitFor` or `findBy` can be used to await the change in the DOM.

    ***

    - Example

      ```jsx
      import { screen } from '@testing-library/react';

      test('should show login form', () => {
        render(<Login />);
        const input = screen.getByLabelText('Username');
        // Events and assertions
      });
      ```

    #### Types of queries

    ***

    - | Types of query        | 0 Matches     | 1 Match        | >1 Matches   | Retry (Async/Await) |
      | --------------------- | ------------- | -------------- | ------------ | ------------------- |
      | **Single Element**    | &#xfeff;      | &#xfeff;       | &#xfeff;     | &#xfeff;            |
      | `getBy...`            | throw error   | return element | throw error  | no                  |
      | `queryBy...`          | return `null` | return element | throw error  | no                  |
      | `findBy...`           | throw error   | return element | throw error  | yes                 |
      | **Multiple Elements** | &#xfeff;      | &#xfeff;       | &#xfeff;     | &#xfeff;            |
      | `getAllBy...`         | throw         | return array   | return array | no                  |
      | `queryAllBy...`       | return `[]`   | return array   | return array | no                  |
      | `findAllBy...`        | throw         | return array   | return array | yes                 |

    #### Priority

    ***

    1. **Queries Accessible to Everyone** queries that reflect the experience of visual / mouse users as well as those that use assistive technology
       - `getByRole`: This can be used to query _every_ element that is exposed in the `accessibility tree`.
         With the `name` option you can filter the returned elements by their `accessible name`. This should be your **top** preference for just about everything. There's not much you can't get with this (if you can't, it's possible your UI is inaccessible). Most often, this will be used with the `name` option like so: `getByRole('button', {name: /submit/i})`.
       - `getByLabelText`: Only really good for _form fields_, but this is the number one method a user finds those elements, so it shoud be your **top** preference.
       - `getByPlaceholderText`: **A placeholder is not a substitue for a label.** But if that's all you have, then it's better than alternatives.
       - `getByText`: Not useful for forms, but this is the number 1 method a user finds most non-interactive elements (like divs and spans).
       - `getByDisplayValue`: The current value of a form element can be useful when navigating a page with filled-in values.
    2. **Semantic Queries** HTML5 and ARIA compliant selectors. Note that the user experience of interacting with these attributes varies greatly across browsers and assistive technology.
       - `getByAltText`: If your element is one which supports `alt` text (`img`, `area`, and `input`), then you can use this to find that element.
       - `getByTitle`: The title attribute is not consistently read by screenreaers, and is not visible by default for sighted users
    3. Test IDs
       - `getByTestId`: The user cannot see (or hear) these, so this is only recommended for cases where you can't match by role or text or it doesn't make sense (e.g. the text is dynamic).

    #### Using Queries

    ***

    > The base queries from DOM Testing Library require you to pass a `container` as the first argument. Most framework-implementations of Testing Library provide a pre-bound version of these queries when you render your components with them which means you do not have to provide a container. In addition, if you just want to query `document.body` then you can use the `screen` export as demonstrated below (using `screen` is recommended).

    - The primary argument to a query can be a _string_, _regular expression_, or _function_. There are also options to adjust how node text is pased.
    - Example:

      ```html
      <body>
        <div id="app">
          <label for="username-input">Username</label>
          <input id="username-input" />
        </div>
      </body>
      ```

      ```jsx
      import { screen, getByLabelText } from '@testing-library/dom';

      // With screen:
      const inputNode1 = screen.getByLabelText('Username');

      // Without screen, you need to provide a container:
      const container = document.querySelector('#app');
      const inputNode2 = getByLabelText(container, 'Username');
      ```

      ##### `screen`

      ***

      > All of the queries exported by DOM Testing Library accept a `container` as the first argument. Because querying the entire `document.body` is very common, DOM Testing Library also exports a `screen` object which has every query that is pre-bound to `document.body` (using the `within` functionality). Wrappers such as React Testing Library re-export `screen` so you can use it the same way.

    #### `TextMatch`

    ***

    > Most of the query APIs take a `TextMatch` as an argument, which means the argument can be either a _string_, _regex_, or a function which returns `true` for a match and `false` for a mismatch.

    - Example:

      ```html
      <div>Hello World</div>
      ```

      - _will_ find the div:

        ```jsx
        // matching a string:
        screen.getByText('Hello World'); // full string match
        screen.getByText('llo Worl', { exact: false }); // substring match
        screen.getByText('hello world', { exact: false }); // ignore case

        // matching a regex:
        screen.getByText(/World/); // substring match
        screen.getByText(/world/i); // substring match, ignore case
        screen.getByText(/^hello world$/i); // full string match, ignore case
        screen.getByText(/Hello W?oRlD/i); // substring match, ignore case, searches for "hello world" or "hello orld"

        // Matching with a custom function:
        screen.getByText((content, element) => content.startsWith('Hello'));
        ```

      - _will_ not find the div:

        ```jsx
        // full string does not match
        screen.getByText('Goodbye World');

        // case-sensitive regex with different case
        screen.getByText(/hello world/);

        // function looking for a span when it's actually a div:
        screen.getByText((content, element) => {
          return (
            element.tagName.toLowerCase() === 'span' &&
            content.startsWith('Hello')
          );
        });
        ```

    - Precision
      - Queries that take a `TextMatch` also accept an object as the final argument that can contain options that affect the precision of string matching:
        1. `exact` has no effect on `regex` or `function` arguments.
        2. In most cases using a regex instead of a string gives you more control over fuzzy matching and should be preferred over `{ exact: false }
      - `normalizer`: An optional function which overrides normalization behavior.
    - Normalization

      - Before running any matching logic against text in the DOM, the `library` automatically normalizes the text.
      - By default, normalization consists of
        1. trimming whitespace from the start
        2. trimming whitespace from the end of the text
        3. collapsing multiple adjacent whitespace characters into a single space
      - `getDefaultNormalizer`: takes an options object which allows the selection of behavior:
        1. `trim`: Defaults to `true`. Trims leading and trailing whitespace
        2. `collapseWhitespace`: Defaults to `true`. Collapses inner whitespace (newlines, tabs, repeated spaces) into a single space.
      - example:

        ```jsx
        // to perform a match without trimming:
        screen.getByText('text', {
          normalizer: getDefaultNormalizer({ trim: false }),
        });

        // to override normalization to remove some Unicode characters whilst keeping some (but not all) of the built-in normalization behavior:
        screen.getByText('text', {
          normalizer: (str) => getDefaultNormalizer({ trim: false }),
        });
        ```

    - Debugging

      - You can debug what the screen exposes by using `screen.debug()`
      - Basically a shortcut for `console.log(prettyDOM())`
        - Supports debugging the document, a single element, or an array of elements
      - Example:

        ```jsx
        import { screen } from '@testing-library/dom';

        document.body.innerHTML = `
        <button>test</button>
        <span>multi-test</span>
        <div>multi-test</div>
        `;

        // debug document
        screen.debug();
        // debug single element
        screen.debug(screen.getByText('test'));
        // debug multiple elements
        screen.debug(screen.getAllByText('multi-test'));
        ```

### Exercise 1: Screen Utility

- Your tests should be resilient to changes to the code base experiences over time.
- We want to not only test the users, but we want to test the elements using the `Accessibility` tool to get grab what the screen readers see.

  ```jsx
  const decrement = screen.getByRole('button', { name: /decrement/i }); // ignore case
  const increment = screen.getByRole('button', { name: /increment/i }); // ignore case

  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent('Current count: 0');
  fireEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  fireEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
  ```

### Exercise 2: Browser Interactions

- If the user uses `onMouseDown` and or `onMouseUp`, the component works fine but the test will fail.
- To correct this issue, instead of only firing the click event with `fireEvent`, use `userEvent`

  - userEvent fires a bunch of different events that is associated with the typical user event

    ```jsx
    const decrement = screen.getByRole('button', { name: /decrement/i }); // ignore case
    const increment = screen.getByRole('button', { name: /increment/i }); // ignore case

    const message = screen.getByText(/current count/i);

    expect(message).toHaveTextContent('Current count: 0');
    userEvent.click(increment);
    expect(message).toHaveTextContent('Current count: 1');
    userEvent.click(decrement);
    expect(message).toHaveTextContent('Current count: 0');
    ```

## Form Testing

### Exercise 1: Testing a Login Form

- Created a function that assigns `submittedData` from the test to `mock` form submit
  - Created a variable called `submittedData` to hold the values when testing form submit.
- Grab the input fields by using `getByLabelText` and making sure that the cases are ignored to increase flexibility
- Grab the button by using `getByRole` to allow `screen readers` to grab the same button with the name of `submit` with case ignored again.
- Use `userEvent` to simulate typing and clicking.

  ```jsx
  test('submitting the form calls onSubmit with username and password', () => {
    // 🐨 create a variable called "submittedData" and a handleSubmit function that
    // accepts the data and assigns submittedData to the data that was submitted
    // 💰 if you need a hand, here's what the handleSubmit function should do:
    // const handleSubmit = data => (submittedData = data)
    let submittedData = {};
    const handleSubmit = (data) => (submittedData = data);

    // 🐨 render the login with your handleSubmit function as the onSubmit prop
    render(<Login onSubmit={handleSubmit} />);
    // screen.debug()

    // 🐨 get the username and password fields via `getByLabelText`
    const username = 'doinglab';
    const password = 'doing1011';

    // 🐨 use userEvent.type to change the username and password fields to
    //    whatever you want
    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);

    // 🐨 click on the button with the text "Submit"
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    // assert that submittedData is correct
    // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
    expect(submittedData).toEqual({ username, password });
  });
  ```

### Extra Credit 1: Use a Jest Mock Function

- Jest actually provides a `mock` function because testing functions like the `handleSubmit` are so common.

  ```jsx
  test('submitting the form calls onSubmit with username and password', () => {
    const handleSubmit = jest.fn();

    render(<Login onSubmit={handleSubmit} />);

    const username = 'doinglab';
    const password = 'doing1011';

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({ username, password });
  });
  ```

### Extra Credit 2: Generate Test Data

- instead of creating constants for `username` and `password` for every test, use a library like `faker` to generate so you don't have to spend unnecessary time worrying about minor stuff like that.

  ```jsx
  test('submitting the form calls onSubmit with username and password', () => {
    const handleSubmit = jest.fn();

    const buildLoginForm = () => {
      return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
    };

    const { username, password } = buildLoginForm();

    render(<Login onSubmit={handleSubmit} />);

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({ username, password });
  });
  ```

### Extra Credit 3: Allow for Overrides

- unlike above, sometimes you do need the data to be specific for the test.
- so when it needs to be specific, it's generally a good idea to allow for overrides.

  ```jsx
  test('submitting the form calls onSubmit with username and password', () => {
    const handleSubmit = jest.fn();

    const buildLoginForm = (overrides) => {
      return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        ...overrides,
      };
    };

    const { username, password } = buildLoginForm({ password: 'doing1011' });

    render(<Login onSubmit={handleSubmit} />);

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({ username, password });
  });
  ```

### Extra Credit 4: use Test DataBot

- When your object factories get really complicated, it's hard to manage them.
- There is a module that helps with all the object fields, overrides, etc.
- So let's migrate the `buildLoginForm` function to use this module to handle objects for the tests.

  ```jsx
  // the fake function gets called every time we want to build the objects, so the value will be different from other login form
  const buildLoginForm = build({
    fields: {
      username: fake((f) => f.internet.userName()),
      password: fake((f) => f.internet.password()),
    },
  });
  ```

## Mocking HTTP Requests

### Intro

- Most web applications need to interact with some back-end to be at all useful. It's going to do that using HTTP requests.
- You want to mock those out because the unit and integration tests aren't the place to be making those actual requests. You'll be doing that in your end-to-end tests.

### Exercise 1: Mock Service Worker

- we use `{rest}` and `{setupServer} from the `msw` module
- we setup server and the route its going to use, and for this exercise it was a post for a login
  ```jsx
  const server = setupServer(
    rest.post(endpoint, async (req, res, ctx) => {
      // we tell `setupServer` what to expect
      // we convert the context to json bcause we're using `fetch`
      return res(ctx.json({ username: req.body.username }));
    })
  );
  ```
- we need to listen to the server before all the tests, and close the server after all tests
  ```jsx
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  ```
- we wait for the spinner (loading) to go away to see if the test passes, in order to do that we need to use `waitForElementToBeRemoved` from `@testing-library/react`
  ```jsx
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  ```
- assertion

  ```jsx
  expect(screen.getByText(username)).toBeInTheDocument();
  ```

- final code

  ```jsx
  import * as React from 'react';
  import {
    render,
    screen,
    waitForElementToBeRemoved,
  } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { build, fake } from '@jackfranklin/test-data-bot';

  import { rest } from 'msw';
  import { setupServer } from 'msw/node';
  import Login from '../../components/login-submission';

  const buildLoginForm = build({
    fields: {
      username: fake((f) => f.internet.userName()),
      password: fake((f) => f.internet.password()),
    },
  });

  const server = setupServer(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.json({ username: req.body.username }));
      }
    )
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test(`logging in displays the user's username`, async () => {
    render(<Login />);
    const { username, password } = buildLoginForm();

    userEvent.type(screen.getByLabelText(/username/i), username);
    userEvent.type(screen.getByLabelText(/password/i), password);

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByText(username)).toBeInTheDocument();
  });
  ```

### Exercise 2: Mocked Responses

- It's really important that you simulate the exact behavior of your backend with the server handlers.
- So you make it as ROBUST as possible.
- One thing that the backend does is to send a 400 response if a required username or password is not provided.

### server handler

```jsx
const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({ message: 'password required' }));
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({ message: 'username required' }));
      }
      return res(ctx.json({ username: req.body.username }));
    }
  )
);
```

- this mock resembles the backend more closely = more confidence

### Extra Credit 1: Reuse Server Request

- we can use [server handlers](#server-handler) in both the development environment in the browser, as well as the test environment in node.
- So we can import the handlers from `server-handlers.js`

  ```jsx
  import { handlers } from 'test/server-handlers';

  const server = setupServer(...handlers);

  // passes as usual
  ```

### Extra Credit 2: Unhappy Path

- we want to test when the user provides a username but not a password
- because we have the server handlers setup, we don't need to do any extra configuration steps in order to do this.
  - when the password is not supplied, the server-handler provides an error message that we can use for our test
- We just give the login form with username only and we assert that the error message of `password required` will be shown on the ui.

```jsx
test('omitting the password results in an error', async () => {
  render(<Login />);

  const { username } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // no password

  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  screen.debug();

  expect(screen.getByRole('alert')).toHaveTextContent('password required');
});
```

### Extra Credit 3: Use Inline Snapshots

- holy hell SUUUPER cool
- you can use inline snapshots to match whatever the component is rendering.
- In our case, we just want the textContent so we create / update snapshot to only match the text content.
  ```jsx
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`
  );
  ```

### Extra Credit 4: Use One-Off Server Handlers

- variables always preferred over inline snapshots
- add an `afterEach` to reset all the handlers, so that all the handlers are specific and colocated to a test.
- add a runtime handler to override the login API request
- assign the error message to a variable so that we don't base it off of snapshot.
- we wait for the loading to happen after we click the button, and expect the alert to have the same error message that came back from the API response.

  ```jsx
  test('omitting the password results in an error', async () => {
    render(<Login />);

    const { username } = buildLoginForm();

    userEvent.type(screen.getByLabelText(/username/i), username);
    // no password

    userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    // expect(screen.getByRole('alert')).toHaveTextContent('password required')

    // use inline snapshots
    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
      `"password required"`
    );
  });

  // one-off server handlers
  test('unknown server error displays the error message', async () => {
    const errorMessage = 'something is wrong';

    server.use(
      rest.post(
        'https://auth-provider.example.com/api/login',
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: errorMessage }));
        }
      )
    );

    render(<Login />);
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });
  ```

## Mocking Browser APIs and Modules

### Intro

- Sometimes you have code that you don't want to have run, or maybe you have code that won't run in the specific environment that you're testing in.
- we're currently running a simulated browser in `Node` using a module called `jsdom`. Sometimes you just have to fake out things that can't be done even with `jsdom`.
  - `matchMedia`
    - supported on Windows, not supported in `jsdom`
    - need to include a polyfill
    - monkey-patch-resize on Windows to test things out that rely on `matchMedia`.
- Another reason to mock things out
  - if a module is doing something that you don't want it to do for your test

#### prerequisite readings

1. [The Merits of Mocking](https://kentcdodds.com/blog/the-merits-of-mocking)

   - > the more your tests resemble the way your software is used, the more confidence they can give you. -Kent C. Dodds
   - > One of the biggest challenges people face with testing is knowing what to test. there are lots of reasons for that, but one big, flashing-lights reason is mocking. Many people don't know when to add a mock version of code or have their test run the actual code directly.

   1. Mocking lets you fake it so you _can_ make it
      - a good example would be testing out the checkout process without having to actually use the credit card
   2. Mocking servers the real-world connection between what you're testing and what you're mocking
      - Even if we have a perfectly passing test, this still doesn't guarantee when in production.
   3. When you mock something, you're making a trade-off.
      - You're trading confidence for something else. The test would be messy without mocking for example, the credit card process.
   4. In my UI unit and integration tests, I have a rule.
      - Never make actual network calls - mock the server response by mocking the module responsible for making the network calls.
      - Also mock animation libraries to avoid waiting for animations before elements are removed from the page.
      - For E2E tests, avoid mocking anything (with the exception of the backend hitting fake or test services and not actual credit card services, for exxample)
   5. Saving a few milliseconds per test?
      - NOT a good reason to mock.
      - Picking shallow rendering because it's faster by a couple milliseconds is not a good tradeoff.
      - The less you mock, the fewer tests you need, and trading confidence for a minute or two faster test suite is a BAD trade.
   6. There's a time and a place for mocking.

      - When you NEED to mock, Jest makes it easy with some mocking utilities.
      - For example:

        ```jsx
          function (fn(impl = () => {}) {
            const mockFn = (...args) => {
              mockFn.mock.calls.push(args)
              return impl(...args)
            }

            mockFn.mock = {calls: []}
            return mockFn
          }

          const utilsPath = require.resolve('../utils')
          require.cache[utilsPath] = {
            id: utilsPath,
            filename: utilsPath,
            loaded: true,
            exports: {
              getWinner: fn((p1, p2) => p1)
            }
          }
        ```

### Exercise 1: Mock Geolocation

- steps

  1. render the component
  2. we'll get a loading state
     - create an assertion
     ```jsx
     expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
     ```
  3. mock the function that the library uses

     - in our case `getCurrentPosition()`
     - Then we can call `mockImplemntation()`

     ```jsx
     beforeAll(() => {
       window.navigator.geolocation = {
         getCurrentPosition: jest.fn(),
       };
     });

     // test code...
     const fakePosition = {
       coords: {
         latitude: 35,
         longitude: 139,
       },
     };

     window.navigator.geolocation.getCurrentPosition.mockImplementation(
       (callback) => {
         promise.then(() => callback(fakePosition));
       }
     );
     ```

  4. using the `deferred` utils Kent gave us, we can run the callback function and implicitly resolve and wait for promise before inserting more assertions

  - full test code

    ```jsx
    import * as React from 'react';
    import { render, screen, act } from '@testing-library/react';
    import Location from '../../examples/location';

    beforeAll(() => {
      window.navigator.geolocation = {
        getCurrentPosition: jest.fn(), // mock it with jest function
      };
    });

    function deferred() {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    }

    test('displays the users current location', async () => {
      const fakePosition = {
        coords: {
          latitude: 35,
          longitude: 139,
        },
      };

      const { promise, resolve } = deferred();

      // we call this because we mocked the function
      window.navigator.geolocation.getCurrentPosition.mockImplementation(
        (callback) => {
          promise.then(() => callback(fakePosition));
        }
      );

      render(<Location />);
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

      resolve();
      await promise;

      expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
      expect(screen.getByText(/latitude/i)).toHaveTextContent(
        `Latitude: ${fakePosition.coords.latitude}`
      );
      expect(screen.getByText(/longitude/i)).toHaveTextContent(
        `Longitude: ${fakePosition.coords.longitude}`
      );

      screen.debug();
    });
    ```

### Exercise 2: Act Function

- the test above gives an error stating `An update to Location inside a test was not wrapped in act(...)`
- What's happening
  - When the callback is called, it also calls a state update function within a third-party component that triggers an update to the state. (Which react wasn't expecting)
  - We also need to make sure that all of the side effects that are triggered as a result of that state update are flushed before we continue on with our test BECAUSE:
    - there could be a slight period of time when the DOM is updated, and our side effects are all run that is imperceptible to the user, but is perceptible to the tests
- We want to make sure we only test the things that the user sees and interacts with.
- Act flushes all the side effects after the callback is run.
  ```jsx
    // ... same code as above
    await act(sync () => {
      resolve()
      await promise
    })
  ```

### Extra Credit 1: Mock the module

- We can also just mock the third-party module that's interacting with geolocation
- in our case, we use `useCurrentPosition` imported from `react-use-geolocation`
- we can implement our own `useCurrentPosition` using `jest`
  ```jsx
  // jest looks through all exports and when it finds the function it will mock it automatically for us
  jest.mock('react-use-geolocation');
  ```
- mock the `useCurrentPosition` hook.
  - we bring in the `useCurrentPosition` function so that `Jest` can mock the function.
  - then call `mockImplementation()` and then provide our own hook
  - our own `use current position` mock
    ```jsx
    let setReturnValue;
    const useMockCurrentPosition = () => {
      const state = React.useState([]);
      setReturnedValue = state[1];
      return state[0];
    };
    ```
- We need to wrap the state updater function with `act` to make sure that React flushes all of the side effects

  - final code

    ```jsx
    import * as React from 'react';
    import { render, screen, act } from '@testing-library/react';
    import Location from '../../examples/location';
    import { useCurrentPosition } from 'react-use-geolocation';

    jest.mock('react-use-geolocation');

    test('displays the users current location', async () => {
      const fakePosition = {
        coords: {
          latitude: 35,
          longitude: 139,
        },
      };

      let setReturnValue;
      const useMockCurrentPosition = () => {
        const state = React.useState([]);
        setReturnValue = state[1];
        return state[0];
      };

      useCurrentPosition.mockImplementation(useMockCurrentPosition);

      render(<Location />);
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

      act(() => {
        setReturnValue([fakePosition]);
      });

      expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
      expect(screen.getByText(/latitude/i)).toHaveTextContent(
        `Latitude: ${fakePosition.coords.latitude}`
      );
      expect(screen.getByText(/longitude/i)).toHaveTextContent(
        `Longitude: ${fakePosition.coords.longitude}`
      );
    });
    ```

## Context and Custom Render Method

### Intro

- how to deal with components that consume context and how we can test those components that are consuming that context.
- prerequisites

  - [wrapper reading](https://testing-library.com/docs/react-testing-library/api#wrapper)

    - notes

      - You pass a react component as the `wrapper` option to have it rendered around the inner element
      - Most useful when creating reusable custom render functions for common data providers
      - to better test the component that's doing the prop updating to ensure the props are being correctly.

      ```jsx
      import { render } from '@testing-library/react';

      const { rerender } = render(<NumberDisplay number={1} />);

      // re-render the same component with different props
      rerender(<NumberDisplay number={2} />);
      ```

  - [rerender reading](https://testing-library.com/docs/react-testing-library/setup)

    - notes

      - It's often useful to define a custom render method that includes things like global context providers, data stores, etc.
      - To make this available globally, one approach is to define a utility file that re-exports everything from `React Testing Library`.

      ```jsx
      import React from 'react';
      import { render } from '@testing-library/react';
      import { ThemeProvider } from 'my-ui-lib';
      import { TranslationProvider } from 'my-i18n-lib';
      import defaultStrings from 'i18n/en-x-default';

      const AllTheProviders = ({ children }) => {
        return (
          <ThemeProvider theme='light'>
            <TranslationProvider messages={defaultStrings}>
              {children}
            </TranslationProvider>
          </ThemeProvider>
        );
      };

      const customRender = (ui, options) =>
        render(ui, { wrapper: AllTheProviders, ...options });

      // re-export everything
      export * from '@testing-library/react';

      // override render method
      export { customRender as render };
      ```

### Exercise 1: Wrapper Component

- If your component is wrapped inside a Context, you need to include that when rendering
  ```jsx
  render(
    <ThemeProvider>
      <EasyButton>Easy</EasyButton>
    </ThemeProvider>
  );
  ```
- But instead of wrapping that we can use a `wrapper` function to achieve the same thing

  ```jsx
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme='light'>{children}</ThemeProvider>
  );

  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper });

  const Button = screen.getByRole('button', { name: /easy/i });
  expect(button).toHaveStyle(`background-color: white; color: black;`);
  ```

### Extra Credit 1: Dark Theme

- Same thing except swap the `white` and `black`
  ```jsx
  test('renders with the dark styles for the dark theme', () => {
    const Wrapper = ({ children }) => (
      <ThemeProvider initialTheme='dark'>{children}</ThemeProvider>
    );
    // 🐨 uncomment all of this code and your test will be busted on the next line:
    render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper });
    const button = screen.getByRole('button', { name: /easy/i });
    expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `);
  });
  ```

### Extra Credit 2: Render Method

- Get rid of the duplicate and create a special function called `renderWithTheme` and encapsulate the duplication

  - We take some duplication, put it into a function, then genericize it so that it could be used as a function that we could call anytime we want to render something with the `ThemeProvider`

  ```jsx
  const renderWithTheme = (ui, { theme = 'light', ...options } = {}) => {
    const Wrapper = ({ children }) => (
      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    );
    return render(ui, { wrapper: Wrapper, ...options });
  };
  ```

- final test code

  ```jsx
  import * as React from 'react';
  import { render, screen } from '@testing-library/react';
  import { ThemeProvider } from '../../components/theme';
  import EasyButton from '../../components/easy-button';

  // basically like render but has more options and ability to configure default wrapper
  const renderWithTheme = (ui, { theme = 'light', ...options } = {}) => {
    const Wrapper = ({ children }) => (
      <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
    );
    return render(ui, { wrapper: Wrapper, ...options });
  };

  test('renders with the light styles for the light theme', () => {
    renderWithTheme(<EasyButton>Easy</EasyButton>);
    const button = screen.getByRole('button', { name: /easy/i });
    expect(button).toHaveStyle(`
      background-color: white;
      color: black;
    `);
  });

  /* eslint no-unused-vars:0 */

  test('renders with the dark styles for the dark theme', () => {
    renderWithTheme(<EasyButton>Easy</EasyButton>, { theme: 'dark' });
    const button = screen.getByRole('button', { name: /easy/i });
    expect(button).toHaveStyle(`
      background-color: black;
      color: white;
    `);
  });
  ```

### Extra Credit 3: App Test Utils

- Swap the `@testing-library/react` with our own `app-test-utils`.
- Kent suggests that your tests should not be importing `@testing-library/react`.
- Make a module that imports `render` from `React Testing Library`'s `render`. Then create your own render and re-export everything from `React Testing Library` - which then can be kind of your own version of `React Testing Library`
  - It overrides the export for `render`, so that when you import `render`, you're importing this render function, which does call the `React Testing Library` render but it also provides a wrapper so that all of your context providers will be accessible to any component that you render with this function
- Also, if you configure jest config correctly you can have jest figure out that all the files are coming from the `src` directory you don't need to use backticks to find the directory, etc.
- final test code:

  ```jsx
  import * as React from 'react';
  import { render, screen } from 'test/test-utils';
  import EasyButton from 'components/easy-button';

  test('renders with the light styles for the light theme', () => {
    render(<EasyButton>Easy</EasyButton>);
    const button = screen.getByRole('button', { name: /easy/i });
    expect(button).toHaveStyle(`
      background-color: white;
      color: black;
    `);
  });

  /* eslint no-unused-vars:0 */

  test('renders with the dark styles for the dark theme', () => {
    render(<EasyButton>Easy</EasyButton>, { theme: 'dark' });
    const button = screen.getByRole('button', { name: /easy/i });
    expect(button).toHaveStyle(`
      background-color: black;
      color: white;
    `);
  });
  ```

## Testing Custom Hooks

### Intro

- Testing custom hooks is something you probably shouldn't do.
- Because your custom hooks will most likely be used by one, maybe two components, you should just test those components which then your hook is going to be tested as an implementation detail of those things.

### Exercise 1: Test Functionality of Custom Hook

- since your custom hooks are used in a component, that's exactly how it should be tested.
- The easiest and the most straightforward way to test a custom hook is to create a component that uses it and then test that component instead.

### Extra Credit 1: Fake Component

### 2/22/21

- Instead of re-creating the component that uses custom hooks to test (because things can get messy real quick), we can make a function test component
  ```jsx
  let result;
  const TestComponent = () => {
    result = useCounter(); // custom hook
    return null; // need to return to make it a valid component
  };
  ```
- because it returns `null` aka nothing, we can't get anything from the screen but we do have access to all the methods and the state in the result object.
- test

  ```jsx
  let result;
  const TestComponent = () => {
    result = useCounter();
    return null;
  };
  render(<TestComponent />);
  console.log(result);
  expect(result.count).toBe(0);

  result.increment();
  expect(result.count).toBe(1);

  result.decrement();
  expect(result.count).toBe(0);
  ```

  - the test will pass but the code `result.increment()` and `result.decrement()` will issue an error sayinig that these need to be wrapped in `act` because of the cleanup.
  - We didn't need this previously because `userEvent` automatically wraps it in `act` but since we're calling this ourselves we need to wrap it to cleanp properly after the state updates.

- final test

  ```jsx
  test('exposes the count and increment/decrement function (hooks)', () => {
    let result;
    const TestComponent = () => {
      result = useCounter();
      return null;
    };
    render(<TestComponent />);
    console.log(result);
    expect(result.count).toBe(0);

    act(() => result.increment());
    expect(result.count).toBe(1);

    act(() => result.decrement());
    expect(result.count).toBe(0);
  });
  ```

### Extra Credit 2: Setup Function

- Testing customization of one of the props
- If you have the initial value in the prop, you can customize the input and test accordingly

  ```jsx
  function useCounter({ initialCount = 0, step = 1 } = {}) {
    const [count, setCount] = React.useState(initialCount);

    const increment = () => setCount((c) => c + step);
    const decrement = () => setCount((c) => c - step);

    return { count, increment, decrement };
  }
  ```

- So as seen on above component, if you have initialCount prop setup like that you can customize it and you can test it as well.
- Pretty simple:

  ```jsx
  test('allows customization of the initial count', () => {
    let result;
    const TestComponent = () => {
      result = useCounter({ initialCount: 3 });
      return null;
    };
    render(<TestComponent />);
    console.log(result);
    expect(result.count).toBe(3);

    act(() => result.increment());
    expect(result.count).toBe(4);

    act(() => result.decrement());
    expect(result.count).toBe(3);
  });
  ```

- same thing with step

  ```jsx
  test('allows customization of the step', () => {
    let result;
    const TestComponent = () => {
      result = useCounter({ step: 2 });
      return null;
    };
    render(<TestComponent />);

    expect(result.count).toBe(0);

    act(() => result.increment());
    expect(result.count).toBe(2);

    act(() => result.decrement());
    expect(result.count).toBe(0);
  });
  ```

- but note - DUPLICATE CODE!
- abstract out (with variable biniding issue fixed)

  ```jsx
  const setup = ({ initialProps } = {}) => {
    let result;

    const TestComponent = () => {
      result = useCounter(initialProps);
      return null;
    };

    render(<TestComponent />);
    return result;
  };

  test('exposes the count and increment/decrement function (hooks)', () => {
    const result = setup();

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());
    expect(result.current.count).toBe(1);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });
  ```

  - this test will fail because

    - `referential equality`
    - because we re-render the `testComponent` function, we reassign the result to a _new_ object.

      > Just because we're reassigning this variable, doesn't mean that we're reassigning this variable

      - there are two different bindinigs to the same objects at first,
        1. The first binding here gets reassigned to a new object
        2. The other binding remains at the old object
        - Need to have some binding that's shared to a single object which then will continuously update

      ```jsx
      const setup = ({ initialProps } = {}) => {
        const result = {};
        const TestComponent = () => {
          result.current = useCounter(initialProps);
          return null;
        };
        render(<TestComponent />);
        return result;
      };
      ```

    - then update the rest of the test

      ```jsx
      test('exposes the count and increment/decrement function (hooks)', () => {
        const result = setup();

        expect(result.current.count).toBe(0);

        act(() => result.current.increment());
        expect(result.current.count).toBe(1);

        act(() => result.current.decrement());
        expect(result.current.count).toBe(0);
      });

      test('allows customization of the initial count', () => {
        const result = setup({ initialProps: { initialCount: 3 } });

        expect(result.current.count).toBe(3);

        act(() => result.current.increment());
        expect(result.current.count).toBe(4);

        act(() => result.current.decrement());
        expect(result.current.count).toBe(3);
      });

      test('allows customization of the step', () => {
        const result = setup({ initialProps: { step: 2 } });

        expect(result.current.count).toBe(0);

        act(() => result.current.increment());
        expect(result.current.count).toBe(2);

        act(() => result.current.decrement());
        expect(result.current.count).toBe(0);
      });
      ```

### Extra Credit 3: Using React-Hooks Testing Library

- get rid of the BOILERPLATE by using `renderHooks`
- If we use `renderHooks` from `@testing-library/react-hooks`, we don't need to write a separate `setup` function

  ```jsx
  test('exposes the count and increment/decrement function (hooks)', () => {
    const { result } = renderHook(useCounter);

    expect(result.current.count).toBe(0);

    actHook(() => result.current.increment());
    expect(result.current.count).toBe(1);

    actHook(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  test('allows customization of the initial count', () => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialCount: 3 },
    });

    expect(result.current.count).toBe(3);

    actHook(() => result.current.increment());
    expect(result.current.count).toBe(4);

    actHook(() => result.current.decrement());
    expect(result.current.count).toBe(3);
  });

  test('allows customization of the step', () => {
    const { result } = renderHook(useCounter, { initialProps: { step: 2 } });

    expect(result.current.count).toBe(0);

    actHook(() => result.current.increment());
    expect(result.current.count).toBe(2);

    actHook(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });
  ```

  - we can even test re-rendering and changing the value of the step

    ```jsx
    test('the step can be changed', () => {
      const { result, rerender } = renderHook(useCounter, {
        initialProps: { step: 3 },
      });

      expect(result.current.count).toBe(0);

      actHook(() => result.current.increment());
      expect(result.current.count).toBe(3);

      rerender({ step: 2 });

      actHook(() => result.current.decrement());
      expect(result.current.count).toBe(1);
    });
    ```

    - fyi imported `act` as `actHook` from `@testing-library/react-hooks` because i wanted to save the other examples and the name was duplicated

# Finished Testing React Apps

# 3/9/21 finally starting building an epic react project workshop!

## Exercise 1: Bootstrap

- Pretty simple exercise, created and rendered the `<App />` component.

  ```jsx
  // 🐨 you'll need to import React and ReactDOM up here
  import React from 'react';
  import { render } from 'react-dom';

  // 🐨 you'll also need to import the Logo component from './components/logo'
  import { Logo } from 'components/logo';

  // 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
  const App = () => {
    return (
      <div>
        <Logo width='80' height='80' />

        <h1>Bookshelf</h1>
        {/* 🐨 for fun, you can add event handlers for both buttons to alert that
        the button was clicked */}
        <div>
          <button onClick={(e) => alert('login was clicked')}>Login</button>
        </div>
        <div>
          <button onClick={(e) => alert('register was clicked')}>
            Register
          </button>
        </div>
      </div>
    );
  };

  // 🐨 use ReactDOM to render the <App /> to the root element
  // 💰 find the root element with: document.getElementById('root')
  render(<App />, document.getElementById('root'));
  ```

## Extra credit 1: use @reach/dialog

- Also pretty simple, use `@reach/dialog` to render specific modal when a login / reigster button is clicked

  ```jsx
  // 🐨 you'll need to import React and ReactDOM up here
  import React, { useState } from 'react';
  import { render } from 'react-dom';

  // 🐨 you'll also need to import the Logo component from './components/logo'
  import { Logo } from 'components/logo';

  import { Dialog } from '@reach/dialog';
  import '@reach/dialog/styles.css';

  // extra credit 1

  // 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
  const App = () => {
    const [openModal, setOpenModal] = useState('none');

    return (
      <div>
        <Logo width='80' height='80' />
        <h1>Bookshelf</h1>
        {/* 🐨 for fun, you can add event handlers for both buttons to alert that
          the button was clicked */}
        <div>
          <button onClick={(e) => setOpenModal('login')}>Login</button>
        </div>
        <div>
          <button onClick={(e) => setOpenModal('register')}>Register</button>
        </div>

        {/* extra credit 1 */}
        <Dialog aria-label='Login Form' isOpen={openModal === 'login'}>
          <button onClick={() => setOpenModal('none')}>close</button>
        </Dialog>
        <Dialog aria-label='Register Form' isOpen={openModal === 'register'}>
          test<button onClick={() => setOpenModal('none')}>close</button>
        </Dialog>
      </div>
    );
  };

  // 🐨 use ReactDOM to render the <App /> to the root element
  // 💰 find the root element with: document.getElementById('root')
  render(<App />, document.getElementById('root'));
  ```

## Extra credit 2: Create a LoginForm component

- my component would've been a duplicate smh but here's mine anyway.

  ```jsx
  // 🐨 you'll need to import React and ReactDOM up here
  import React, { useState } from 'react';
  import { render } from 'react-dom';

  // 🐨 you'll also need to import the Logo component from './components/logo'
  import { Logo } from 'components/logo';

  import { Dialog } from '@reach/dialog';
  import '@reach/dialog/styles.css';

  // extra credit 2
  const LoginForm = ({ formState, handleChange, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>username</label>
        <input
          id='username'
          name='username'
          value={formState.username || ''}
          type='text'
          onChange={handleChange}
        />
        <label htmlFor='password'>password</label>
        <input
          id='password'
          name='password'
          value={formState.password || ''}
          type='password'
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>submit form</button>
      </form>
    );
  };

  // 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
  const App = () => {
    const [openModal, setOpenModal] = useState('none');
    const [formState, setFormState] = useState({
      username: '',
      password: '',
    });
    const handleChange = (e) => {
      e.preventDefault();

      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formState);
    };

    return (
      <div>
        <Logo width='80' height='80' />

        <h1>Bookshelf</h1>
        {/* 🐨 for fun, you can add event handlers for both buttons to alert that
        the button was clicked */}
        <div>
          <button onClick={(e) => setOpenModal('login')}>Login</button>
        </div>
        <div>
          <button onClick={(e) => setOpenModal('register')}>Register</button>
        </div>

        {/* extra credit 1 */}
        <Dialog aria-label='Login Form' isOpen={openModal === 'login'}>
          <button onClick={() => setOpenModal('none')}>close</button>
          <LoginForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formState={formState}
          />
        </Dialog>
        <Dialog aria-label='Register Form' isOpen={openModal === 'register'}>
          test<button onClick={() => setOpenModal('none')}>close</button>
        </Dialog>
      </div>
    );
  };

  // 🐨 use ReactDOM to render the <App /> to the root element
  // 💰 find the root element with: document.getElementById('root')
  render(<App />, document.getElementById('root'));
  ```

- and here's kent's solution

  ```jsx
  // 🐨 you'll need to import React and ReactDOM up here
  import React, { useState } from 'react';
  import { render } from 'react-dom';

  // 🐨 you'll also need to import the Logo component from './components/logo'
  import { Logo } from 'components/logo';

  import { Dialog } from '@reach/dialog';
  import '@reach/dialog/styles.css';

  // extra credit 2
  const LoginForm = ({ buttonText, onSubmit }) => {
    const handleSubmit = (e) => {
      e.preventDefault();

      // DOM NODES
      const { username, password } = e.target.elements; // we can grab these because of the id's

      onSubmit({
        username: username.value,
        password: password.value,
      });
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>username</label>
          <input id='username' type='text' />
        </div>

        <div>
          <label htmlFor='password'>password</label>
          <input id='password' type='password' />
        </div>

        <button type='submit'>{buttonText}</button>
      </form>
    );
  };

  // 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
  const App = () => {
    const [openModal, setOpenModal] = useState('none');

    const login = (formData) => {
      console.log('login', formData);
    };

    const register = (formData) => {
      console.log('register', formData);
    };

    return (
      <div>
        <Logo width='80' height='80' />

        <h1>Bookshelf</h1>
        {/* 🐨 for fun, you can add event handlers for both buttons to alert that
        the button was clicked */}
        <div>
          <button onClick={(e) => setOpenModal('login')}>Login</button>
        </div>
        <div>
          <button onClick={(e) => setOpenModal('register')}>Register</button>
        </div>

        {/* extra credit 1 */}
        <Dialog aria-label='Login Form' isOpen={openModal === 'login'}>
          <button onClick={() => setOpenModal('none')}>close</button>
          <LoginForm onSubmit={login} buttonText='login' />
        </Dialog>
        <Dialog aria-label='Register Form' isOpen={openModal === 'register'}>
          <button onClick={() => setOpenModal('none')}>close</button>
          <LoginForm onSubmit={register} buttonText='register' />
        </Dialog>
      </div>
    );
  };

  // 🐨 use ReactDOM to render the <App /> to the root element
  // 💰 find the root element with: document.getElementById('root')
  render(<App />, document.getElementById('root'));
  ```

## Exercise 2: Styling

- this exercise was pretty simple because the components were already made for me so i just had to import emotion, bootstrap, and style the divs that kent gave
- maybe i'll start implementing emotion because the look is nice actually
- emotion with material ui tho??

  ```javascript
  import styled from '@emotion/styled';
  import { Dialog as ReachDialog } from '@reach/dialog';

  const buttonVariants = {
    primary: {
      background: '#3f51b5',
      color: 'white',
    },
    secondary: {
      background: '#f1f2f7',
      color: '#434449',
    },
  };

  const Button = styled.button(
    {
      padding: '10px 15px',
      border: 0,
      lineHeight: 1,
      borderRadius: '3px',
    },
    ({ variant = 'primary' }) => buttonVariants[variant] // taking props and assigning depending on what the variant is
  );

  const Input = styled.input({
    borderRadius: '3px',
    border: '1px solid #f1f1f4',
    background: '#f1f2f7',
    padding: '8px 12px',
  });

  const FormGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
  });

  const CircleButton = styled.button({
    borderRadius: '30px',
    padding: '0',
    width: '40px',
    height: '40px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    color: '#434449',
    border: `1px solid #f1f1f4`,
    cursor: 'pointer',
  });

  const Dialog = styled(ReachDialog)({
    maxWidth: '450px',
    borderRadius: '3px',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    margin: '20vh auto',
    '@media (max-width: 991px)': {
      width: '100%',
      margin: '10vh auto',
    },
  });

  export { CircleButton, Dialog, Button, FormGroup, Input };
  ```

  ```javascript
  /** @jsx jsx */
  import { jsx } from '@emotion/core';
  import 'bootstrap/dist/css/bootstrap-reboot.css';
  import '@reach/dialog/styles.css';

  import * as React from 'react';
  import ReactDOM from 'react-dom';
  import { Button, Input, FormGroup } from './components/lib';
  import { Modal, ModalContents, ModalOpenButton } from './components/modal';
  import { Logo } from './components/logo';

  function LoginForm({ onSubmit, submitButton }) {
    function handleSubmit(event) {
      event.preventDefault();
      const { username, password } = event.target.elements;

      onSubmit({
        username: username.value,
        password: password.value,
      });
    }

    return (
      <form
        onSubmit={handleSubmit}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          '> div': {
            margin: '10px auto',
            width: '100%',
            maxWidth: '300px',
          },
        }}>
        <FormGroup>
          <label htmlFor='username'>Username</label>
          <Input id='username' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='password'>Password</label>
          <Input id='password' type='password' />
        </FormGroup>
        <FormGroup>
          {React.cloneElement(submitButton, { type: 'submit' })}
        </FormGroup>
      </form>
    );
  }

  function App() {
    function login(formData) {
      console.log('login', formData);
    }

    function register(formData) {
      console.log('register', formData);
    }

    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'Center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
        }}>
        <Logo width='80' height='80' />
        <h1>Bookshelf</h1>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gridGap: '0.75rem',
          }}>
          <Modal>
            <ModalOpenButton>
              <Button variant='primary'>Login</Button>
            </ModalOpenButton>
            <ModalContents aria-label='Login form' title='Login'>
              <LoginForm
                onSubmit={login}
                submitButton={<Button variant='primary'>Login</Button>}
              />
            </ModalContents>
          </Modal>
          <Modal>
            <ModalOpenButton>
              <Button variant='secondary'>Register</Button>
            </ModalOpenButton>
            <ModalContents aria-label='Registration form' title='Register'>
              <LoginForm
                onSubmit={register}
                submitButton={<Button variant='secondary'>Register</Button>}
              />
            </ModalContents>
          </Modal>
        </div>
      </div>
    );
  }

  ReactDOM.render(<App />, document.getElementById('root'));
  ```
