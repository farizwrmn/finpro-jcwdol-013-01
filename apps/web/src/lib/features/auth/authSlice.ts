import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile, IUsers } from '@/interface/user.interface';
import parseJWT from '@/utils/parseJwt';
import instance from '@/utils/axiosInstance';

type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  isVerified?: boolean;
  role?: string;
};

type Status = {
  isLogin: boolean;
};

interface Auth {
  user: User;
  status: Status;
}

const initialState: Auth = {
  user: {
    id: '',
    name: '',
    email: '',
    image: '',
    phone: '',
    gender: '',
    birthDate: '',
    isVerified: false,
    role: ''
  },
  status: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    logoutState: (state: Auth) => {
      state.user = initialState.user;
      state.status = initialState.status;
    },
    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    updateProfileState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
    },
    updateAvatarState: (state: Auth, action: PayloadAction<string>) => {
      state.user.image = action.payload;
    },
  },
});

export const signIn = (params: IUsers) => async (dispatch: Dispatch) => {
  try {
    const { email, password } = params;

    const { data } = await instance.post('/auth/login', {
      email,
      password,
    });
    const payload = await parseJWT(data?.data);
    const user = data?.data.user;

    dispatch(
      loginState({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        gender: user?.gender,
        birthDate: user?.birthDate,
        isVerified: user?.isVerified,
        role: user?.role.name,
      }),
    );
    localStorage.setItem('token', JSON.stringify(data?.data));
  } catch (err) {
    console.log(err);
    alert('Email atau Password salah');
  }
};

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logoutState());
    localStorage.removeItem('token');
  } catch (err) {
    console.log(err);
  }
};

export const checkToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance.get('/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await parseJWT(data?.data);
    const user = data?.data.user;

    dispatch(
      tokenValidState({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        gender: user?.gender,
        birthDate: user?.birthDate,
        isVerified: user?.isVerified,
        role: user?.role.name,
      }),
    );
    localStorage.setItem('token', JSON.stringify(data?.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = (id: string, params: IUserProfile) => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance.patch(`/users/${id}`, { ...params });

    dispatch(updateProfileState({ ...params }));
    console.log(data?.data);
    localStorage.setItem('token', JSON.stringify(data?.data));
  } catch (err) {
    console.log(err);
    alert('Update profile failed');
  }
};

export const updateAvatar = (id: string, formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const { data } = await instance.patch(`/users/${id}/avatar`, formData, config);
    console.log("updateAvatar:", data)
    const image = data?.data.image;

    dispatch(updateAvatarState(image));
    localStorage.setItem('token', JSON.stringify(data?.data));
  } catch (err) {
    console.log(err);
    alert('Update avatar failed');
  }
};

export const { loginState, logoutState, tokenValidState, updateProfileState, updateAvatarState } = authSlice.actions;

export default authSlice.reducer;
