
function Statistics(chartData) {
    let count = 0, sum = 0.0, max = 0, min = 10000000;
    chartData.map((entry, key) => {
        count++;
        sum += entry.value;
        if(entry.value > max){
            max = entry.value;
        }
        if(entry.value < min){
            min = entry.value;
        }
        return key;
    })
    return {
        count: count,
        avg: sum/count,
        max: max,
        min: min
    };
}

export default Statistics;