import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://alibackend.duckdns.org';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<any, { email: string; password: string }>(
      {
        query: ({ email, password }) => ({
          url: '/authentication_app/signup/',
          method: 'POST',
          body: { email, password },
        }),
      }
    ),
    verifyOtp: builder.mutation<any, { email: string; otp: string }>(
      {
        query: ({ email, otp }) => ({
          url: '/authentication_app/verify_otp/',
          method: 'POST',
          body: { email, otp },
        }),
      }
    ),
    resendOtp: builder.mutation<any, { email: string }>(
      {
        query: ({ email }) => ({
          url: '/authentication_app/resend_otp/',
          method: 'POST',
          body: { email },
        }),
      }
    ),
    login: builder.mutation<any, { email: string; password: string }>(
      {
        query: ({ email, password }) => ({
          url: '/authentication_app/signin/',
          method: 'POST',
          body: { email, password },
        }),
      }
    ),
    createChat: builder.mutation<any, { model_name: string; message_content: string }>(
      {
        query: ({ model_name, message_content }) => ({
          url: '/chat/create_chat/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ model_name, message_content }),
        }),
      }
    ),
    addMessageToChat: builder.mutation<any, { chat_id: number; message_content: string; model_name: string }>(
      {
        query: ({ chat_id, message_content, model_name }) => ({
          url: '/chat/add_message_to_chat/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ chat_id, message_content, model_name }),
        }),
      }
    ),
    getUsersChatList: builder.query<any, void>({
      query: () => ({
        url: '/chat/get_users_chat_list/',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: '/authentication_app/user_profile/',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }),
    }),
    updateUserProfile: builder.mutation<any, { name: string; profile_picture?: File | string }>(
      {
        query: (body) => {
          // If profile_picture is a File, use FormData
          if (body.profile_picture && body.profile_picture instanceof File) {
            const formData = new FormData();
            formData.append('name', body.name);
            formData.append('profile_picture', body.profile_picture);
            return {
              url: '/authentication_app/user_profile/',
              method: 'PATCH',
              body: formData,
            };
          }
          // Otherwise, send JSON
          return {
            url: '/authentication_app/user_profile/',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: body.name }),
          };
        },
      }
    ),
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useCreateChatMutation,
  useAddMessageToChatMutation,
  useGetUsersChatListQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = apiSlice; 