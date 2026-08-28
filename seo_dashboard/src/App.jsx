import * as React from 'react';
import './App.css';
import LineChart from './components/line-chart/LineChart'




// Variables can be defined outsite of function component
// in order to avoid being redefined everytime the page is reloaded
// NOTE: General rule, if a variable does not need parameter from within
// the function, it can/should be defined outside that function

const STORY_ACTIONS = {
  STORIES_FETCH_INIT: 'STORIES_FETCH_INIT',
  STORIES_FETCH_SUCCESS: 'STORIES_FETCH_SUCCESS',
  STORIES_FETCH_FAILURE: 'STORIES_FETCH_FAILURE',
  REMOVE_STORY: 'REMOVE_STORY',
}



const storiesReducer = (state, action) => {
  // This reducer managers the state for stories
  // based on the action type
  // Declarative programming
  // If action.type=== 'REMOVE STORY'
  // Sets new list excluding item that
  // has been removed by clicking the button
  // New lists contains all items with an ObjectID
  // that is not equal !==(unequal value and obj type operator)
  // to the removed objectID
  switch (action.type) {
    case STORY_ACTIONS.STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STORY_ACTIONS.STORIES_FETCH_SUCCESS:
      return {
        ...state,
        ranked: action.payload.ranked,
        unranked: action.payload.unranked,
        dropped: action.payload.dropped,
        isLoading: false,
        isError: false,
      };
    case STORY_ACTIONS.STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    /*
    case STORY_ACTIONS.REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      } ; */
    default:
      throw new Error();
  }
};

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

// API params for testing
const apiParams = {
  location: "Margaret River, Western Australia, Australia",
  service: "carpet",
  url: "https://unitedpropertyservices.au/"  
}


const API_ENDPOINT = 'http://localhost:8000/fetch_all/';
// When no business logic is present and the function's only
// purpose is to return a value, curly brackets can be removed
const App = () => {
  
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    ''
  );

  //  The empty dependency array ensures side effect 
  // runs only once the component renders for the first time
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer, 
    { ranked: [],
      unranked: [],
      dropped: [],
      isLoading: false,
      isError: false,
    }
  );

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiParams)
    })
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result,
        });
        console.log(result)
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
    }, []);    
  
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  // Use 'event' as a parameter to access
  // the event object in an event handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const searchedStories = stories.ranked.filter((story) => {
    // Checks if story title exits
    // Returns boolean
    // toLowerCase() method must be call on both 
    // existing title and title input
    return story.keyword.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Checkbox
  const [checkedOne, setCheckedOne] = React.useState(false);
  const [checkedTwo, setCheckedTwo] = React.useState(false);

  const handleCheckboxOne = () => {
    setCheckedOne(!checkedOne);
  }

  const handleCheckboxTwo = () => {
    setCheckedTwo(!checkedTwo);
  }

  return (
    <div>
      <h1>SEO</h1>

      <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused  // Shorthand for isFocused={true}
      onInputChange={handleSearch}
      > 
      
      {/*
      React elements eg. label can be accessed
      via the children prop instead of the label prop.
      The children prop can be used to render everything
      that needs to render in the <InputWithLabel>
      opening and closing tag  
      */}

        <strong>Search:</strong> 
      </InputWithLabel>

      <hr />
      { /*Error handling triggered if any issues 
      occur during data fetching
      if isError is True the below paragraph will load 
      */}
      {stories.isError && <p>Something went wrong...</p>}                                                        

      { /* conditionally rendering the list
        'Loading...' wil render until data is received. */}
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List
          list={searchedStories}
          onRemoveItem={handleRemoveStory}
        />
      )}

      <Button handleClick={() => console.log('Clicked button 1')}>
        Click Button 1!!
      </Button>

      <Button
        type="submit"
        handleClick={() => console.log('Clicked button 2')}>
        Click Button 2 type submit!!
      </Button>

      <Checkbox
        label="Group by keyword"
        value={checkedOne}
        onChange={handleCheckboxOne}
      />

      <Checkbox
        label="Group by service"
        value={checkedTwo}
        onChange={handleCheckboxTwo}
      />

      <p>Is "Group by keyword" checkedOne? {checkedOne.toString()}</p>
      
      <LineChart
        data={stories}
      />
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
const InputWithLabel = ({ 
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  // React Fragment allows for grouping of 
  // multiple React elements without introducing
  // additional DOM element.
  // Eg.. below without React.Fragment
  // the use of <div> would be needed to enable
  // returning Label and Input side by side
  // Short hand for frament is to simply write <></>
  return (
    <React.Fragment>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        id={id}
        type={type}
        // Assigning value attribute synchronises 
        // both React and HTML states
        // Without passing the value attribute
        // HTML is not aware of the React state eg. searchTerm
        // Refer to <Search search={searchTerm}.../>
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange} />
    </React.Fragment>
  );
}

// When no business logic is present and the function's only
// This also applies when a component only returns JSX
// purpose is to return a value, curly brackets can be removed
// Return statement can be removed since
// in a concise body an implicit return statement is attached.
//
const List = ({ list, onRemoveItem }) => {  
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
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
          />
        ))}
    </ul>
  )};

const Item = ({ item, onRemoveItem }) => (
  // props is being deconstructed right away by passing 'item'
  // instead of props then props.item.url...
  // Item component renders a list of items
  <li>     
    <span>
      <a href={item.id}>{item.date}</a>
    </span>
    <span>{item.location}</span>
    <span>{item.keyword}</span>
    <span>{item.position}</span>
    <span>
      {/* Using JS bind method onClick={() => } allows
      biding arguments directly to the function to be used
      when executing eg. onRemoveItem(insert_argument) */}
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
)

const Button = ({ type = 'button', handleClick, children }) => {
  // Using type as a property makes the component
  // more generic and allows for the type to be 
  // changed at the parent level eg. type="submit"
  // children prop works as label
  return (
    <button type={type} onClick={handleClick}>
      {children}
    </button>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange}/>
      {label}
    </label>
  );
};


export default App

