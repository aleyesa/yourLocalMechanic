import {
  Expert,
  Inbox,
  Inquire,
  Bill
} from './model';

//Tasks:
/*
  -get only expert info when querying the list of experts
  -figure out the best way to filter expert when a client is looking by specialty 
  -and location
*/
const findExpertByLocation = (req, res) => {
  let expertListHtml = '';
  Expert.find((err, expert) => {
    expert.forEach(expert => {
      if(expert.carShopInfo.location.address.zipcode === req.params.zipcode){
          expertListHtml += expert.expertInfoHtml;
        }
    });
    res.json(expertListHtml);
  });
};

const findExpertByCityStateZipcode = (req, res) => {
  Expert.find({
    carShopInfo: { 
      location: {
        address: {
          city: req.params.city,
          state: res.params.state,
          zipcode: req.params.zipcode
        }
      }    
    },
  })
  .then(expert => res.json(expert));
};

//Function used to show list of experts when client searches for a car shop
const getAllExperts = (req, res) => {
  Expert.find()
  .then(experts => {
    let expertListHtml = '';

    experts.forEach(expert => {
      expertListHtml += expert.expertInfoHtml;
    });

    res.json(expertListHtml);
  });
};

const registerExpert = (req, res) => {
  Expert
  .create(req.body)
  .then(expert => {
    res.json(expert);
  });
};

const deleteExpert = (req, res) => {
  Expert
  .findByIdAndDelete(req.params.id)
  .then(expert => res.json(`${expert.username} has been deleted`));
};

const getSpecificExpert = (req, res) => {
  Expert
  .findById(req.params.id)
  .then(expert => {
    res.json(expert);
  });
};

const updateExpertInfo = (req, res) => {
  Expert
  .findByIdAndUpdate(req.params.id, req.body)
  .then(updatedItems => {
    res.json(updatedItems);
  });
};

//shows only the necessary info of the expert
const showExpertInfo = (req, res) => {
  Expert
  .find()
  .then(expert => {
    expert.forEach(expert => {
      res.json(expert.expertInfoHtml);
    });
  });
};

export {
  findExpertByLocation,

  getAllExperts,
  registerExpert,
  deleteExpert,
  getSpecificExpert,
  updateExpertInfo,
  showExpertInfo
};
