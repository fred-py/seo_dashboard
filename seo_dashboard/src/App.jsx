import { useState, useEffect } from 'react'
import * as React from 'react'
import Plot from 'react-plotly.js'
import './App.css'
//import LineChart from './components/LineChart'


// Variables can be defined outsite of function component
// in order to avoid being redefined everytime the page is reloaded
// NOTE: General rule, if a variable does not need parameter from within
// the function, it can/should be defined outside that function

// State is used to modify information overtime
  // eg. const [value, setValue] = React.useState('');
  // the first entry value/searchTerm refers to the current
  // state, in this case an empty string
  // the second entry setValue, is a function to update this state
const useStorageState = (key, initialState) => {
  // This custom hook can be used multiple times to handle side effects
  // Key argument must be a unique identifier
  // Otherwise multiple hooks will work on the same local
  // storage key/value pair
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );  // useState is a React Hook
  
  // useEffect to take care of reats side effects
  // Using it here so it is centralised
  // instead of localStorage being called from a handler
  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key]);
  // callback.event handler will be 
  // passed as a function in props
  // to another component
  return [value, setValue];
};

// When no business logic is present and the function's only
// purpose is to return a value, curly brackets can be removed
const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://react.dev/',
      author: 'JJJ', 
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://dectt.dev/',
      author: 'Josh James Jacob', 
      num_comments: 2,
      points: 6,
      objectID:2,
    },
  ];
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React')
  // Use 'event' as a parameter to access
  // the event object in an event handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let hasStored;
    if (localStorage.getItem('search')) {
      hasStored = true;
    } else {
      hasStored = false;
  }
  // Refer to page 81 - saving state in
  // localStorage so it is present on refresh 
  const initialState = hasStored
    ? localStorage.getItem('search')
    : 'React';
  // Filter stories with stateful searchTerm before passing 
  // them to list prop
  // Use build-in filter method
  const searchedStories = stories.filter((story) => {
    // Checks if story title exits
    // Returns boolean
    // toLowerCase() method must be call on both 
    // existing title and title input
    return story.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());

  });

  return (
    <div>
      <h1>SEO</h1>
  
      <Search search={searchTerm} onSearch={handleSearch} />
    
      <hr />

      <List list={searchedStories}/>
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      ({/* keywords must be defined befere LineChart acn be added
      <LineChart/>*/})
      
    
    </div>
  );
}

// Object Destructing instead
// {search, onSearch} replaces props container
// And the props object is destructured right away  
// in the components function signature
// ALl the object information can be accessed instead of
// Destructuring in the traditional way eg. props.search and props.onSearch
// Refer to page 70
const Search = ({search, onSearch}) => {
  // React Fragment allows for grouping of 
  // multiple React elements without introducing
  // additional DOM element.
  // Eg.. below without React.Fragment
  // the use of <div> would be needed to enable
  // returning Label and Input side by side
  // Short hand for frament is to simply write <></>
  return (
    <React.Fragment>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        // Assigning value attribute synchronises 
        // both React and HTML states
        // Without passing the value attribute
        // HTML is not aware of the React state eg. searchTerm
        // Refer to <Search search={searchTerm}.../>
        value={search}
        onChange={onSearch} />
    </React.Fragment>
  );
}

// When no business logic is present and the function's only
// This also applies when a component only returns JSX
// purpose is to return a value, curly brackets can be removed
// Return statement can be removed since
// in a concise body an implicit return statement is attached.
//
const List = ({list}) => {  
    // props is being deconstructed right away by passing 'list'
    // instead of props then props.list.map()...

    // List component iterates an array using map() method
    // It calls Item component using ObjectID as a unique identifier
    // Item component then renders a list of items
    // props are used to pass down information down to the component hierarchy
    return (
    <ul>
      {list.map((item) => ( // list is assigned in the app component
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

const Item = ({item}) => (
  // props is being deconstructed right away by passing 'item'
  // instead of props then props.item.url...
  // Item component renders a list of items
  <li>     
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
)





export default App

