import React from "react";
import header_logo from "../assets/logo.png";
import dayConverter from "../helper/dayConverter";
import firstLetterCapitalize from "../helper/firstLetterCapitalize";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import feels_like from "../assets/feels_like.png";
import weatherType from "../assets/weather_type.png";
import gitHub from "../assets/github.png";
import linkedIn from "../assets/linkedin.png";
import axios from "axios";

function App(props) {
  const herokuProxy = 'https://mycorsproxy-tech4weather.herokuapp.com/'
  const postIntoDb = (city, country) => {
    axios
      .post(`${herokuProxy}https://tech4weather-api.herokuapp.com/post`, {
        city: city,
        country: country,
      })
      .then((response) => {
        return response.data;
      });
  };
  const [historic, setHistoric] = React.useState([{}]);

  const [result, setResult] = React.useState(null);

  const [inputString, setInputString] = React.useState("");

  const [localStorageCities, setLocalStorage] = React.useState([]);

  const updateLocalStorage = () => {
    localStorage.setItem("city", JSON.stringify(city));
    setLocalStorage(city);
  };
  const localStorageCity = JSON.parse(localStorage.getItem("city"));
  let city = localStorage.getItem("city") !== null ? localStorageCity : [];
  React.useEffect(() => setLocalStorage(city), []);

  return (
    //test
    <>
      <div className="main-wrapper">
        <div className="header">
          <img src={header_logo} alt="logo-header" className="logo" />
        </div>
        <h1 className="forecast">Previsão do Tempo</h1>
        <div className="middle-wrapper">
          <div className="first-pannel">
            <input
              type="text"
              placeholder="Busque por uma cidade..."
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  axios
                    .get(
                      `https://api.openweathermap.org/data/2.5/weather?q=${inputString}&lang=pt_br&APPID=b95fe6e5ab2af7ed6a3b0aea37754f22`
                    )
                    .then((response) => {
                      setResult(response.data);
                      city.push(response.data.name);
                      updateLocalStorage();
                      postIntoDb(response.data.name, response.data.sys.country);
                    })
                    .catch((error) => {
                      alert("Erro na pesquisa; Por favor cheque os dados");
                    });
                }
              }}
              onChange={(e) => {
                setInputString(e.target.value);
              }}
            />
            <div className="inside-content">
              <div className="weather-info1">
                <h1 className="city">{result ? result.name : "Cidade"}</h1>
                <h2 className="country">
                  {result ? result.sys.country : "Pais"}
                </h2>
                <h3 className="day">{dayConverter(new Date().getDay())}</h3>
                <div className="weather-img">
                  <span>
                    <img src={humidity} alt="humidity" />
                    <p>{result ? result.main.humidity : 0}%</p>
                  </span>
                  <span>
                    <img src={wind} alt="wind" />
                    <p>
                      {parseFloat(result ? result.wind.speed : 0).toFixed(1)}
                      km/h
                    </p>
                  </span>

                  <span>
                    <img src={feels_like} alt="feels_like" />
                    <p>
                      {parseFloat(
                        result ? result.main.feels_like - 273.15 : 0
                      ).toFixed(1)}
                      º C
                    </p>
                  </span>
                </div>
              </div>

              <div className="temp">
                <h2>
                  {parseFloat(result ? result.main.temp - 273.15 : 0).toFixed(
                    0
                  )}
                  º C
                </h2>
                <span>
                  <img
                    src={
                      result
                        ? `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
                        : weatherType
                    }
                    alt="Weather Type"
                  />
                  <p>
                    {firstLetterCapitalize(
                      result
                        ? result.weather[0].description
                        : "Descrição do clima"
                    )}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="inside-wrapper">
            <div className="second-pannel">
              <div className="second-pannel-header">
                <span>Últimas cidades pesquisadas</span>
              </div>
              <div className="last-city">
                <ul>{localStorageCities[localStorageCities.length - 1]}</ul>
                <ul>{localStorageCities[localStorageCities.length - 2]}</ul>
                <ul>{localStorageCities[localStorageCities.length - 3]}</ul>
                <ul>{localStorageCities[localStorageCities.length - 4]}</ul>
              </div>
              <div className="content-wrapper1"></div>
            </div>
            <div className="stretcher"></div>

            <div className="third-pannel">
              <div className="third-pannel-header">
                <span>Cidades mais pesquisadas</span>
              </div>
              <div
                className="most-searched-city"
                onLoad={
                  (window.onload = () => {
                    axios.get(`${herokuProxy}https://tech4weather-api.herokuapp.com/list`).then((response) => {
                      return setHistoric(response.data);
                    });
                  })
                }
              >
                <ul>
                  <li>
                    {historic && historic[0]
                      ? historic[0]["city"]
                      : "Cidade mais pesquisada"}
                  </li>
                  <li>
                    {historic && historic[1]
                      ? historic[1]["city"]
                      : "Segunda cidade mais pesquisada"}
                  </li>
                  <li>
                    {historic && historic[2]
                      ? historic[2]["city"]
                      : "Terceira cidade mais pesquisada"}
                  </li>
                  <li>
                    {historic && historic[3]
                      ? historic[3]["city"]
                      : "Quarta cidade mais pesquisada"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-wrapper">
            <p>
              &copy; Copyright 2021 | Leandro Dias | Todos os direitos
              reservados
            </p>
            <span>
              <a
                href="https://www.github.com/lekofox"
                target="_blank"
                rel="noreferrer"
              >
                <img src={gitHub} alt="Git" />
              </a>
              <a
                href="https://www.linkedin.com/in/leandro-d"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedIn} alt="linkedIn" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
