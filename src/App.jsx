import React from 'react';
import './App.css';
import axios from 'axios';
import worldmap from './assets/world_map.png';
import continentColor from './helpers/isContinentColor.js';
import globe from './assets/wereldbol.png';
import roamingPopulation from './helpers/roamingpopulation.js';


function App() {

    const [countries, setCountries] = React.useState([]);
    const [showButton, setShowButton] = React.useState(true);
    const [error, setError] = React.useState('');
    const [chosenCountryInfo, setChosenCountryInfo] = React.useState({});
    const [searchValue, setSearchValue] = React.useState('');


    async function fetchCountries() {
        setError(false);
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data);
            setShowButton(false);
        } catch (e) {
            console.log(error);
            setError(true);
        }
    }

    countries.sort((a, b) => {
        if (a.population > b.population) {
            return 1;
        }
        if (a.population < b.population) {
            return -1;
        } else {
            return 0;
        }
    })


    async function fetchSingleCountry(event) {
        event.preventDefault();
        setError('');

        console.log(searchValue)

        try {
            const responseSingle = await axios.get(`https://restcountries.com/v3.1/name/${searchValue}`);
            setChosenCountryInfo(responseSingle.data[0]);
            //console.log(responseSingle.data[0].capital[0]);
            //console.log(responseSingle.data[0].name.common);
            setSearchValue('');
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <div className="outer-container">
                <div className="inner-container">

                    <header>
                        <img src={worldmap} alt="kaart van de wereld"/>

                        <h1>World Regions</h1>
                    </header>

                    <main>

                        <section className="country-function">
                            {showButton &&
                                <button type="button" className="country-button" onClick={fetchCountries}>Klik hier en
                                    laat je verrassen </button>
                            }
                            {error &&
                                <p className="error-message"> Er is iets mis gegaan met het ophalen van de gegevens.
                                    Probeer het opnieuw </p>
                            }

                            <div className="card-container">

                                {countries.map((country) => {

                                    return (
                                        <>
                                            <div key={country.cca3} className="country-card">
                                                <div className="wrapper">
                                                    <img src={country.flags.png}
                                                         alt={`Vlag van ${country.name.official}`}
                                                         className="country-flag"/>

                                                    <h3 className={`${continentColor(country)} country-name`}>{country.name.official}</h3>
                                                </div>
                                                <p>
                                                    has a population of {country.population} people.
                                                </p>
                                            </div>
                                        </>
                                    );
                                })}
                            < /div>
                        </section>

                        <section className="search-function">
                            <h1>Search Country Information</h1>
                            <img src={globe} alt="wereldbol dat draait"/>
                            <form className="search-form" onSubmit={fetchSingleCountry}>
                            <input
                                type="text"
                                placeholder="bijvoorbeeld Nederland of Peru"
                                id="search-field"
                                name="search"
                                value={searchValue}
                                onChange={(event) => {
                                    setSearchValue(event.target.value);
                                    console.log(event.target.value);
                            }}
                            />
                            <button type="submit" >zoek</button>

                            </form>

                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}

export default App
