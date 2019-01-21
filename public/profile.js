//when client logs in...
const clientProfile = () => {
  const clientId = sessionStorage.getItem('clientId');
  const authToken = sessionStorage.getItem('clientToken');
  let newMsgRecSend = {};

  populateClientInfo(clientId, authToken);

  $('.messageSection').on('click', '.msgThread', function() {

    const selCsoId = $(this).children('p[hidden]').text();

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
  addCarShop();

  $('.messageSection').on('click', '.msgThread', function() {

    const selClientId = $(this).children('p[hidden]').text();

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

  });

  $('.messageThread').on('click', '.delMsg', function(event) {
    let msgId = $(this).children('p[hidden]').text();
    getMessageById(msgId, 'carShop', authToken);
  });

  $('.messageSection').on('click', '.delConversation', function(event) {
    const client = $(this).siblings('.msgThread').find('p[hidden]').text();

    delConversation(client, csoId, authToken);

  });

  // updateCarShopOwnerInfo();

};

const populateCarShopOwnerInfo = (csoId, authToken) => {
  $.ajax({
    type: "GET",
    url: `/api/carshopowner/${csoId}`,
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    success: function (res) {

    console.log(res);  
    let specialtiesHtml = '';
    let specDescription = '';
    let clients = '';

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

      if(res.carShopInfo) {
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
            <input type="submit" id="saveShopBtn" value="Save Car Shop">
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

  /*
  -create an event listener that checks if user has clicked on the submit
  button(aka #saveShopBtn)
  */

  $('.carShopSection').on('submit', () => {
    event.preventDefault();
 /*
  -this event listener gets the values of the required info and updates
  the html, plus we have an object of the carshop that we will send 
  to our api to create or update the car shop.
  */

    console.log('save car shop event listener is working.');
  });

  // const carShop = {
  //   shopName: 
  //   carShopOwner:
  // }

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

  //if no li in unordered list of specialties input a p element that says there is none shown.

};

const updateCarShop = () => {

  event.preventDefault();

  const carShopForm = $('.carShopSection form');
  const formLength = carShopForm[0].length;
  const carShop = {};

  for(let i = 0; i < formLength; i++){
    if(carShopForm[0][i].type === 'text'){
      if(carShopForm[0][i].value){
        carShop[carShopForm[0][i].id] = carShopForm[0][i].value;
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

