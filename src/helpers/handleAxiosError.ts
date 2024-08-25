import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export type MyRejectValue = { message: string; status: number | undefined };

export const handleAxiosError = (
  error: unknown,
  thunkAPI: { rejectWithValue: (value: MyRejectValue) => void }
) => {
  const axiosError = error as AxiosError<ErrorResponse>;
  const errorMsg = axiosError?.response?.data.message || axiosError.message;
  const errorStatus = axiosError?.response?.status;

  return thunkAPI.rejectWithValue({
    message: errorMsg,
    status: errorStatus,
  });
};
