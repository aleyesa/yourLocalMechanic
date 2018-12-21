//when client logs in...
const clientProfile = () => {
  window.sessionStorage.setItem('currUserId', '5c04d91aa127d60a14dacc02');
  let data = {
    'sender.client': window.sessionStorage.getItem('currUserId')
  }
  populateClientInfo();
  populateMessage(data);
  updateClientInfo();
};

//when car shop owner logs in...
const carShopOwnerProfile = () => {
  const csoId = sessionStorage.getItem('currUserId');
  const authToken = sessionStorage.getItem('csoToken');
  //hold owner id to session storage.

  populateCarShopOwnerInfo(csoId, authToken);

  
  $('.messageSection').on('click', '.msgThread', function() {
    // event.preventDefault();
    // event.stopPropagation();

    const selClientId = $(this).children('p[hidden]').text();

    let data = {
      'carShop': csoId,
      'client': selClientId
    };
    populateMessage(data, authToken);

  });

  updateCarShopOwnerInfo();

};

const populateCarShopOwnerInfo = (csoId, authToken) => {
  $.ajax({
    type: "GET",
    url: `/api/carshopowner/${csoId}`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    success: function (res) {

    let specialtiesHtml = '';
    let specDescription = '';
    let clients = '';

    //populate the specialties:
    res.carShopInfo.specialties.forEach(specialty => {
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
        id="repair" placeholder="${res.carShopInfo.specialties[0].repair}"
        />
        ${specDescription}
        <label for="cost">Cost:</label>
        <input 
        type="text" name="cost" 
        id="cost" placeholder="${res.carShopInfo.specialties[0].cost}"
        />
      `
    });

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

      $('.carShopSection').html(
        `
        <form>
          <label for="carShop">Car Shop Name:</label>
          <input 
            type="text" name="carShop" 
            id="carShop" placeholder="${res.carShopInfo.shopName}"
          />
          <label for="phone">Car Shop Phone:</label>
          <input 
            type="text" name="phone" 
            id="phone" placeholder="${res.carShopInfo.carShopPhone.phone}"
          />
          <label for="shopEmail">Car Shop Email:</label>
          <input 
            type="text" name="shopEmail" 
            id="shopEmail" placeholder="${res.carShopInfo.shopEmail}"
          />
          <label for="streetAddress">Street Address:</label>
          <input 
            type="text" name="streetName" 
            id="streetName" placeholder="${res.carShopInfo.location.address.streetAddress}"
          />
          <label for="city">City:</label>
          <input 
            type="text" name="city" 
            id="city" placeholder="${res.carShopInfo.location.address.city}"
          />
          <label for="state">State:</label>
          <input 
            type="text" name="state" 
            id="state" placeholder="${res.carShopInfo.location.address.state}"
          />
          <label for="zipcode">Zipcode:</label>
          <input 
            type="text" name="zipcode" 
            id="zipcode" placeholder="${res.carShopInfo.location.address.zipcode}"
          />
    
    
          ${specialtiesHtml}
          <input type="button" name="addSpecialties" id="addSpecialties" value="Add Specialties">
    
          <label for="labor">Labor:</label>
          <input 
            type="text" name="labor" 
            id="labor" placeholder="${res.carShopInfo.labor}"
          />
          <input type="submit" id="updateShopBtn" value="Update">
        </form>
        `
        );

        
        res.clientMessages.forEach(client => {
            
          clients +=
          `
          <section class="client">
            <button class="msgThread">
              <p hidden>${client._id}</p>
              <p>${client.firstName} ${client.lastName}</p>
            </button>
          </section>
          `
        });

        $('.messageSection').html(clients);
      
      if(res.carShopInfo._id) {
        sessionStorage.setItem('carShopId', res.carShopInfo._id);
      }
    }
  });
};

const populateClientInfo = (clientId, authToken) => {
  $.ajax({
    type: "GET",
    url: `/api/client/${clientId}`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
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
    }
    
  });
};

const populateMessage = (data, authToken) => {
  $.ajax({
    type: 'GET',
    url: `/api/message/thread`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    data: data,
    success: (res) => {
      let messagesHtml = '';
      res.forEach(message => {
        if(message.sender.client) {

          messagesHtml +=
          `
          <section class="carShopMsg">
            <p>From: ${message.sender.client.username}</p>
            <p>To: ${message.receiver.carShop.username}</p>
            <p>Time: ${message.timestamp}</p>
            <p>Subject: ${message.subject}</p>
            <p>Message: ${message.message}</p>
            <button class="editMsg">Edit</button>
            <button class="delMsg">Delete</button>
          </section>
          `;
      
        } else {

          messagesHtml +=
          `
          <section class="clientMsg">
            <p>From: ${message.sender.carShop.username}</p>
            <p>To: ${message.receiver.client.username}</p>
            <p>Time: ${message.timestamp}</p>
            <p>Subject: ${message.subject}</p>
            <p>Message: ${message.message}</p>
            <button class="editMsg">Edit</button>
            <button class="delMsg">Delete</button>
          </section>
          `;
        }

      });

      $('.messageThread').html(
      `
        <button class="addMsg">Add Message</button>
        <button class="delMsg">Delete</button>
        ${messagesHtml}
      `
        );

    }
  });
};

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