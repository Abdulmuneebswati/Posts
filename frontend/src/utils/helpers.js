import { message } from 'antd';
import { AxiosError } from 'axios';

export function next(error) {
  const errorMessage = error || 'Something went wrong';
  message.error(errorMessage);
  throw new Error(errorMessage);
}

export function formatError(err) {
  let errorMessage = 'Something went wrong.';
  console.log(err);
  
  if (err instanceof AxiosError) {

    const errorData = err?.response?.data;
    console.log(errorData);
    
    errorMessage =
      errorData ? errorData?.message : 'Something went wrong.';
  }
  return errorMessage;
}
