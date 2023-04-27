import './css/styles.css';
import FetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import countrisMurkupLess10 from './templstes/countriesNum2-10.hbs';
import countrisMurkupFor1 from './templstes/onecountry.hbs';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.getElementById('search-box'),
  countryListEl: document.querySelector('.country-list'),
};

const DEBOUNCE_DELAY = 300;

const fetchCountriesClass = new FetchCountries();

refs.inputEl.addEventListener('input', debounce(onSerch, DEBOUNCE_DELAY));

function onSerch(event) {
  fetchCountriesClass.countryName = event.target.value.trim();
  if (!fetchCountriesClass.countryName) {
    refs.countryListEl.innerHTML = '';
    return;
  }
  fetchCountriesClass
    .fetchCountries()
    .then(country => {
      if (country.length === 1) {
        country[0].languages = Object.values(country[0].languages).join(', ');

        appendCountrisMurkup(country, countrisMurkupFor1);
      } else if (country.length < 11) {
        appendCountrisMurkup(country, countrisMurkupLess10);
      } else if (country.length > 10) {
        refs.countryListEl.innerHTML = '';
        Notiflix.Notify.success(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      refs.countryListEl.innerHTML = '';
      error.message === '404'
        ? Notiflix.Notify.failure('Oops, there is no country with that name')
        : Notiflix.Notify.failure(`${error.message}`);
    });
}

function appendCountrisMurkup(countris, template) {
  refs.countryListEl.innerHTML = '';
  refs.countryListEl.insertAdjacentHTML('beforeend', template(countris));
}
