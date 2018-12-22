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

  console.log(address);

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
          _id,
          shopName,
          carShopOwner,
          shopEmail,
          labor
        } = info;

        const {
          streetAddress,
          city,
          state,
          zipcode
        } = info.location.address;

        carshops += 
        `
        <section class="carShop">
          <p>${shopName}</p>
          <p>${carShopOwner.firstName} ${carShopOwner.lastName}</p>
          <p>${shopEmail}</p>
          <p>${streetAddress} 
            ${city}
            ${state}
            ${zipcode}   
          </p>
          <p>Specialties Here</p>
          <p>${labor}</p>
          <button class="sendMsg">
            <p hidden>${carShopOwner._id}</p>
            <p>Send Message</p>
          </button>
        </section>
        `
      });

      $('.carShops').html(carshops);
    }
  });
});

let csoId = '';

$('.carShops').on('click', '.sendMsg', function(event) {
  if(sessionStorage.getItem('clientToken')) {
  csoId = $(this).children('p[hidden]').text();

  $('.msgSystem').css('display', 'block');

  } else {
    console.log('Please sign in or register on a client account to send messages to car shops.');
    console.log('Register here.');
  }

});

$('.msgSystem').on('submit', () => {
  event.preventDefault();

  let clientToken = sessionStorage.getItem('clientToken');
  let newMsgRecSend = {
    subject: $('.subject').val(),
    message: $('.newMsg').val(),
    'sender.client': sessionStorage.getItem('clientId'),
    'receiver.carShop': csoId
  
  };
  addMessage(newMsgRecSend, clientToken);
  $('.msgSystem').css('display', 'none');

});

