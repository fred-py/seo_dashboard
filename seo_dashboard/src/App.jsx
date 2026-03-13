import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Variables can be defined outsite of function component
// in order to avoid being redefined everytime the page is reloaded
// NOTE: General rule, if a variable does not need parameter from within
// the function, it can/should be defined outside that function
const welcome = {
  greeting: 'Hey', 
  title: 'Fred',
};

const list = [
  {
    title: 'SEO',
    url: 'https://react.dev/',
    author: 'Jordan Walke', 
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'DEV',
    url: 'https://dectt.dev/',
    author: 'Josh James Jacob', 
    num_comments: 2,
    points: 6,
    objectID:2,
  },
];

const list2 = [
  {
    title: 'UNITED',
    url: 'https://react.dev/',
    author: 'JJJ', 
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'AAA',
    url: 'https://dectt.dev/',
    author: 'Josh James Jacob', 
    num_comments: 2,
    points: 6,
    objectID:2,
  },
];


// When no business logic is present and the function's only
// purpose is to return a value, curly brackets can be removed
// Return statement can be removed since
// in a concise body an implicit return statement is attached.
const App = () => (
    <div>
      <h1>SEO</h1>
      
      <Search />
    
      <hr />

      <List list={list} />

      <List list={list2}/>
    </div>
  );


export default App

// When no business logic is present and the function's only
// This also applies when a component only returns JSX
// purpose is to return a value, curly brackets can be removed
// Return statement can be removed since
// in a concise body an implicit return statement is attached.
const List = ({ list }) => (
    <ul>
      {list.map((item) => {
        /* key attribute is used when rerendering a list,
          although not compulsory, React can more efficiently 
          check if an item has been changed. The value can be any id
          that represents the obj in a list
          If no id is present, something like a title can be used as long 
          as the title does not change. Last resort would be to use the index
          Refer to page 36 of The Road to React*/
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{marginRight: '10px'}}>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>

          </li>
        );
      })}
    </ul>
  );


const Search = () => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" />
    </div>
  );
}


// Example of JS Class declaration
class Person {
  constructor(firsName, lastName) {
    this.firstName = firsName;
    this.lastName = lastName;
  }
  getName() {
    return this.firstName + ' ' + this.lastName;
  }
}

// class instantiation
const robin = new Person('Frederico', 'Rezende');

console.log(robin.getName());

