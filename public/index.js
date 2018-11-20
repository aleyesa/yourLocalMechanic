// import zipcodes from 'zipcodes';
//get value of specialties dropdown value
//get carShopFilter dropdown value
//use the dropdown filters to set object key?

// $('#carSpecialtiesFilter').on('click', () => {
//   let carSpecialtiesFilterDropDown = $('#carSpecialtiesFilter').val();
//   console.log(carSpecialtiesFilterDropDown);
// });

$('.carShopSearchForm').on('submit', () => {
  event.preventDefault();
  let form = $('.carShopSearchForm');


  let city = $('#cityTextField').val();
  let state = $('#stateTextField').val();
  let zipcode = $('#zipcodeTextField').val();
  let formLength = form[0].childNodes.length;

  //create an object that holds the address keys, and hold the
  //value of the address key
  const address = {};

  for(let i = 0; i < formLength; i++){
    if(form[0].childNodes[i].type === 'search'){
      address[form[0].childNodes[i].name] = form[0].childNodes[i].value;
    }
  }

  $.ajax({
    type: 'GET',
    url: `/api/carshop`,
    dataType: 'json',
    contentType: 'application/json',
    data: address,
    success: (response) => {
      console.log(response);
    }
  });
});

// JSON.stringify({
//   'zipcode': '85298'
// }