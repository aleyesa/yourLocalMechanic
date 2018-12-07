//when client logs in...
const clientProfile = () => {
  window.sessionStorage.setItem('currUserId', '5c04d91aa127d60a14dacc02');
  populateClientInfo();
  updateClientInfo();
};

//when car shop owner logs in...
const carShopOwnerProfile = () => {
  //hold owner id to session storage.
  window.sessionStorage.setItem('currUserId', '5c04162d42d8bf2e10da5982');
  populateCarShopOwnerInfo();
  updateCarShopOwnerInfo();
};

const populateCarShopOwnerInfo = () => {
  $.ajax({
    type: "GET",
    url: `/api/carshopowner/${window.sessionStorage.getItem('currUserId')}`,
    success: function (res) {
      console.log(res);
      $('.userSection').html(
      `
      <p class="userId" hidden>${res._id}</p>
      <form>
        <label for="firstName">First Name:</label>
        <input 
          type="text" name="firstName" 
          id="firstName" placeholder="${res.firstName}"
        />
        <label for="lastName">Last Name:</label>
        <input 
          type="text" name="lastName" 
          id="lastName" placeholder="${res.lastName}"
        />
        <label for="username">Username:</label>
        <input 
          type="text" name="username" 
          id="username" placeholder="${res.username}"
        />  
        <label for="password">password:</label>
        <input 
          type="text" name="password" 
          id="password" placeholder="${res.password}"
        />
        <input type="submit" id="updateUserBtn" value="Update"/>
      </form>
      `
      );
      
      if(res.carShopInfo._id) {
        window.sessionStorage.setItem('carShopId', res.carShopInfo._id);
      }
      populateCarShop();
      populateMessage();
    }
  });
};

const populateCarShop = () => {
  $.ajax({
    type: 'GET',
    url: `/api/carshop/${window.sessionStorage.getItem('carShopId')}`,
    success: (res) => {
      console.log(res);

      let specialtiesHtml = '';
      let specDescription = '';

    //populate the specialties:
    res.specialties.forEach(specialty => {
      specialty.description.forEach(description => {
        specDescription += `
        <label for="specialty">Specialty:</label>
        <input readonly
          type="text" name="specialty" 
          id="description" placeholder="${description}"
        />
        `
      });
      specialtiesHtml += `
        <label for="repair">Repair:</label>
        <input 
        type="text" name="repair" 
        id="repair" placeholder="${res.specialties[0].repair}"
        />
        ${specDescription}
        <label for="cost">Cost:</label>
        <input 
        type="text" name="cost" 
        id="cost" placeholder="${res.specialties[0].cost}"
        />
      `
    });
    
    $('.carShopSection').html(
    `
    <form>
      <label for="carShop">Car Shop Name:</label>
      <input 
        type="text" name="carShop" 
        id="carShop" placeholder="${res.shopName}"
      />
      <label for="phone">Car Shop Phone:</label>
      <input 
        type="text" name="phone" 
        id="phone" placeholder="${res.carShopPhone.phone}"
      />
      <label for="shopEmail">Car Shop Email:</label>
      <input 
        type="text" name="shopEmail" 
        id="shopEmail" placeholder="${res.shopEmail}"
      />

      <label for="streetNumber">Street Number:</label>
      <input 
        type="text" name="streetNumber" 
        id="streetNumber" placeholder="${res.location.address.street.streetNumber}"
      />
      <label for="streetName">Street Name:</label>
      <input 
        type="text" name="streetName" 
        id="streetName" placeholder="${res.location.address.street.streetName}"
      />
      <label for="city">City:</label>
      <input 
        type="text" name="city" 
        id="city" placeholder="${res.location.address.city}"
      />
      <label for="state">State:</label>
      <input 
        type="text" name="state" 
        id="state" placeholder="${res.location.address.state}"
      />
      <label for="zipcode">Zipcode:</label>
      <input 
        type="text" name="zipcode" 
        id="zipcode" placeholder="${res.location.address.zipcode}"
      />


      ${specialtiesHtml}
      <input type="button" name="addSpecialties" id="addSpecialties" value="Add Specialties">

      <label for="labor">Labor:</label>
      <input 
        type="text" name="labor" 
        id="labor" placeholder="${res.labor}"
      />
      <input type="submit" id="updateShopBtn" value="Update">
    </form>
    `
    );
    }
  });
};

const populateClientInfo = () => {
  $.ajax({
    type: "GET",
    url: `/api/client/${window.sessionStorage.getItem('currUserId')}`,
    success: function (res) {
      console.log(res);
      $('.userSection').html(
      `
      <p class="userId" hidden>${res._id}</p>
      <form>
        <label for="firstName">First Name:</label>
        <input 
          type="text" name="firstName" 
          id="firstName" placeholder="${res.firstName}"
        />
        <label for="lastName">Last Name:</label>
        <input 
          type="text" name="lastName" 
          id="lastName" placeholder="${res.lastName}"
        />
        <label for="username">Username:</label>
        <input 
          type="text" name="username" 
          id="username" placeholder="${res.username}"
        />  
        <label for="password">password:</label>
        <input 
          type="text" name="password" 
          id="password" placeholder="${res.password}"
        />
        <input type="submit" id="updateUserBtn" value="Update"/>
      </form>
      `
      );
      populateMessage();
    }
    
  });
};

const populateMessage = () => {
  $.ajax({
    type: 'GET',
    url: `/api/message/thread`,
    data: {
      senderCarshop: '5c04162d42d8bf2e10da5982'
    },
    success: (res) => {
      console.log(res);
      $('.messageSection').html(
        `
        <p>${res[0].message}</p>
        <p>${res[0].sender}</p>
        <p>${res[0].receiver}</p>
        <p>${res[0].timestamp}</p>
        `
      );
    }
  });
};

//then use the other request that finds the sender and 
//the receiver

//Update Profile:
/*
  - fields that the user is able to update
  - button that allows updating info
  - a call to the api to update the info.
*/

//Update Car shop owners user info

const updateCarShopOwnerInfo = () => {
  /*listen if the update button has been pressed
    if it has we should check the form if there is any input on the text fields
    if there is add it to an object,
    if there is field that are left empty, we should ignore.
  */
  $('.userSection').on('submit', () => {
    event.preventDefault();

    const ownerInfoForm = $('.userSection form');
    const formLength = ownerInfoForm[0].length;
    const userInfo = {};

    for(let i = 0; i < formLength; i++){
      if(ownerInfoForm[0][i].type === 'text'){
        if(ownerInfoForm[0][i].value){
          userInfo[ownerInfoForm[0][i].id] = ownerInfoForm[0][i].value;
        } 
      }
    };

    $.ajax({
      type: 'PUT',
      url: `/api/carshopowner/${window.sessionStorage.getItem('currUserId')}`,
      contentType: 'application/json',
      data: JSON.stringify(userInfo),
      success: res => {
        console.log(userInfo);
        console.log(res);
      }
    });
  });
};

const updateClientInfo = () => {
  $('.userSection').on('submit', () => {
    event.preventDefault();

    const userInfoForm = $('.userSection form');
    const formLength = userInfoForm[0].length;
    const userInfo = {};

    for(let i = 0; i < formLength; i++){
      if(userInfoForm[0][i].type === 'text'){
        if(userInfoForm[0][i].value){
          userInfo[userInfoForm[0][i].id] = userInfoForm[0][i].value;
        } 
      }
    };

    $.ajax({
      type: 'PUT',
      url: `/api/client/${window.sessionStorage.getItem('currUserId')}`,
      contentType: 'application/json',
      data: JSON.stringify(userInfo),
      success: res => {
        console.log(userInfo);
        console.log(res);
      }
    });
  });

};

const updateCarShop = () => {

  event.preventDefault();

  const userInfoForm = $('.userSection form');
  const formLength = userInfoForm[0].length;
  const userInfo = {};

  for(let i = 0; i < formLength; i++){
    if(userInfoForm[0][i].type === 'text'){
      if(userInfoForm[0][i].value){
        userInfo[userInfoForm[0][i].id] = userInfoForm[0][i].value;
      } 
    }
  };

  $.ajax({
    type: 'PUT',
    url: `/api/carshop/${window.sessionStorage.getItem('currUserId')}`,
    contentType: 'application/json',
    data: JSON.stringify(userInfo),
    success: res => {
      console.log(userInfo);
      console.log(res);
    }
  });
};

const runApi = () => {
  // clientProfile();
  carShopOwnerProfile();
};

runApi();