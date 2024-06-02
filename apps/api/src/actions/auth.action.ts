import { User } from '@prisma/client';
import { Auth } from '../interfaces/auth.interface';
import { getUserByEmailQuery } from '../queries/user.query';
import { loginQuery, registerQuery } from '../queries/auth.query';
import { HttpException } from '../exceptions/HttpException';
import { genSalt, hash, compare } from 'bcrypt';
import { API_KEY } from '../config';
import { sign } from 'jsonwebtoken';

const registerAction = async (data: User, avatar: string): Promise<User> => {
  try {
    const check = await getUserByEmailQuery(data.email);

    if (check) throw new Error('user already exist');

    const salt = await genSalt(10);
    console.log(salt);
    const hashPass = await hash(data.password, salt);
    console.log(hashPass);

    const user = await registerQuery(data, hashPass, avatar);

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

    const isValid = await compare(data.password, user.password);

    if (!isValid) throw new Error('password is wrong');

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role.name,
    };
    const token = sign(payload, String(API_KEY), { expiresIn: '1h' });

    return { user, token };
  } catch (err) {
    throw err;
  }
};

export { registerAction, loginAction };
