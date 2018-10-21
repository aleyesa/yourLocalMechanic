import {
  Expert,
  Inbox,
  Inquire,
  Bill
} from './model';

//testing
//Query to get all Experts and its information
const getAllExperts = (req, res) => {
  Expert.find()
  .then(experts => {
    res.json(experts);
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
      res.json(expert.expertInfo);
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