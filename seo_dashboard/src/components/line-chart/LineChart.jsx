import Plot from 'react-plotly.js';
import { useState } from 'react';


// passing { ranked }  deconstructs the json array data{ranked, unranked, dropped}
const RankingChart = ({ data }) => {

    const uniqueKeywords = [...new Set(data.ranked.map(item => item.keyword))]
    
    const traces = uniqueKeywords.map((keyword, index) => {
        const key = data.ranked.filter(item => item.keyword === keyword);

        // Sort by date
        const sortedByDate = key.sort((a, b) =>
            // Sort method compares 2 values
            // Calling Date() converts obj to datetime
            // Date values are compared, if a - b is negative
            // a will be sorted as the smaller value
            new Date(a.date) - new Date(b.date)
        );
        const offset = (index - uniqueKeywords.length / 2) * 0.15;
        
        return {
            x: sortedByDate.map(item => item.date),
            y: sortedByDate.map(item => item.position + offset),
            name: keyword,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { size: 6 },
            line: {
                width: 1,
            },
        };
        })
    
    return (
        
        <Plot
            data={traces}
            layout={{
                font: {
                    color: '#DEDEDE',
                },
                
                title: {
                    text: 'SEO Performance - Google Search Position Tracking',
                },

                width: 850,
                
                margin: {
                    t: 80,
                    b: 80,
                    // Ajust padding rank and dates
                    // farther away from the grid
                    pad: 11,
                },
                
                paper_bgcolor: '#242424',
                plot_bgcolor: '#242424',

                xaxis: { 
                    title: {
                        text: 'Date',
                    },
                    type: 'date',
                    autorange: 'max',
                },
                
                yaxis: {
                    title: {
                        text: 'Ranking Position',
                    },
                    reverse: true, // Invert ranking on axis
                    autorange: false,
                    range: [10, 1],
                    tickformat: 'd',
                    dtick: 1  // Display all ranking positions
                },
            }}
        />
    )
}

export default RankingChart