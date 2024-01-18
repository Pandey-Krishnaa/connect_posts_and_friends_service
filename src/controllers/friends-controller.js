const { GET_USER_BY_ID_URL } = require("../config");
const { FriendsService } = require("./../services/index");
const removeFriend = async (req, res, next) => {
  try {
    const friend_id = req.params.friend_id;
    await FriendsService.removeFriend(friend_id, req.user.id);
    res.status(200).json({ message: "friend removed successfully" });
  } catch (err) {
    next(err);
  }
};
const getAllFriends = async (req, res, next) => {
  try {
    const logged_in_user_id = req.user.id;
    const user_id = req.params.user_id;
    const query = req.query;
    const page_no = query.page_no * 1 || 1;
    const results_per_page = query.results_per_page * 1 || 1;
    const pagination = {
      limit: results_per_page,
      offset: (page_no - 1) * results_per_page,
    };
    const { friends, friendsCount } = await FriendsService.getAllFriends(
      logged_in_user_id,
      user_id,
      pagination
    );
    console.log({ friendsCount });
    const friend_list = [];
    for (let friend of friends) {
      console.log("user id = ", friend.user1_id, friend.user2_id);
      // fetching the friend
      // friend obj = {user1,user2}
      // so user1 or user2, one of them is friend that's we are doing this
      if (friend.user1_id !== logged_in_user_id * 1) {
        const jsonResponse = await fetch(
          `${GET_USER_BY_ID_URL}/${friend.user1_id}`,
          {
            method: "GET",
            headers: {
              "x-auth-token": req.headers["x-auth-token"],
            },
          }
        );
        if (jsonResponse.ok) {
          const data = await jsonResponse.json();
          const { name, email, avatar_public_url, id } = data.user;
          const user = { name, email, avatar_public_url, id };
          friend_list.push(user);
        }
      } else {
        const jsonResponse = await fetch(
          `${GET_USER_BY_ID_URL}/${friend.user2_id}`,
          {
            method: "GET",
            headers: {
              "x-auth-token": req.headers["x-auth-token"],
            },
          }
        );
        if (jsonResponse.ok) {
          const data = await jsonResponse.json();
          const { name, email, avatar_public_url, id } = data.user;
          const user = { name, email, avatar_public_url, id };
          friend_list.push(user);
        }
      }
    }
    res.status(200).json({
      results: friend_list.length,
      friend_list,
      totalFriends: friendsCount,
    });
  } catch (err) {
    next(err);
  }
};
const checkFriendsStatus = async (req, res, next) => {
  try {
    const response = await FriendsService.checkFriendsStatus(
      req.params.user1_id,
      req.params.user2_id
    );
    if (!response) res.status(200).json({ friends: false });
    else res.status(200).json({ friends: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  removeFriend,
  getAllFriends,
  checkFriendsStatus,
};
