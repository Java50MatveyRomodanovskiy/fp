const FORM_ID = "data-form-id";
const DATE_FROM_ID = "date-from-id";
const DATE_TO_ID ="date-to-id";
const HOUR_FROM_ID = "hour-from-id";
const HOUR_TO_ID ="hour-to-id";
export class DataForm{
    #formElement
    #dateFromElement;
    #dateToElement;
    #hourFromElement;
    #hourToElement;
    #citySelectorElement;
    constructor(parentId, maxDays, cities){
        const parentElement = document.getElementById(parentId);
        this.#fillForm(parentElement);
        this.#formElement = document.getElementById(FORM_ID);
        this.#dateToElement = document.getElementById(DATE_TO_ID);
        this.#dateFromElement = document.getElementById(DATE_FROM_ID);
        this.#hourToElement = document.getElementById(HOUR_TO_ID);
        this.#hourFromElement = document.getElementById(HOUR_FROM_ID);
        this.#citySelectorElement = document.getElementById("select-city");
        this.#setMinMaxDates(maxDays);
        this.#getHoursSelector();
        this.#getCitySelector(cities);
    }
    #fillForm (parentElement){
        parentElement.innerHTML = `<form id ="${FORM_ID}">
        <input required type ="date" id="${DATE_FROM_ID}">
        <input required type ="date" id="${DATE_TO_ID}">
        <select required tipe ="time" id="${HOUR_FROM_ID}"></select>
        <select required tipe ="time" id="${HOUR_TO_ID}"></select>
        <select required name="city" id="select-city">
                <option value="" disabled selected>Choose city</option>
            </select>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        </form>
        `
    }
    #setMinMaxDates(maxDays){
        const current = new Date();
        const maxDayOfMonth = current.getDate()+maxDays;
        const maxDate = new Date()
        maxDate.setDate(maxDayOfMonth);
        const minDateStr = current.toISOString().split("T")[0];
        const maxDateStr = maxDate.toISOString().split("T")[0];
        this.#dateFromElement.min = minDateStr;
        this.#dateToElement.min = minDateStr;
        this.#dateFromElement.max = maxDateStr;
        this.#dateToElement.max = maxDateStr;   
    }
    #getHoursSelector() {
        for (let i = 0; i < 24; i++) {
            if (i < 10) {
                this.#hourFromElement.innerHTML += `<option value="0${i}">0${i}:00</option>`
                this.#hourToElement.innerHTML += `<option value="0${i}">0${i}:00</option>`
            } else {
                this.#hourFromElement.innerHTML += `<option value="${i}">${i}:00</option>`
                this.#hourToElement.innerHTML += `<option value="${i}">${i}:00</option>`
            }

        }
    }
    #getCitySelector(cities){
        for (let i in cities) {
            this.#citySelectorElement.innerHTML += `<option value="${i}">${i}</option>`;   
            }
    
    }
    
}