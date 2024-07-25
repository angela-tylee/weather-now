console.log("hello");

const apiKey = "CWA-A4A0C5E9-8D4C-4AA9-A76D-544A79B555E2";
let data = [];
const tableBody = document.getElementById('weather-table').getElementsByTagName('tbody')[0];


function getData() {
  // axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}`)
  axios.get(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-093?Authorization=${apiKey}&locationId=F-D0047-001`)
    .then(function (response) {
      console.log(response);
      data = response.data.records.locations;
      renderData();
      // renderTableData();
      // rednerHoursData();
    })
    .catch(function (error) {
      console.log(error);
    });
};

getData();

const weather = document.querySelector('#weather');

function renderData() {
  console.log(data);
  // data.forEach((item) => {
  //   weather.innerHTML += `<p>${item.locationName}</p>`;
  // });

  weather.innerHTML += `<div>${JSON.stringify(data, null, 2)}</div>`;
};




function renderTableData() {
  const table = document.getElementById('weather-table');
  const tbody = table.querySelector('tbody');

  // Extract data for the first location
  const location = data[0];
  const timeSlots = location.weatherElement[0].time.map(t => t.startTime.split(' ')[1]); // Extract time slots
  const elements = location.weatherElement.map(e => e.elementName); // Extract weather elements

  // Generate table headers (time slots)
  const headerRow = `
      <tr>
          <th>時間</th>
          ${timeSlots.map(time => `<th>${time}</th>`).join('')}
      </tr>
  `;

  // Generate table rows (weather elements)
  const rows = elements.map(elementName => {
      const cells = timeSlots.map((_, index) => {
          const elementData = location.weatherElement.find(e => e.elementName === elementName).time[index].parameter.parameterName;
          return `<td>${elementData || 'N/A'}</td>`;
      }).join('');

      return `
          <tr>
              <td>${elementName}</td>
              ${cells}
          </tr>
      `;
  }).join('');

  // Insert header and rows into table body
  tbody.innerHTML = headerRow + rows;

  }
