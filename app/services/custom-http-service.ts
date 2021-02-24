import { GlobalConstants } from "../config/global-constants";

export function doGet(endpoint: string, options: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": GlobalConstants.authToken,
      },
    })
      .then((response: any) => response.json())
      .then((respData: any) => {
        resolve(respData);
      });
  });
}

export function doPost(
  endpoint: string,
  options: any,
  data: any,
): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": GlobalConstants.authToken,
      },
      body: JSON.stringify(data),
    })
      .then((response: any) => response.json())
      .then((respData: any) => {
        resolve(respData);
      });
  });
}

export default {
  doGet,
  doPost,
};
