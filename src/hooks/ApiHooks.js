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
  const getFile = async (id) => {
    return await fetchJson(`${baseUrl}media/${id}`);
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

  return {mediaArray, postMedia, deleteMedia, putMedia, loading, getFile};
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

  const getTagsOfFile = async (id) => {
    try {
      const options = {
        method: 'GET',
      };
      return await fetchJson(baseUrl + 'tags/file/' + id, options);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postTag = async (tagAndFileId, token) => {
    console.log(JSON.stringify(tagAndFileId));
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'x-access-token': token},
      body: JSON.stringify(tagAndFileId),
    };
    try {
      return await fetchJson(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTag error: ' + error.message);
    }
  };

  const searchWithTags = async (tags) => {
    const tagMatchFiles = [];
    let allTrueMatches = [];
    for (let i = 0; i < tags.length; i++) {
      const allMatches = [];
      try {
        const result = await fetchJson(baseUrl + 'tags/' + tags[i] + appID);
        allMatches.push(result);
      } catch (e) {
        throw new Error(e.message);
      }
      for (let j = 0; j < allMatches.length; j++) {
        for (let k = 0; k < allMatches[j].length; k++) {
          tagMatchFiles.push(allMatches[j][k]);
        }
      }
    }

    const onlyUnique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    const getOccurrence = (array, value) => {
      return array.filter((v) => v === value).length;
    };

    const filterByCount = (array, count) => {
      console.log(count);
      // Get file_id:s of files so we can compare them
      const result = array.map((a) => a.file_id);
      console.log(result);
      for (let m = 0; m < result.length; m++) {
        // How many times each file_id is in array
        const occurrence = getOccurrence(result, result[m]);
        // If file_id is not in array as many times as there are tags,
        // remove the file_id from array
        if (occurrence === count) {
          allTrueMatches.push(result[m]);
        }
      }
      // Make copy of result array with only unique values
      allTrueMatches = allTrueMatches.filter(onlyUnique);
    };
    filterByCount(tagMatchFiles, tags.length);
    return allTrueMatches;
  };
  return {getTag, postTag, getTagsOfFile, searchWithTags};
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

  const getFavourite = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
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
