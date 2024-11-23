import axios from 'axios';
import { formatError, next } from '../../../utils/helpers';
import Endpoints from '../../../constants/EndPoints';

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(Endpoints.signin, {
      email,
      password,
    });
    return response?.data?.data;
  } catch (error) {
    next(formatError(error));
  }
};
