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
  let formLength = form[0].childNodes.length;
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
      let carshops = '';

      response.map(info => {
        console.log(info);
        const {
          shopName,
          carShopOwner,
          shopEmail,
          labor
        } = info;

        const {
          street,
          city,
          state,
          zipcode
        } = info.location.address;

        carshops += 
        `
          <p>${shopName}</p>
          <p>${carShopOwner}</p>
          <p>${shopEmail}</p>
          <p>${street} 
            ${city}
            ${state}
            ${zipcode}   
          </p>
          <p>Specialties Here</p>
          <p>${labor}</p>
        `
      });

      $('.carShops').html(carshops);
    }
  });
});
