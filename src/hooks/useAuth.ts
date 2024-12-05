import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { message } from "antd";
import UriPath from "@/utils/uri_path.enum";
// import axios from "axios";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const validateToken = async (token:string) => {
  //   try {
  //     const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/v2/users`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       params: {
  //         page: 1,
  //         per_page: 1,
  //       },
  //     });
  //     return res.status === 200;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  useEffect(() => {
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    const authenticate = async () => {
      if (!name || !token) {
        message.error("Please provide all the required credentials!");
        router.replace(UriPath.PAGE);
        return;
      } else {
        setIsAuthenticated(true)
      }

      // const isTokenValid = await validateToken(token);

      // if (!isTokenValid) {
      //   message.error("Your session has expired. Please log in again.");
      //   localStorage.clear();
      //   router.replace(UriPath.PAGE);
      // } else {
      //   setIsAuthenticated(true);
      // }
    };

    authenticate();
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
