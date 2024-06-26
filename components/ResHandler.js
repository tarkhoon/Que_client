import axios from "axios";
const host = "http://158.160.7.192";

export async function uploadPhoto(image) {
  var formData = new FormData();
  formData.append("image", {
    uri: image,
    name: "photo.jpg",
    type: "image/jpg",
  });

  try {
    const response = await axios.post(`${host}:4000/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
}
export async function uploadVideo(video) {
  var formData = new FormData();
  formData.append("video", {
    uri: video,
    name: "video.mov",
    type: "video/mov",
  });
  console.log(formData);
  try {
    const response = await axios.post(`${host}:4000/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
}
//uploadVideo
export async function likePost(user, postId) {
  try {
    const response = await axios.get(`${host}:4000/like/${user}/${postId}`);
    return 500;
  } catch (e) {
    console.log(e);
    return 400;
  }
}

export async function unlikePost(user, postId) {
  console.log("in function");
  try {
    const response = await axios.get(`${host}:4000/unlike/${user}/${postId}`);
    console.log(response.data);
    return 500;
  } catch (e) {
    console.log(e);
    return 400;
  }
}

export async function publicate(user, rate, description, restaurant, img_url) {
  try {
    const response = await axios.post(`${host}:4000/publicate`, {
      user: user,
      rate: rate,
      description: description,
      restaurant: restaurant,
      img_url: img_url,
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return 500;
  }
}

export async function reg(name, nickname, email, isRestaurant) {
  try {
    const response = await axios.post(`${host}:4000/register`, {
      name: name,
      nickname: nickname,
      email: email,
      isRestaurant: isRestaurant,
    });
    return response.data;
  } catch (e) {
    return e;
  }
}

export async function getUserInfo(email) {
  try {
    const response = await axios.get(`${host}:4000/getUserInfo/${email}`);
    return response.data;
  } catch (e) {
    return e;
  }
}
export async function getPosts() {
  try {
    return axios.get(`${host}:4000/photo`);
  } catch (e) {
    return null;
  }
}
export async function getUserPosts(user) {
  try {
    console.log(user);
    return axios.get(`${host}:4000/photo/${user}`);
  } catch (e) {
    return null;
  }
}
export async function getLikes(usId) {
  try {
    const response = await axios.get(`${host}:4000/likes/${usId}`);
    return response.data;
  } catch (e) {
    return null;
  }
}

export async function updateAbout(text, user) {
  try {
    console.log(text);
    const response = await axios.get(
      `${host}:4000/changeAbout/${user}/${text}`
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return null;
  }
}
export async function getUsers(nickname) {
  try {
    const response = await axios.get(`${host}:4000/getUsers/${nickname}`);
    if (response.data[0] == null) {
      return 400;
    } else return response.data;
  } catch (e) {
    return 400;
  }
}
export async function getRestaurants(nickname) {
  try {
    const response = await axios.get(`${host}:4000/getRestaurants/${nickname}`);
    if (response.data[0] == null) {
      return 400;
    } else return response.data;
  } catch (e) {
    return 400;
  }
}
export async function getDishes(name) {
  try {
    const response = await axios.get(`${host}:4000/getDishes/${name}`);
    if (response.data[0] == null) {
      return 400;
    } else return response.data;
  } catch (e) {
    return 400;
  }
}
//getComms
//pubComm
//getSaves
//setProfilePhoto
//getStories
//pubStories
