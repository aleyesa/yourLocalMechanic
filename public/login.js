
$('.login').on('submit', () => {
  event.preventDefault();

  //check whether the login submit button has been presses or the
  //sing up button

  console.log("event to login button works.");
});

const desc = [];
let descHtml = '';

$('.tester').on('submit', () => {
  event.preventDefault();
  let descVal = $('#description').val();
  desc.push(descVal);
  desc.forEach((description, index) => {
    descHtml += 
    `
      <input type="text" id="detail${index}" placeholder="${description}"/>
    `
  });
  console.log(desc);

  $('.tester form #dLabel').after(descHtml);
});

