import {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {appID, baseUrl} from '../utils/variables';

const fetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.message;
      throw new Error(message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const useMedia = (showAllFiles, userId) => {
  const {update} = useContext(MediaContext);
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMedia = async () => {
    try {
      setLoading(true);
      let media = await useTag().getTag(appID);
      // jos showAllFiles false filteröi kirjautuneen käyytäjän tiedostot media taulukkoon
      if (!showAllFiles) {
        media = media.filter((file) => file.user_id === userId);
      }

      const allFiles = await Promise.all(
        media.map(async (file) => {
          return await fetchJson(`${baseUrl}media/${file.file_id}`);
        })
      );

      setMediaArray(allFiles);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, [userId, update]);

  const postMedia = async (formdata, token) => {
    try {
      setLoading(true);
      const fetchOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: formdata,
      };
      return await fetchJson(baseUrl + 'media', fetchOptions);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (fileId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'media/' + fileId, fetchOptions);
  };

  const putMedia = async (fileId, data, token) => {
    try {
      setLoading(true);
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return await fetchJson(baseUrl + 'media/' + fileId, fetchOptions);
    } finally {
      setLoading(false);
    }
  };

  return {mediaArray, postMedia, deleteMedia, putMedia, loading};
};

const useUser = () => {
  const getUser = async (token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/user', fetchOptions);
  };

  const getUsername = async (username) => {
    const checkUser = await fetchJson(baseUrl + 'users/username/' + username);
    return checkUser.available;
  };

  const getUserById = async (userId, token) => {
    const fetchOptions = {
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'users/', fetchOptions);
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'users', fetchOptions);
  };

  const putUser = async (inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'users', fetchOptions);
  };

  return {getUser, postUser, getUsername, getUserById, putUser};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchJson(baseUrl + 'login', fetchOptions);
  };
  return {postLogin};
};

const useComment = () => {
  const postComment = async (formdata, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    };
    return await fetchJson(baseUrl + 'comments/', fetchOptions);
  };

  const getComment = async (id) => {
    const commentResult = await fetchJson(baseUrl + 'comments/file/' + id);
    if (commentResult.length > 0) {
      return commentResult;
    } else {
      throw new Error('No comments');
    }
  };

  const deleteComment = async (id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'comments/' + id, fetchOptions);
  };

  return {postComment, getComment, deleteComment};
};

const useTag = () => {
  const getTag = async (tag) => {
    const tagResult = await fetchJson(baseUrl + 'tags/' + tag);
    if (tagResult.length > 0) {
      return tagResult;
    } else {
      throw new Error('No tags');
    }
  };

  const postTag = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchJson(baseUrl + 'tags', fetchOptions);
  };
  return {getTag, postTag};
};

const useRating = () => {
  const getRating = async (id) => {
    const ratingResult = await fetchJson(baseUrl + 'ratings/file/' + id);
    if (ratingResult.length > 0) {
      return ratingResult;
    } else {
      throw new Error('No ratings');
    }
  };

  const postRating = async (data, token) => {
    const del = await deleteRating(data.file_id, token);
    if (del) {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      return await fetchJson(baseUrl + 'ratings', fetchOptions);
    }
  };

  const deleteRating = async (id, token) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      return await fetchJson(baseUrl + 'ratings/file/' + id, fetchOptions);
    } catch (err) {
      return true;
    }
  };
  return {getRating, postRating, deleteRating};
};

const useFavourite = () => {
  const postFavourite = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await fetchJson(baseUrl + 'favourites', fetchOptions);
  };

  const deleteFavourite = async (id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    return await fetchJson(baseUrl + 'favourites/file/' + id, fetchOptions);
  };

  const getSingleFavourite = async (mediaId) => {
    return await fetchJson(baseUrl + 'favourites/file/' + mediaId);
  };

  const getFavourite = async (userId, token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    };
    return await fetchJson(baseUrl + 'favourites', fetchOptions);
  };
  return {postFavourite, deleteFavourite, getSingleFavourite, getFavourite};
};

export {
  useMedia,
  useLogin,
  useUser,
  useTag,
  useComment,
  useRating,
  useFavourite,
};
