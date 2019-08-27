const userData = require("./userData.json");

module.exports = {
  getUser(req, res) {
    let { age, email, favorites } = req.query;
    let answer;
    if (age) {
      answer = userData.filter((element, index, arr) => {
        if (element.age < age) {
          return element;
        }
      });
    } else if (email) {
      answer = userData.filter((element, index, arr) => {
        if (element.email == email) {
          return element;
        }
      });
    } else if (favorites) {
      answer = userData.filter(element => {
        for (let i = 0; i < element.favorites.length; i++) {
          if (element.favorites[i] == favorites) {
            return element;
          }
        }
        return answer;
      });
    } else {
      answer = userData;
    }

    res.status(200).send(answer);
  },

  getUserId(req, res) {
    let { userId } = req.params;

    let answer = userData.filter((element, index) => {
      if (element.id === +userId) {
        return { ...element };
      }
    });
    if (!answer[0]) return res.status(404);
    res.status(200).send(answer[0]);
  },

  isAdmin(req, res) {
    let answer = userData.filter(element => {
      if (element.type == "admin") {
        return element;
      }
    });

    res.status(200).send(answer);
  },

  notAdmin(req, res) {
    let answer = userData.filter(element => {
      if (element.type != "admin") {
        return element;
      }
    });

    res.status(200).send(answer);
  },

  userType(req, res) {
    let { userType } = req.params;

    let answer = userData.filter(element => {
      if (element.type == userType) {
        return element;
      }
    });

    res.status(200).send(answer);
  },

  editUsers(req, res) {
    let { userId } = req.params;
    const {
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    } = req.body;

    console.log(
      "fafffa",
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    );

    let answer = {
      id: userId,
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    };

    //---------------------I GOT STUCK HERE
    //this was one attempt
    let updatedUser = userData
      .filter((element, index, arr) => {
        if (arr[index].id == userId) {
          arr.splice(index, 1, answer)
        }
      })

    //this was another
    // let updatedUser = userData
    //   .filter((element, index, arr) => {
    //     if (arr[index].id == userId) {
    //         arr[index] = answer
    //     }
    //   })

    res.sendStatus(200).send(updatedUser);
  },

  deleteUser(req, res) {
    let { userId } = req.params;

    for (var i = 0; i < userData.length; i++) {
      if (userData[i].id == userId) {
        userData.splice(i, 1);
      }
    }
    res.status(200).send(userData);
  },

  postUser(req, res) {
    const {
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    } = req.body;

    let added = {
      id: userData.length + 1,
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    };

    userData.push(added);
    res.send(userData);
  }
};
