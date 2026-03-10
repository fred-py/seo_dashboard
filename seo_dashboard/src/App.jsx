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


function App() {
  return (
    <div>
      <h1>
        SEO
      </h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text"/>

      <hr />

      <ul>
        {list.map(function(item) {
          /* key attribute is used when rerendering a list,
          although not compulsory, React can more efficiently 
          check if an item has been changed. The value can be any id
          that represents the obj in a list
          If no id is present, something like a title can be used as long 
          as the title does not change. Last resort would be to use the index
          Refer to page 36 of The Road to React*/
          return <li key={item.objectID}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App
