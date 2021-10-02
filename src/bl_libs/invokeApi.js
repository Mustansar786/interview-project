// common business logic related util methods
import axios from "axios";
import { base_uri } from "../config/config";
axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {}
}) {
  let reqObj = {
    method: method,
    url: base_uri + path,
    headers: headers
  };

  reqObj["params"] = queryParams;

  if (method === "POST") {
    reqObj["data"] = postData;
  }
  if (method === "PUT") {
    reqObj["data"] = postData;
  }
  if (method === "DELETE") {
    reqObj["data"] = postData;
  }

  let results = undefined;

  //log request
  console.log("<===REQUEST-OBJECT===>", reqObj);

  try {
    results = await axios(reqObj);
    //log success result
    console.log("<===Api-Success-Result===>", results);

    return results.data;
  } catch (error) {
    //log error
    console.log("<===Api-Error===>", error.response.data);

    //handle 401 unautherized error
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return {
      code: error.response.status,
      message: error.response.data.message ? error.response.data.message : ""
    };
  }
}
