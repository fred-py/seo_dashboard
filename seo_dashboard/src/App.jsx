//import { useState } from 'react'
import * as React from 'react'
import './App.css'

// Variables can be defined outsite of function component
// in order to avoid being redefined everytime the page is reloaded
// NOTE: General rule, if a variable does not need parameter from within
// the function, it can/should be defined outside that function
const welcome = {
  greeting: 'Hey', 
  title: 'Fred',
};

const listss = [
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
const App = () => {
  console.log('App renders')
  const stories = [
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
  return (
    <div>
      <h1>SEO</h1>
      
      <Search />
    
      <hr />

      <List list={stories}/>
    </div>
  );
}

export default App

// When no business logic is present and the function's only
// This also applies when a component only returns JSX
// purpose is to return a value, curly brackets can be removed
// Return statement can be removed since
// in a concise body an implicit return statement is attached.
const List = (props) => {
    console.log('List renders')
    // props are used to pass down information down to the component hierarchy
    return (
    <ul>
      {props.list.map((item) => ( // list is assigned in the app component
        /* key attribute is used when rerendering a list,
          although not compulsory, React can more efficiently 
          check if an item has been changed. The value can be any id
          that represents the obj in a list
          If no id is present, something like a title can be used as long 
          as the title does not change. Last resort would be to use the index
          Refer to page 36 of The Road to React*/
          <Item key={item.objectID} item={item} />
        ))}
    </ul>
  )};

const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
)


const Search = () => {
  console.log('Search Renders')
  // State is used to modify information overtime
  // eg. const [value, setValue] = React.useState('');
  // the first entry value/searchTerm refers to the current
  // state, in this case an empty string
  // the second entry setValue, is a function to update this state
  const [searchTerm, setSearchTerm] = React.useState('');
  // Use 'event' as a parameter to access
  // the event object in an event handler
  const handleChange = (event) => {
    // synthetic event
    console.log(event)
    // Value of targer (here: input HTML element)
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  // NOTE If handleChange is a function
  // which does not return a function
  // use <input... onChange={handleChange}>
  // instead of <input... onChange={handleChange()}>
  // the latter will throw and error
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
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

