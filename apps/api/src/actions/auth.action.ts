import { User } from 'prisma/prisma-client';
import { Auth, RegisterAuth } from '../interfaces/auth.interface';
import { getUserByEmailQuery } from '../queries/user.query';
import { loginQuery, registerQuery, verifyQuery } from '../queries/auth.query';
import { HttpException } from '../exceptions/HttpException';
import { genSalt, hash, compare } from 'bcrypt';
import { API_KEY } from '../config';
import { sign } from 'jsonwebtoken';

const registerAction = async (data: RegisterAuth): Promise<User> => {
  try {
    const check = await getUserByEmailQuery(data.email || '');

    if (check) throw new Error('user already exist');

    const salt = await genSalt(10);

    // const hashPass = await hash(data.password || '', salt);

    const user = await registerQuery(data);

    return user;
  } catch (err) {
    throw err;
  }
};

const loginAction = async (data: Auth) => {
  try {
    const user = await getUserByEmailQuery(data.email);

    if (!user) throw new Error('email doesnt exist');

    // if (data.password === user.password)

    const isValid = await compare(data.password, user.password || '');

    if (!isValid) throw new Error('password is wrong');

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      gender: user.gender,
      birthDate: user.birthDate,
      isVerified: user.isVerified,
      role: user.role.name,
    };

    const token = sign(payload, String(API_KEY), { expiresIn: '1h' });

    return { user, token };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const refreshTokenAction = async (email: string) => {
  try {
    const user = await getUserByEmailQuery(email);

    if (!user) throw new HttpException(500, 'Something went wrong');

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      gender: user.gender,
      birthDate: user.birthDate,
      isVerified: user.isVerified,
      role: user.role.name,
    };

    const token = sign(payload, String(API_KEY), { expiresIn: '1hr' });

    return { user, token };
  } catch (err) {
    throw err;
  }
};

const verifyAction = async (data: Auth): Promise<void> => {
  try {
    const findUser = await getUserByEmailQuery(data.email);
    if (!findUser) throw new Error('something went wrong');
    const salt = await genSalt(10);

    const hashPass = await hash(data.password || '', salt);

    await verifyQuery({
      email: data.email,
      password: hashPass,
    });
  } catch (error) {
    console.log(error);
  }
};

export { registerAction, loginAction, verifyAction, refreshTokenAction };
