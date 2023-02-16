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

   
    function getObjectFromResponse (rawData, hourFrom, hourTo) {
    
        const timeArray = getHoursElements(rawData.hourly.time, hourFrom, hourTo);
        const temperatureArray =getHoursElements(rawData.hourly.temperature_2m, hourFrom, hourTo); ;
        return timeArray.map((t, index) => {
            const res = {};
            const dateTime = t.split("T");
            res.date = dateTime[0];
            res.time = dateTime[1];
            res.temperature = temperatureArray[index];
            return res;
    
        })
    }
    function getHoursElements (array, hourFrom, hourTo) {
        return array.filter((__, index) => {
            const hour = index % 24;
            return hour >= hourFrom && hour <= hourTo
        } )
    }