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

//testing
//Query to get all Experts and its information


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
  getAllExperts,
  registerExpert,
  deleteExpert,
  getSpecificExpert,
  updateExpertInfo,
  showExpertInfo
};