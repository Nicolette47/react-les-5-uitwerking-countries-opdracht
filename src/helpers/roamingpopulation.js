
function roamingPopulation(number) {
    const numberInMillions = Math.round(number / 1000000);
    return `${numberInMillions} million`
}

export default roamingPopulation;