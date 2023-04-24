export default class FetchCountries {
  constructor() {
    this.country = '';
  }

  fetchCountries() {
    const fields = '?fields=name,capital,population,flags,languages';
    const url = `https://restcountries.com/v3.1/name/${this.country}${fields}`;

    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  get countryName() {
    return this.country;
    
  }

  set countryName(cntr) {
    this.country = cntr;
  }
}
