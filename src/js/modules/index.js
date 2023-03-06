
let f = document.querySelector('#nationalites');

function getNationalities() {
  const nationalities = [
    'American', 
    'British', 
    'Canadian', 
    'Chinese', 
    'French', 
    'German', 
    'Indian', 
    'Italian', 
    'Japanese', 
    'Mexican', 
    'Russian', 
    'Spanish', 
    'Other'
  ];

  const nationalitiesOptions = nationalities.map((nationality) => {
    return `<option value=${nationality}>${nationality}</option>`;
  });

  f.innerHTML = nationalitiesOptions.join('');
}

export {
  getNationalities,
}
