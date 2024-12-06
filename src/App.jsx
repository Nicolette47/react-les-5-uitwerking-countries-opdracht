import React from 'react';
import './App.css';
import axios from 'axios';
import worldmap from './assets/world_map.png';


function App() {

    const [countries, setCountries] = React.useState([]);
    const [showButton, setShowButton] = React.useState(true);

    async function fetchCountries() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            console.log(response.data);
            setCountries(response.data);
            setShowButton(false);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <div className="outer-container">
                <div className="inner-container">
                    <img src={worldmap} alt="kaart van de wereld"/>
                    {showButton &&
                        <button type="button" onClick={fetchCountries}>Klik hier en laat je verrassen</button>
                    }

                    <div>
                        {countries.map((country) => {
                            return (
                            <div key={country.cca3} className="country-card">
                                <div className="wrapper">
                                <img src={country.flags.png} alt={`Vlag van ${country.name.official}`}
                                     className="country-flag"/>


                                <h3 className="country-name">{country.name.official}</h3>
                                </div>

                                <p>
                                    has a population of {country.population} people
                                </p>
                            </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default App
