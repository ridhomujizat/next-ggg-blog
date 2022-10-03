import callAPI from "config/callAPI";

export const serviceLogin = async (data) => {
    const url = `/api/users/login`;
  
    return callAPI({
      url,
      method: 'POST',
      data,
    });
  };
  