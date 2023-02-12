import { weatherConfig } from "./config/weather-config.js";
import { DataProcessor } from "./service/DataProcessor.js";
const url = "https://api.open-meteo.com/v1/gfs?hourly=temperature_2m&timezone=IST";
const dataProcessor = new DataProcessor(url,weatherConfig.cities);
//data fo testing
const startDate = '2023-02-13'
const endDate = '2023-02-15'
const hourFrom = 10;
const hourTo = 20;
const city = 'Rehovot';
//end data for testing
async function displayTemperatures() {
    const data = await dataProcessor.getTemperatureData(city, startDate , endDate, hourFrom, hourTo);
    data.forEach(e => console.log(e));
}
displayTemperatures();
