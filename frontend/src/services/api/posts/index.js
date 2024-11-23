import Endpoints from '../../../constants/EndPoints';
import { formatError, next } from '../../../utils/helpers';
import newRequest from '../new-requests';

export const getAllPosts = async (userId) => {
  try {
    const response = await newRequest.get(Endpoints.getAllPost(userId));

    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};

export const addPost = async (userId, Data) => {
  try {
    const formData = new FormData();
    formData.append('title', Data.title);
    formData.append('content', Data.content);
    formData.append('image', Data.image[0].originFileObj);
    const response = await newRequest.post(
      Endpoints.addPost(userId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};

export const editPostCall = async (userId, postId, Data) => {
  try {
    const formData = new FormData();
    formData.append('title', Data.title);
    formData.append('content', Data.content);
    formData.append('image', Data.image[0].originFileObj);
    const response = await newRequest.patch(
      Endpoints.editPost(userId, postId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};

export const deletePost = async (userId, postId) => {
  try {
    const response = await newRequest.delete(
      Endpoints.editPost(userId, postId)
    );
    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};
export const getMyPosts = async (userId) => {
  try {
    const response = await newRequest.get(Endpoints.getMyPosts(userId));
    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};

export const getPost = async (userId, postId) => {
  try {
    const response = await newRequest.get(Endpoints.getPost(userId, postId));
    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};

export const approvePost = async (userId, Data) => {
  try {
    const response = await newRequest.patch(
      Endpoints.approvePost(userId),
      Data
    );
    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};
