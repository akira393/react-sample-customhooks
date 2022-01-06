//全ユーザーを取得

import { UserProfile } from "../types/UserProfile";
import { User } from "../types/api/user";
import axios from "axios";
import { useState } from "react";

export const useAllUsers = () => {
  const [userInfos, setUserInfos] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getUsers = () => {
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data: UserProfile[] = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          adress: `${user.address.city} ${user.address.suite} ${user.address.street}`
        }));
        setUserInfos(data);
        setError(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //配列で返すか、オブジェクトで返すかは人それぞれ
  return { userInfos, loading, error, getUsers };
};
