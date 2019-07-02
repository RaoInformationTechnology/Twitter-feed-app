const userService = require('../service/user.service.ts');

/** Add Hashtag */
AddTag = function (req, res) {
  const userData = {
    hash: req.body,
    email: req.body.email
  }
  userService.AddTag(userData).then((response) => {
    return res.status(200).json({ status: 1, message: response.message, data: response.data });
  }).catch((error) => {
    console.log('error:', error);
    return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
  });
}

/** Delete Hashtag */
DeleteHashtag = function (req, res) {
  const userDeletetag = {
    hashtag: req.body.hashtag,
    email: req.body.email
  }
  userService.DeleteHashtag(userDeletetag).then((response) => {
    return res.status(200).json({ status: 1, message: response.message, data: response.data });
  }).catch((error) => {
    console.log('error:', error);
    return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
  });
}

/** Update Hashtag */
UpdateHashtag = function (req, res) {
  const updateHashtag = {
    hashtag: req.body.hashtag,
    email: req.body.email
  }
  userService.UpdateHashtag(updateHashtag).then((response) => {
    return res.status(200).json({ status: 1, message: response.message, data: response.data });
  }).catch((error) => {
    console.log('error:', error);
    return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
  });
}

/** Display Hashtag */
GetHashTag = function (req, res) {
  const userGetHashtag = {
    email: req.params.email
  }
  userService.GetHashTag(userGetHashtag).then((response) => {
    return res.status(200).json({ status: 1, message: response.message, data: response.data });
  }).catch((error) => {
    console.log('error:', error);
    return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
  });
}

authenticateUser = function (req, res) {
  const userJWTToken = {
    email: req.body.email
  }
  userService.authenticateUser(userJWTToken).then((response) => {
    return res.status(200).json({ status: 1, message: response.message, data: response.data })
  }).catch((error) => {
    return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : ' server error' });
  })
}

module.exports = {
  AddTag: AddTag,
  DeleteHashtag: DeleteHashtag,
  UpdateHashtag: UpdateHashtag,
  GetHashTag: GetHashTag,
  authenticateUser: authenticateUser
}