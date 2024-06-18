import { IUserPassword } from "@/interface/user.interface";
import instance from "@/utils/axiosInstance";

export const updatePassword = async (id: string, params: IUserPassword) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(`/users/${id}/password`, { ...params }, config);
    return data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};