import Plot from 'react-plotly.js';
import graphData from '/src/test_data/test_data.json'


function RankingChart() {
    
    const ranked = graphData.ranked;

    // Get unique keywords
    // ranked.map pulls all keywords
    // Set removes duplicates
    // ... spread operator converts Set obj back into Array
    const keywords = [...new Set(ranked.map(item => item.keyword))];

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
                xaxis: { title: 'Date' },
            }}
        />
    )
};

export default RankingChart


