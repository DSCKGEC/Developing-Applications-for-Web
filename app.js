const API_KEY = ""; //enter your api key here;
const OPENWEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=${API_KEY}`;

const DOM_TEMP = document.getElementById("temp");
const DOM_COND = document.getElementById("condition");

const DOM_BUTTONS_LIST = document.getElementById("buttons_list");
const DOM_SLIDER_LIST = document.getElementById("slider_container");

let lights = [
  {
    device_id: 1,
    device_name: "Light 01",
    //here false means off and true means on
    status: false
  },
  {
    device_id: 2,
    device_name: "Some other machine 01",
    //here false means off and true means on
    status: true
  }
];

let ranged_devices = [
  {
    device_id: 1,
    device_name: "Intensity 01",
    value: 12
  },
  {
    device_id: 2,
    device_name: "Intensity 02",
    //here false means off and true means on
    value: 33
  }
];

function upade_value(deviceID) {
  let value_to_use = document.getElementById(`${"ranged_device_" + deviceID}`)
    .value;

  ranged_devices.forEach(element => {
    if (deviceID === element.device_id) {
      element.value = value_to_use;
    }
    return element;
  });

  renderSliders();
}

function renderSliders() {
  DOM_SLIDER_LIST.innerHTML = "";
  ranged_devices.forEach(element => {
    DOM_SLIDER_LIST.innerHTML += `
        <div class="slider_container" >
                            <h3>${element.device_name} - <strong>${
      element.value
    }</strong> </h3>
                            <input 
                            id = "${"ranged_device_" + element.device_id}"
                            onchange="upade_value(${
                              element.device_id
                            })" type="range" min="0" max="100" value="${
      element.value
    }">
                        </div>
        `;
  });
}

function change_status(deviceID) {
  lights = lights.map(element => {
    if (element.device_id === deviceID) {
      element.status = !element.status;
    }
    return element;
  });
  alert("status change successful");
  renderLights();
}

function renderLights() {
  DOM_BUTTONS_LIST.innerHTML = "";
  lights.forEach(element => {
    DOM_BUTTONS_LIST.innerHTML += `
        <div class="button_container">
                            <h3>${element.device_name}</h3>
                            <button onclick="change_status(${
                              element.device_id
                            })">Turn ${element.status ? "off" : "on"}</button>
                        </div>
        `;
  });
}

async function loadWeatherData() {
  let response = await fetch(OPENWEATHER_URL);
  let data = await response.json();
  let temp = data.main.temp - 273;
  let condition = data.weather[0].main;

  DOM_COND.innerText = condition;
  DOM_TEMP.innerHTML = temp.toFixed(2) + "&deg;C";
  console.log(temp, condition);
}

loadWeatherData();
renderLights();
renderSliders();
