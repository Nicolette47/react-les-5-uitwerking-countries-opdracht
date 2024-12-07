// Totale actie
// als het land binnenkomt via de map methode, dan moet het controleren:
// 1 welk continent het is
// 2. op basis van continent de juiste class geven zodat het de goede kleur krijgt
// 3.de naam printen in de juiste kleur



function continentColor(country) {
    if (country.continents[0] === 'Europe') {
        return 'europe-color';
    } else if (country.continents[0] === 'Africa') {
        return 'africa-color';
    } else if ((country.continents[0] === 'South America') ||(country.continents[0] === 'North America')) {
        return 'america-color';
    } else if (country.continents[0] === 'Asia') {
        return 'asia-color';
    } else if (country.continents[0] === 'Oceania') {
        return 'oceania-color';
    } else {
        return 'default-color';
    }
}


export default continentColor;