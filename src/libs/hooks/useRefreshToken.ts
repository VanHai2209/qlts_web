import { IUserToken } from "@/libs/types/user";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import router from "next/router";
import { API_URL } from "../utils/constants";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await handleRefreshToken(session?.user.refreshToken as string);

    if (session) session.user.accessToken = res.accessToken;
    else signIn();
  };
  return refreshToken;
};

const handleRefreshToken = async (refreshToken: string) => {
  try {
    const res = await axios.get<IUserToken>(`${API_URL}/admin/auth/refresh`, {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("error", error);

    await signOut({ redirect: false });
    router.push("/login");

    throw Error("refetching token failed.");
  }
};
