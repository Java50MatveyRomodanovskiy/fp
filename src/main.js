import { weatherConfig } from "./config/weather-config.js";
import { DataProcessor } from "./service/DataProcessor.js";
import { DataForm } from "./ui/data-form.js";
import { Table } from "./ui/table.js";
const url = "https://api.open-meteo.com/v1/gfs?hourly=temperature_2m&timezone=IST";
const dataProcessor = new DataProcessor(url, weatherConfig.cities);

const cities = weatherConfig.cities;

//end data for testing
async function displayTemperatures(dataForm) {
    const {city} = dataForm;
    const {dateTo} = dataForm;
    const {dateFrom} = dataForm;
    const {hourFrom} = dataForm;
    const {hourTo} = dataForm;
    const data = await dataProcessor.getTemperatureData(city, dateFrom, dateTo, hourFrom, hourTo);
    data.forEach(e => tableForecast.addRow(e));
}
const schema = [
    {columnName: 'Date', fieldName: 'date'},
    {columnName: 'Time', fieldName: 'time'},
    {columnName: "Temperature", fieldName: 'temperature'},
]
const tableForecast = new Table ("table-section", "Forecast", schema);
const data = new DataForm("form-section", 16, cities);
data.addFormHandler(displayTemperatures);
