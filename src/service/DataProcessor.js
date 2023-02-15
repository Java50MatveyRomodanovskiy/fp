export class DataProcessor {
    #url
    #cities
    constructor(url, cities) {
        this.#url = url;
        this.#cities = cities;
    }
   
    async getTemperatureData(city, startDate, endDate, hourFrom, hourTo) {
        const latitude = this.#cities[city].latitude;
        const longitude = this.#cities[city].longitude;
        const url = `${this.#url}&latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`;
        const serverResponse = await fetch(url);
        const obj = await serverResponse.json();
        return getObjectFromResponse(obj, hourFrom, hourTo);
        }
}
function getObjectFromResponse(obj, hourFrom, hourTo){
    const temperturePerHourPerDate = [];
    let i = hourFrom;
    let end = obj.hourly.time.length - (24 - hourTo);
    while (i <= end){
        const hourObject = {};
        hourObject['date'] = obj.hourly.time[i].substring(0,10);
        hourObject['time'] = obj.hourly.time[i].substring(11);
        hourObject['temperature'] = obj.hourly.temperature_2m[i];
        temperturePerHourPerDate.push(hourObject);
        i++;
    }
    return temperturePerHourPerDate;
    }
   
    // function processRawData(rawData, hourFrom, hourTo) {
    
    //     const timeArray = getHoursElements(rawData.hourly.time, hourFrom, hourTo);
    //     const temperatureArray =getHoursElements(rawData.hourly.temperature_2m, hourFrom, hourTo); ;
    //     return timeArray.map((t, index) => {
    //         const res = {};
    //         const dateTime = t.split("T");
    //         res.date = dateTime[0];
    //         res.hour = dateTime[1];
    //         res.temperature = temperatureArray[index];
    //         return res;
    
    //     })