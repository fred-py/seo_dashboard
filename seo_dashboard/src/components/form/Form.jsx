import React, { useState, useEffect } from 'react';

const API_ENDPOINT = 'https://seo-tracker.fastapicloud.dev//services/location/'


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


const [metadata, dispatchMetadata] = React.useReducer(
    metadataReducer,
    {
        data:[],
        isLoadimg: false,
        isError: false,
    }
);
