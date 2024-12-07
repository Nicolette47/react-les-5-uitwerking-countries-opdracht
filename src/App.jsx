import React from 'react';
import './App.css';
import axios from 'axios';
import worldmap from './assets/world_map.png';
import continentColor from './helpers/isContinentColor.js';


function App() {

    const [countries, setCountries] = React.useState([]);
    const [showButton, setShowButton] = React.useState(true);
    const [error, toggleError] = React.useState('');

    async function fetchCountries() {
        toggleError(false);
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            console.log(response.data);
            setCountries(response.data);
            setShowButton(false);
        } catch (e) {
            console.log(error);
            toggleError(true);
        }
    }


    return (
        <>
            <div className="outer-container">
                <div className="inner-container">
                    <img src={worldmap} alt="kaart van de wereld"/>
                    {showButton &&
                        <button type="button" onClick={fetchCountries}>Klik hier en laat je verrassen </button>
                    }
                    {error && <p className="error-message"> Er is iets mis gegaan met het ophalen van de gegevens.
                        Probeer het opnieuw </p>
                    }

                    <div className="card-container">

                            {countries.map((country) => {
                            return (
                                <>

                                    <div key={country.cca3} className="country-card">
                                        <div className="wrapper">
                                            <img src={country.flags.png} alt={`Vlag van ${country.name.official}`}
                                                 className="country-flag"/>

                                            <h3 className={`${continentColor(country)} country-name`}>{country.name.official}</h3>
                                        </div>

                                        <p>
                                            has a population of {country.population} people.
                                        </p>
                                    </div>
                                </>
                            );
                        })
                        }
                    < /div>
                </div>
            </div>
        </>
    )
}

export default App
