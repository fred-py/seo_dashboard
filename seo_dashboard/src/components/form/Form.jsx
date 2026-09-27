import React, { useState, useEffect } from 'react';
import DropDown from '../dropdown/Dropdown';

//const METADATA_ENDPOINT = 'https://seo-tracker.fastapicloud.dev/services/location/'
const METADATA_ENDPOINT = 'http://localhost:8000/services/location/'


const METADATA_ACTIONS = {
    METADATA_FETCH_INIT: 'METADATA_FETCH_INIT',
    METADATA_FETCH_SUCCESS: 'METADATA_FETCH_SUCCESS',
    METADATA_FETCH_FAILURE: 'METADATA_FETCH_SUCCESS',
}


const metadataReducer = (state, action) => {
    switch (action.type) {
        case METADATA_ACTIONS.METADATA_FETCH_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case METADATA_ACTIONS.METADATA_FETCH_SUCCESS:
            return {
                ...state,
                location: action.payload.location,
                services: action.payload.services,
                isLoading: false,
                isError: false,
            };
        case METADATA_ACTIONS.METADATA_FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
}

const MetadataForm = ({
  selectedLocation,
  setSelectedLocation,
  selectedService,
  setSelectedService
}) => {
    
    const [metadata, dispatchMetadata] = React.useReducer(
        metadataReducer,
        {
            location:[],
            services:[],
            isLoading: false,
            isError: false,
        }
    );

    React.useEffect(() => {
        dispatchMetadata({ type: 'METADATA_FETCH_INIT' });
        
        fetch(METADATA_ENDPOINT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((result) => {
            dispatchMetadata({
              type: 'METADATA_FETCH_SUCCESS',
              payload: result,
            });
            console.log(result)
          })
          .catch(() =>
            dispatchMetadata({ type: 'METADATA_FETCH_FAILURE' })
          );
        }, []);


        return (
            <>
                { /*Error handling triggered if any issues 
                occur during data fetching
                if isError is True the below paragraph will load 
                */}
                {metadata.isError && <p>Something went wrong...</p>}

                { /* conditionally rendering the form
                    'Loading...' wil render until data is received. */}
                {metadata.isLoading ? (
                <p>Loading...</p>
                ) : (
                    <>
                        <h3>Location</h3>
                          <DropDown
                            trigger={selectedLocation || 'Select Location'}
                            menu={metadata.location.map(loc => (
                                <li key={loc} className='menu-item'>
                                  <button
                                      type='button'
                                      onClick={() => setSelectedLocation(loc)}
                                  >
                                  {loc}
                                  </button>
                                </li>
                            ))}
                          />
                        <h3>Service</h3>
                        <DropDown
                            trigger={selectedService || 'Select Service'}
                            menu={metadata.services.map(ser => (
                                <li key={ser} className='menu-item'>
                                  <button
                                      type='button'
                                      onClick={() => setSelectedService(ser)}
                                  >
                                  {ser}
                                  </button>
                                </li>
                            ))}
                        />
                    </>
                )}
            </>
        )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange}/>
        {label}
      </label>
    );
  };
//  <Checkbox
//label={loc}
//value={selectedLocation === loc}
//onChange={() => setSelectedLocation(loc)}
///>

export default MetadataForm