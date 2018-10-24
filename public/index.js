$('.getExpertInfoBtn').on('click', () => {
  console.log('Button listener works');
  $.ajax({
    type: 'GET',
    url: `/api/expert`,
    success: (response) => {
     $('.expertInfo').html(response);
    }
  });
});

// $('.getExpertInfoBtn').on('click', () => {
//   console.log('Button listener works');
//   $.ajax({
//     type: 'GET',
//     url: `/api/experts/5bcd5e0529029810746fc790`,
//     success: (response) => {
//      $('.expertInfo').html(response);
//     }
//   });
// });