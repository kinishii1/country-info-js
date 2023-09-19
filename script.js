const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const resultDiv = document.getElementById('result')
const url = 'https://restcountries.com/v3.1/name/'

const fetchData = () => {
  const inputVal = countryInp.value;
  fetch(`${url}${inputVal}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const population = data[0].population.toLocaleString()
      resultDiv.innerHTML = `
        <img src="${data[0].flags.png}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${data[0].languages[Object.keys(data[0].languages)]}</span>
            </div>
        </div>
      `
    })
    .catch(()=>{
      if (inputVal.length == 0) {
        resultDiv.innerHTML = `<h3>The input field cannot be empty</h3>`;
      } else {
        resultDiv.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
}

countryInp.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    fetchData();
  }
});
searchBtn.addEventListener('click', fetchData);