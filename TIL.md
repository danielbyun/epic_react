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

### 11/23/2020

The company I work for in Gangnam, SK, approved purchasing this course for me - hoping that this would help solidify the project that I am single-handedly in charge of and to help future React developers that they might hire.

They did see how qualified Kent C. Dodd was and what sort of material he was offering - and that the course was available for a lifetime.

I really put in all my effort to not skip anything and really get familiar with all the concepts that Kent stated that I should be familiar with. I attended his old Paypal workshop (uploaded on YouTube) to get to know his teaching style and other topics I might not know from JavaScript. But turns out just by reading his article I did not know that JavaScript had such capabilities as the ones Kotlin did.

#### Section 1: Welcome to Epic React

Went through how the course is set up, how to set up my machine to be able to run through the exercises, and what is expected of from taking this course.

This course is set up interesting that I clone the workshop repo, complete the exercises, then run the test and the app.

---

### 11/24/2020

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
const eat = () => {};
```
