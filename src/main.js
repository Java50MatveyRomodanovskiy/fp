import { weatherConfig } from "./config/weather-config.js";
import { DataProcessor } from "./service/DataProcessor.js";
import { DataForm } from "./ui/data-form.js";
const url = "https://api.open-meteo.com/v1/gfs?hourly=temperature_2m&timezone=IST";
const dataProcessor = new DataProcessor(url, weatherConfig.cities);
//data fo testing
const startDate = '2023-02-13'
const endDate = '2023-02-15'
const hourFrom = 10;
const hourTo = 20;
const cities = weatherConfig.cities;

//end data for testing
// async function displayTemperatures() {
//     const data = await dataProcessor.getTemperatureData(city, startDate , endDate, hourFrom, hourTo);
//     data.forEach(e => console.log(e));
// }
// displayTemperatures();
const dataForm = new DataForm("form-section", 16, cities);