//when client logs in...
const clientProfile = () => {
  const clientId = sessionStorage.getItem('clientId');
  const authToken = sessionStorage.getItem('clientToken');
  let newMsgRecSend = {};

  populateClientInfo(clientId, authToken);

  let selCsoId = '';

    $('.messageSection').on('click', '.msgThread', function() {

      selCsoId = $(this).children('p[hidden]').text();

      newMsgRecSend = {
        "sender": {
          "client": clientId
        },
        "receiver": {
          "carShop": selCsoId 
        }
      };

      populateMessage(selCsoId, clientId, authToken);
    });

    $('.messageThread').on('submit', () => {
    event.preventDefault();


    newMsgRecSend.subject = $('.subject').val();
    newMsgRecSend.message = $('.newMsg').val();
    
    addMessage(newMsgRecSend, authToken);
    populateMessage(selCsoId, clientId, authToken);

  });

  $('.messageThread').on('click', '.delMsg', function(event) {
    let msgId = $(this).children('p[hidden]').text();
    getMessageById(msgId, 'client', authToken);
  });

  $('.messageSection').on('click', '.delConversation', function(event) {
    const carShop = $(this).siblings('.msgThread').find('p[hidden]').text();

    delConversation(clientId, carShop, authToken);

  });

  updateClientInfo(clientId, authToken);

};

//when car shop owner logs in...
const carShopOwnerProfile = () => {

  const csoId = sessionStorage.getItem('csoId');
  const authToken = sessionStorage.getItem('csoToken');
  let newMsgRecSend = {};

  populateCarShopOwnerInfo(csoId, authToken);
  deleteCarShop();
  addCarShop();

  let selClientId = '';
  
    $('.messageSection').on('click', '.msgThread', function() {

      selClientId = $(this).children('p[hidden]').text();

      newMsgRecSend = {
        "sender": {
          "carShop": csoId
        },
        "receiver": {
          "client": selClientId
        }
      };

      populateMessage(csoId, selClientId, authToken);
    });


  $('.messageThread').on('submit', () => {
    event.preventDefault();


    newMsgRecSend.subject = $('.subject').val();
    newMsgRecSend.message = $('.newMsg').val();
    
    addMessage(newMsgRecSend, authToken);

    populateMessage(csoId, selClientId, authToken);

  });

  $('.messageThread').on('click', '.delMsg', function(event) {
    let msgId = $(this).children('p[hidden]').text();
    getMessageById(msgId, 'carShop', authToken);
  });

  $('.messageSection').on('click', '.delConversation', function(event) {
    const client = $(this).siblings('.msgThread').find('p[hidden]').text();

    delConversation(client, csoId, authToken);

  });

  updateCarShopOwnerInfo();
  updateCarShop();

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
    let uCurrSpecHtml = '';
    let uCurrSpecDesc = '';
    let specDescription = '';
    let clients = '';

    console.log(res);

      $('.userSection').html(
      `
      <p class="userId" hidden>${res._id}</p>
      <form class="mainCarShopInfo">
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
        <a href="profile.html"><input type="submit" id="updateUserBtn" value="Update"/></a>
      </form>
      `
      );

      if(res.carShopInfo) {
        //populate the specialties:
          res.carShopInfo.specialties.forEach(specialty => {
            specDescription = '';
            uCurrSpecDesc = '';
            specialty.description.forEach(description => {
              specDescription += `
              <label for="specialty">Specialty:</label>
              <input readonly
                type="text" name="specialty" 
                id="description" placeholder="${description}"
              />
              `;
              uCurrSpecDesc += `
              <h2>Specialty:</h2>
              <p id="uDesc">${description}</p>
              `;
            });

            specialtiesHtml += `
              <label for="repair">Repair:</label>
              <input 
              type="text" name="repair" 
              id="repair" placeholder="${specialty.repair}"
              />
              ${specDescription}
              <label for="cost">Cost:</label>
              <input 
              type="text" name="cost" 
              id="cost" placeholder="${specialty.cost}"
              />
            `
            uCurrSpecHtml += `
            <li>
              <h2>Repair:</h2>
              <p id="specId"hidden>${specialty._id}</p>
              <p id="uRepair">${specialty.repair}
              <button id="uDelSpecialty">X</button>
              </p>
              ${uCurrSpecDesc}
              <p>Cost:</p>
              <p id="uCost">${specialty.cost}</p>
            </li>
            `;
        });
    
        
        $('.carShopSection').html(
          `
          <p class="carShopId" hidden>${res.carShopInfo._id}</p>
          <button id="backBtn" hidden><a href="carShopProfile.html">Go Back</a></button>
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
            <p id="addressId" hidden>${res.carShopInfo.location._id}</p>
            <label for="streetAddress">Street Address:</label>
            <input 
              type="text" name="streetAddress" 
              id="streetAddress" placeholder="${res.carShopInfo.location.address.streetAddress}"
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
            <button class="editLocation">Update Location</button>

            <section class="currentSpecialtiesSection">
            ${specialtiesHtml}
            <label for="labor">Labor:</label>
            <input 
              type="text" name="labor" 
              id="labor" placeholder="${res.carShopInfo.labor}"
            />
            </section>
      
            <button class="editSpecialties">Edit Specialties</button>
            
            <a href="carShopProfile.html"><input type="submit" id="updateShopBtn" value="Update"></a>
          </form>

          <section class="uCurrSpecialtySection" hidden>
            <ul class="uCurrSpecList">
            ${uCurrSpecHtml}
            </ul>
            </section>
            <section class="editSpecialtySection" hidden>
              <fieldset>
              <legend>Add Specialties:</legend>
              <label for="repair">Repair:</label>
              <input 
              type="text" name="repair" 
              id="repair" placeholder="Type of repair"
              />
              <label for="description">Description:</label>
              <ul class="tempDesc"></ul>
              <input
                type="text" name="description" 
                id="description" placeholder="description of repair"
              />
              <input type="button" name="addDescr" id="addDescr" value="Add Description"/>
        
              <label for="cost">Cost:</label>
              <input 
              type="text" name="cost" 
              id="cost" placeholder="cost of repair"
              />
              <input type="button" name="addSpecialties" id="addSpecialties" value="Add Specialties">
              </fieldset>
            </section>

          <a href="carShopProfile.html"><button class="delCarShopBtn">Delete Car Shop</button></a>
          `
          );

          if(res.carShopInfo._id) {
            sessionStorage.setItem('carShopId', res.carShopInfo._id);
          }
      } else {

        $('.carShopSection').html(
          `
          <h2>Add your Car Shop:</h2>
          <form>
            <label for="carShop">Car Shop Name:</label>
            <input 
              type="text" name="carShop" 
              id="carShop" placeholder="car shop name"
            />
            <label for="phone">Car Shop Phone:</label>
            <input 
              type="text" name="phone" 
              id="phone" placeholder="111-222-3333"
            />
            <button class="addPhoneBtn">Add phone</button>
            <label for="shopEmail">Car Shop Email:</label>
            <input 
              type="text" name="shopEmail" 
              id="shopEmail" placeholder="emailname@email.com"
            />
            <label for="streetAddress">Street Address:</label>
            <input 
              type="text" name="streetName" 
              id="streetName" placeholder="1111 street name"
            />
            <label for="city">City:</label>
            <input 
              type="text" name="city" 
              id="city" placeholder="Gilbert"
            />
            <label for="state">State:</label>
            <input 
              type="text" name="state" 
              id="state" placeholder="AZ"
            />
            <label for="zipcode">Zipcode:</label>
            <input 
              type="text" name="zipcode" 
              id="zipcode" placeholder="85298"
            />
            <button class="addLocation">Add Location</button>
            <ul class="specialtySection">
            <h2>Specialties:</h2>
            <p>There is no specialties listed for this car shop</p>
            </ul>
            <fieldset>
            <legend>Add Specialties:</legend>
            <label for="repair">Repair:</label>
            <input 
            type="text" name="repair" 
            id="repair" placeholder="Type of repair"
            />
            <label for="description">Description:</label>
            <ul class="tempDesc"></ul>
            <input
              type="text" name="description" 
              id="description" placeholder="description of repair"
            />
            <input type="button" name="addDescr" id="addDescr" value="Add Description"/>

            <label for="cost">Cost:</label>
            <input 
            type="text" name="cost" 
            id="cost" placeholder="cost of repair"
            />
            <input type="button" name="addSpecialties" id="addSpecialties" value="Add Specialties">
            </fieldset>
            <label for="labor">Labor:</label>
            <input 
              type="text" name="labor" 
              id="labor" placeholder="cost of labor"
            />
            <a href="carShopProfile.html"><input type="submit" id="saveShopBtn" value="Save Car Shop"></a>
          </form>
          `
          );
      }

      res.clientMessages.forEach(client => {
          
        clients +=
        `
        <section class="client">
          <button class="msgThread">
            <p hidden>${client._id}</p>
            <p>${client.firstName} ${client.lastName}</p>
          </button>
          <button class="delConversation">X</button>
        </section>
        `
      });

      $('.messageSection').html(clients);
      
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
      let carShops = '';
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

        res.carShopMessages.forEach(carShop => {
            
          carShops +=
          `
          <section class="client">
            <button class="msgThread">
              <p hidden>${carShop._id}</p>
              <p>${carShop.firstName} ${carShop.lastName}</p>
            </button>
            <button class="delConversation">X</button>
          </section>
          `
        });

        $('.messageSection').html(carShops);
    }
    
  });
};

const populateMessage = (csoId, selClientId, authToken) => {
  $.ajax({
    type: 'GET',
    url: `/api/message/thread`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    data: {
      carShop: csoId,
      client: selClientId
    },
    success: (res) => {
      console.log(res);
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
            <button class="delMsg">
              <p hidden>${message._id}</p>
              <p>X</p>
            </button>
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
            <button class="delMsg">
              <p hidden>${message._id}</p>
              <p>X</p>
            </button>
          </section>
          `;
        }

      });

      messagesHtml +=
      `
      <form class="msgForm">
        <input type="text" class="subject" placeholder="subject"/>
        <input type="text" class="newMsg" placeholder="message"/>
        <button type="submit">
          <p>Send</p>
        </button>
      </form>
      `
      $('.messageThread').html(messagesHtml);

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
      url: `/api/carshopowner/${window.sessionStorage.getItem('csoId')}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('csoToken')}`
      },
      contentType: 'application/json',
      data: JSON.stringify(userInfo),
      success: res => {
        console.log(userInfo);
        console.log(res);
      }
    });
  });
};

const updateClientInfo = (clientId, clientToken) => {
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
      url: `/api/client/${clientId}`,
      headers: {
      Authorization: `Bearer ${clientToken}`
      },
      contentType: 'application/json',
      data: JSON.stringify(userInfo),
      success: res => {
        console.log(userInfo);
        console.log(res);
      }
    });
  });
};

const addCarShop = () => {
  /*
  To add a car shop we need:

  To add the car shop info which includes:
  - car shop name
  - car shop owner name
  - shop email
  - car shop phone
  - location
  - An array of specialties[DONE]
  - labor price

  -once the user has added all the information they can save the car
  -shop
  -Then once we have the object of all the required information
  we can do an ajax request from our car shop api to create the
  car shop for the car shop owner.
  */

  let specialties = [];
  let specialtyHtml = '';
  let descHtml = '';
  let description = [];
  let phoneId = '';
  let locationId = '';

  const csoToken = sessionStorage.getItem('csoToken');

  /*
  -create an event listener that checks if user has clicked on the submit
  button(aka #saveShopBtn)
  */

  //request for adding phone
  $('.carShopSection').on('click', '.addPhoneBtn', () => {
    event.preventDefault();
    
    console.log('phone button has been pressed');

    $.ajax({
      type: 'POST',
      url: `/api/phone`,
      headers: {
      Authorization: `Bearer ${sessionStorage.getItem('csoToken')}`
      },
      contentType: 'application/json',
      data: JSON.stringify(
        {
          phone: $('#phone').val()
        }),
      success: res => {
        phoneId = res._id;
        console.log('Phone was added successfully.');
      }
    });
  });

  //request for adding 
  $('.carShopSection').on('click', '.addLocation', () => {
    event.preventDefault();
    const streetName = $('#streetName').val();
    const city = $('#city').val();
    const state = $('#state').val();
    const zipcode = $('#zipcode').val();
    console.log('add location button works');
    $.ajax({
      type: 'POST',
      url: `/api/address`,
      headers: {
      Authorization: `Bearer ${sessionStorage.getItem('csoToken')}`
      },
      contentType: 'application/json',
      data: JSON.stringify(
        {
          address: {
            streetAddress: streetName,
            city: city,
            state: state,
            zipcode: zipcode
          }
        }),
      success: res => {
        locationId = res._id;
        console.log('Location was added successfully.');
      }
    });
    
  });


  $('.carShopSection').on('submit', () => {
    // event.preventDefault();
 /*
  -this event listener gets the values of the required info and updates
  the html, plus we have an object of the carshop that we will send 
  to our api to create or update the car shop.
  */
  
    const carShopName = $('#carShop').val();
    const shopEmail = $('#shopEmail').val();

    const labor = $('#labor').val();
    // console.log(locationId);
    console.log(specialties);

    const carShopInfo = 
    {

      shopName: carShopName,
      carShopOwner: sessionStorage.getItem('csoId'),
      shopEmail: shopEmail,
      carShopPhone: phoneId,
      location: locationId,
      specialties: specialties,
      labor: labor

    }

    console.log(specialties);

    console.log(carShopInfo);
    console.log('save car shop event listener is working.');

    $.ajax({
      type: 'POST',
      url: `/api/carshop`,
      headers: {
      Authorization: `Bearer ${sessionStorage.getItem('csoToken')}`
      },
      contentType: 'application/json',
      data: JSON.stringify(carShopInfo),
      success: res => {
        console.log(res);
        console.log('Car Shop was added successfully.');
      }
    });

  });

  $('.carShopSection').on('click', '#addDescr', () => {
    event.preventDefault();
    description.push($('#description').val());
    console.log(description);

    description.forEach((descr) => {
      descHtml +=
      `
      <li>
        <p>${descr}</p>
        <button id="delTempDesc">X</button>
      </li>
      `;
    });

    $('.tempDesc').html(descHtml);

    descHtml = '';
    
    $('#description').val('');

    //find all entries of the item thats being deleted, pop, then reintroduce to array.
  });

  $('.carShopSection').on('click', '#delTempDesc', function(event) {
    event.preventDefault();
    
    let selDesc = $(this).siblings('p').text();
    let notselDesc = description.filter(d => d != selDesc); 
    let popSameSelDesc = description.filter(d => d === selDesc);
    $(this).closest('li').remove();
    popSameSelDesc.pop();
    description = notselDesc.concat(popSameSelDesc);
    console.log(description);

  });

  $('.carShopSection').on('click', '#addSpecialties', function(event) {
    event.preventDefault();
    let repair = $('#repair').val();
    let cost = $('#cost').val();

    specialties.push({
      repair,
      description,
      cost
    }
    );

    console.log(specialties);

    specialties.forEach((specialty1, index) => {
      
      specialty1.description.forEach(d => {
        descHtml += 
        `
          <li>${d}</li>
        `
      });
      console.log(descHtml);


      specialtyHtml += 
      `
      <li class="specialty">
        <p id="index" hidden>${index}</p>
        <p class="repair" >${specialty1.repair}</p>
        <ul>
        ${descHtml}
        </ul>
        <p class="cost">${specialty1.cost}</p>
        <input type="button" class="delSpecialty" value="Remove specialty"/>
      </li>
      `;

      descHtml = '';
      
    });

    if(specialties.length == 0) {
      $('.specialtySection').html(
      `
      <h2>Specialties:</h2>
      <p>There is no specialties listed for this car shop</p>
      `
      );
    } else {
      $('.specialtySection').html(
        `
        <h2>Specialties:</h2>
        ${specialtyHtml}
        `);
    }

    description = [];
    console.log(description);
    $('#repair').val('');
    $('#cost').val('');
    $('.tempDesc li').remove();
    descHtml = '';
    specialtyHtml = '';

    /*
      instead of adding the specialties right then and there
      we should create a function present in this function that does the specialty html adding
      so that we can refresh the index of the specialty, so that the index does reset from 0 +
    */

    console.log(specialties);
  });

  $('.carShopSection').on('click', '.delSpecialty', function() {
    event.preventDefault();
    // $(this).closest('p').remove();
    // $(this).parent().remove();

      //Tasks:
  //1) Conditional statement to check if specialty list is empty
  //  if it is put in a paragraph saying no specialties added.
  //2) remove specialty from array here:
  //get all values first, then use .includes.
  let currIndex = $(this).parent().find('#index').text();
  let currRepair = $(this).parent().find('#repair').text();
    
  // console.log(specialties.filter(specialty => { 
  //     specialty.index != currIndex;
  //   }));
  console.log(specialties);
  console.log(currRepair);
  const updatedSpecialties = specialties.filter((s, i) => 
    // console.log(s.repair);
    // s.repair !== currRepair
    currIndex != i
);

  //adding a specialty doesnt show the repair name.
  console.log(specialties[currIndex]);
  console.log(updatedSpecialties);
  // console.log($(this).parent().remove());
  specialties = updatedSpecialties;

  specialties.forEach((specialty1, index) => {
      
    specialty1.description.forEach(d => {
      descHtml += 
      `
        <li>${d}</li>
      `
    });
    console.log(descHtml);


    specialtyHtml += 
    `
    <li class="specialty">
      <p id="index" hidden>${index}</p>
      <p class="repair" >${specialty1.repair}</p>
      <ul>
      ${descHtml}
      </ul>
      <p class="cost">${specialty1.cost}</p>
      <input type="button" class="delSpecialty" value="Remove specialty"/>
    </li>
    `;

    descHtml = '';
    
  });

  //if specialties array is empty remove whole spec section and input that there is no specialties shown in car shop
  console.log(specialtyHtml);
  console.log(specialties);

  if(specialties.length === 0) {
    $('.specialtySection').html(
    `
    <h2>Specialties:</h2>
    <p>There is no specialties listed for this car shop</p>
    `
    );
    console.log('no specialties listed.');
  } else {
    $('.specialtySection').html(
      `
      <h2>Specialties:</h2>
      ${specialtyHtml}
      `);
      console.log('there are specialties listed');
      console.log(specialties);
  }

  specialtyHtml = '';
  });

  

};

const updateCarShop = () => {

  //create a variable that holds current array of specialties:
  const currSpecialties = [];

  
  $('.carShopSection').on('click', '.editLocation', () => {

    event.preventDefault();
    const carShopForm = $('.carShopSection form');
    const carShop = {};
    const carShopLocation = {};

    for(let i = 0; i < carShopForm[0].length; i++){
      if(carShopForm[0][i].type === 'text'){
        if(carShopForm[0][i].value){
          carShop[carShopForm[0][i].id] = carShopForm[0][i].value;
        } 
      }
    };

    console.log(carShop);

    if(carShop.streetAddress) {
      carShopLocation.streetAddress = carShop.streetAddress;
    }

    if(carShop.city){
      carShopLocation.city = carShop.city;
    }

    if(carShop.state) {
      carShopLocation.state = carShop.state;
    }

    if(carShop.zipcode) {
      carShopLocation.zipcode = carShop.zipcode;
    }

    const currentAddressInfo = {
        streetAddress: $('#streetAddress').attr('placeholder'),
        city: $('#city').attr('placeholder'),
        state: $('#state').attr('placeholder'),
        zipcode: $('#zipcode').attr('placeholder')
    };

    const updatedCS = Object.assign(currentAddressInfo, carShop);

    $.ajax({
      type: 'PUT',
      url: `/api/address/${$('#addressId').text()}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('csoToken')}`
        },
      contentType: 'application/json',
      data: JSON.stringify({
        address: updatedCS
      }),
      success: res => {
        console.log(res);
      }
    });
  });

  $('.carShopSection').on('click', '.editSpecialties', () => {
    event.preventDefault();
    console.log('edit specialties button has been pressed.');
    const uSpecialty = $('.uCurrSpecList');
    console.log(uSpecialty[0]);
    // uSpecialty[0].forEach((specialty, i) => {
    //   console.log(specialty);
    // }); 
    $('.currentSpecialtiesSection').hide();
    $('.uCurrSpecialtySection').show();
    $('.editSpecialtySection').show();
    $('#backBtn').show();
    $('.carShopSection form').hide();
    $('.delCarShopBtn').hide();

    //add specialties code here
    const descriptionArray = [];
    const specs = {};
    $('.editSpecialtySection').on('click', '#addDescr', function() {
      event.preventDefault();
      let description = $('.editSpecialtySection #description').val();
      descriptionArray.push(description);
      console.log(descriptionArray);     
      console.log('add description button has been pressed.');
    });

    $('.editSpecialtySection').on('click', '#addSpecialties', function() {
      event.preventDefault();
      let repairName = $('.editSpecialtySection #repair').val();
      let costOfRepair = $('.editSpecialtySection #cost').val();
      let carShopId = $('.carShopSection').find('.carShopId').text();

      specs.repair = repairName;
      specs.description = descriptionArray;
      specs.cost = costOfRepair;
      console.log(specs);

      console.log('add specialties button has been pressed.');

      $.ajax({
        type: 'PUT',
        url: '/api/carshop/updateSpecialty',
        headers: {
          Authorization: `Bearer${sessionStorage.getItem('csoToken')}`
        },
        contentType: 'application/json',
        data: JSON.stringify({
          csId: carShopId,
          specs
        }),
        success: (res) => {
          console.log(res);
          let tempDescrHtml = '';
          let specialtyHtml = '';
          res.forEach(specialty => {
            console.log(specialty);
            specialty.description.forEach(descr => {
              tempDescrHtml += 
              `
                <p id="uDesc">${descr}</p>
              `;
            });
            specialtyHtml += 
            `
            <li>
                    <h2>Repair:${specialty.repair}</h2>
                    <p id="specId"hidden>${specialty._id}</p>
                    <p id="uRepair">
                    ${specialty.repair}
                    <button id="uDelSpecialty">X</button>
                    </p>
                    ${tempDescrHtml}
                    <p>Cost:</p>
                    <p id="uCost">${specialty.cost}</p>
            </li>
            `;
            tempDescrHtml = '';
          });

          $('.uCurrSpecialtySection').html(specialtyHtml);

    // $('.uCurrSpecialtySection .uCurrSpecList')
    // .append(
    //   `
    //       <li>
    //         <h2>Repair:</h2>
    //         <p id="specId"hidden></p>
    //         <p id="uRepair">
    //         <button id="uDelSpecialty">X</button>
    //         </p>
    //         <p>Cost:</p>
    //         <p id="uCost"></p>
    //       </li>
    //       `);
        }
      });
    });
    
    $('.uCurrSpecialtySection').on('click', '#uDelSpecialty', function(event) {
      event.preventDefault();
      let specId = $(this).parent().siblings('#specId').text();
      console.log($(this).parent().siblings().html());
      console.log('udeletespecialty has been pressed.');
      let carShopId = $('.carShopSection').find('.carShopId').text();
      console.log(carShopId);
      console.log(specId);

      $.ajax({
        type: 'DELETE',
        url: '/api/carshop/updateSpecialty',
        headers: {
          Authorization: `Bearer${sessionStorage.getItem('csoToken')}`
        },
        contentType: 'application/json',
        data: JSON.stringify({
          csId: carShopId,
          specialtyId: specId
        }),
        success: (res) => {

          currSpecHtml = '';
          console.log(res);
          res.forEach(specialty => {
            uCurrSpecDesc = '';
            specialty.description.forEach(descr => {
              uCurrSpecDesc += 
              `
                <h2>Specialty:</h2>
                <p id="uDesc">${descr}</p>
              `
            });
            currSpecHtml +=
            ` 
              <li>
              <h2>Repair:</h2>
              <p id="specId"hidden>${specialty._id}</p>
              <p id="uRepair">${specialty.repair}
              <button id="uDelSpecialty">X</button>
              </p>
              ${uCurrSpecDesc}
              <p>Cost:</p>
              <p id="uCost">${specialty.cost}</p>
              </li>
            `
          });

          console.log(currSpecHtml);
          $('.uCurrSpecList').html(currSpecHtml);
          console.log('specialty has been deleted');
          specId = "";
          console.log(specId);
        }
      });
    });
   
  });


    const updateCSInfo = () => {
       $('.carShopSection').on('submit', function() {
         event.preventDefault();
        console.log('update button has been pressed.');
        let labor = $(this).find('.currentSpecialtiesSection #labor').val();
        let carShopName = $(this).find('form #carShop').val();
        let carShopEmail = $(this).find('form #shopEmail').val();
        console.log(carShopEmail);
        let data = {};

        console.log(carShopName);
  
        if(!labor) {
          console.log('labor field is empty');
        } else {
          data.labor = labor;
          console.log(data);
        }

        if(!carShopName) {
          console.log('carShop field is empty');
        } else {
          data.shopName = carShopName;
          console.log(data);
        }

        if(!carShopEmail) {
          console.log('carShop Email field is empty');
        }else {
          data.shopEmail = carShopEmail;
          console.log(data);
        }

        $.ajax({
          type: 'PUT',
          url: `/api/carshop/${$('.carShopId').text()}`,
          headers: {
          Authorization: `Bearer ${sessionStorage.getItem('csoToken')}`
          },
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: res => {
            console.log(res);
          }
        });

    });
  };




};
  const deleteCarShop = () => {
    $('.carShopSection').on('click', '.delCarShopBtn', () => {
      // event.preventDefault();
      console.log('Delete Car Shop Button works.');
      console.log($('.carShopId').text());
      $.ajax({
        type: 'DELETE',
        url: `/api/carshop/${$('.carShopId').text()}`,
        headers: {
        Authorization: `Bearer ${sessionStorage.getItem('csoToken')}`
        },
        success: res => {
          console.log(res);
        }
      });

    });
  };

const getMessageById = (msgId, currUserType, authToken) => {
  let setRemovedMsg = {};
  $.ajax({
    type: 'GET',
    url: `/api/message/${msgId}`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    success: (res) => {

      if(res.sender[currUserType]){
        setRemovedMsg = {
          'sender.removedMsg': true
        };
      } else {
        setRemovedMsg = {
          'receiver.removedMsg': true
        };
      }
      console.log(setRemovedMsg);
    }
  });

};

const addMessage = (newMsgRecSend, authToken) => {

  $.ajax({
    type: 'POST',
    url: `/api/message`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    contentType: 'application/json',
    data: JSON.stringify(newMsgRecSend),
    success: res => {
      console.log(res);
    }
  });

};

const updateMsg = (msgId, currUserId, authToken) => {

  // $.ajax({
  //   type: 'PUT',
  //   url: `/api/message${msgId}`,
  //   headers: {
  //     Authorization: `Bearer ${authToken}`
  //   },
  //   contentType: 'application/json',
  //   data: JSON.stringify({}),
  //   success: () => {

  //   }

  // });

};

const delMsg = (msgId, authToken) => {

  $.ajax({
    type: 'DELETE',
    url: `/api/message${msgId}`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: () => {

    }

  });

};

const delConversation = (client, carShop, authToken) => {

    $.ajax({
      type: 'DELETE',
      url: `api/message/thread`,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      contentType: 'application/json',
      data: JSON.stringify({
        carShop: carShop,
        client: client
      }),
      success: (res) => {
        console.log(res);
      }
    });

};

const runApi = () => {
  if(sessionStorage.getItem('clientId'))
  {
    clientProfile();
  } else {
    carShopOwnerProfile();
  }

};

runApi();

