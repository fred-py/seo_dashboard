import Plot from 'react-plotly.js';
import graphData from '/src/test_data/test_data.json'


function RankingChart() {
    
    const ranked = graphData.ranked;

    /*
    Get unique keywords
    ranked.map pulls all keywords
    Set removes duplicates
    ... spread operator converts Set obj back into Array
    const keywords = [...new Set(ranked.map(item => item.keyword))];
    */

    /*
    Get earliest date, call Date method to create js data object
    ... spread operator to unpack the array into individual arguments
    call Math.min() to find the smallest value
    NOTE: Date objects when used in Math automatically converts to number 
    milliseconds since 1970 
    */
    const earliestDate = new Date(Math.min
        (...ranked.map(item => new Date(item.date)))
    );
    // Build a trace for each keyword
    const traces = keywords.map(keyword => {  // Loop through unique keywords
        // Get entries that belong to current keywords from ranked
        // eg. carpet cleaning mr (urls, positions, etc...)
        const filtered = ranked.filter(item => item.keyword === keyword);
        return {
            x: filtered.map(item => item.date),
            y: filtered.map(item => item.position),
            type: 'scatter',
            mode: 'lines+markers',
            name: keyword,
        }
    })

    return (
        <Plot
            data={traces}
            layout={{
                title: 'Keyword Rankings Over Time',
                yaxis: { autorange: 'reversed' }, // position 1 at top
                xaxis: {
                    title: 'Date',
                    range: [earliestDate]
                },

            }}
        />
    )
};

export default RankingChart


