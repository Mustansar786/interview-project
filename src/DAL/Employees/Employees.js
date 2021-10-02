import { invokeApi } from "../../bl_libs/invokeApi";

export const Employees_list = async (page, limit) => {
  let requestObj = {
    path: `/user?page=${page}&limit=${limit}`,
    method: "GET",
    headers: {
     // "x-sh-auth": localStorage.getItem("token"),
     "app-id": "615824158953ce483aaf5752",
    },
  };
  return invokeApi(requestObj);
};

export const profile_detail = async (id) => {
  let requestObj = {
    path: `/user/${id}`,
    method: "GET",
    headers: {
     // "x-sh-auth": localStorage.getItem("token"),
      "app-id": "615824158953ce483aaf5752",
    },
  };
  return invokeApi(requestObj);
};

export const user_post_detail = async (id) => {
  let requestObj = {
    path: `/user/${id}/post`,
    method: "GET",
    headers: {
    //  "x-sh-auth": localStorage.getItem("token"),
      "app-id": "615824158953ce483aaf5752",
    },
  };
  return invokeApi(requestObj);
};