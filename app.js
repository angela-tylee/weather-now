console.log("hello");

console.log(axios);

const apiKey = "CWA-A4A0C5E9-8D4C-4AA9-A76D-544A79B555E2";
let data = [];

function getData() {
  axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`)
    .then(function (response) {
      console.log(response.data.records.location);
      data = response.data.records.location;
      renderData();
    })
    .catch(function (error) {
      console.log(error);
    });
};

getData();

const weather = document.querySelector('.weather');

function renderData() {
  // weather.innerHTML = data;
  // console.log(data);
  data.forEach((item) => {
    weather.innerHTML += `<p>${item.locationName}</p>`;
  });
};

// renderData();
