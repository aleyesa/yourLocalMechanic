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

  // if(state == ){
  //   console.log(true);
  // }else{
  //   console.log(false);
  // }

  $.ajax({
    type: 'GET',
    url: `/api/carshop/${city}/${state}/${zipcode}`,
    success: (response) => {
      console.log(response);

    // let repairList = '';

    // response.specialties.forEach(repair => {
    //   repairList += 
    //   `
    //   <h3>${repair.repair}</h3>
    //   <p>${repair.description}</p>
    //   <p>${repair.cost}</p>
    //   `;
    // });

    //  $('.expertInfo').html(
    //    `
    //    <div>
    //    <p hidden>${response._id}<p>
    //    <h2>${response.carShopInfo.shopName}</h2>
    //    <p>${response.carShopInfo.representative}</p>
    //    <h3>Specialties</h3>
    //     ${repairList}
    //    <h3>Contact</h3>
    //    <p>${response.carShopInfo.contactInfo.email}</p>
    //    <p>${response.carShopInfo.contactInfo.phone}</p>
    //    <h3>Location</h3>
    //    <p>${response.carShopInfo.location.address.street}, 
    //      ${response.carShopInfo.location.address.city} 
    //      ${response.carShopInfo.location.address.state} 
    //      ${response.carShopInfo.location.address.zipcode}
    //    </p>
    //   </div>
    //    `
    //  );
    }
  });
});