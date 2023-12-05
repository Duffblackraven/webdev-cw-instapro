import { setPosts } from "./index.js";

const personalKey = "tatiana-ret";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}


export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  })
  .then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  })
  .then((response) => {
    return response.json();
  });
}

export function addPost ({ token, imageUrl }) {
  const commInputElement = document.getElementById('description')
  return fetch(postsHost, {
    method: 'POST',
    body: JSON.stringify({
        description: commInputElement.value,
        imageUrl,
    }),
    headers: {
        Authorization: token,
    },
 })
.then((response) => {
    if (response.status === 400) {
        alert('Нет фото или описания')
    } else {
        return response.json()
    }
 })
}

export function getUserPost ({ token, userId}) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: 'GET',
    headers: {
        Authorization: token,
    },
})
    .then((response) => {
        if (response.status === 401) {
            throw new Error('Нет авторизации')
        }
        return response.json()
    })
    .then((data) => {
        setPosts(data.posts)
        return data.posts
    })
    .catch((error) => {
        alert('Кажется, у вас сломался интернет, попробуйте позже')
        console.warn(error)
    })
}

export function addLike ({ token, postId }) {
  return fetch(`${postsHost}/${postId}/like`, {
    method: 'POST',
    headers: {
        Authorization: token,
    },
 })
.then((response) => {
    if (response.status === 401) {
        alert('Лайкать посты могут только авторизованные пользователи')
        throw new Error('Нет авторизации')
    }

    return response.json()
 })
}

export function removeLike ({ token, postId }) {
  return fetch(`${postsHost}/${postId}/dislike`, {
    method: 'POST',
    headers: {
        Authorization: token,
    },
 })
.then((response) => {
    if (response.status === 401) {
        alert('Чтобы убрать лайк, войдите')
        throw new Error('Нет авторизации')
    }

    return response.json()
 })
}
