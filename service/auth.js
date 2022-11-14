import callAPI from "config/callAPI";

export const serviceLogin = async (data) => {
  const url = `/api/users/login`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
};

export const serviceRegister = async (data) => {
  const url = `/api/users/register`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
};

export const serviceRegisterAdmin = async (data) => {
  const url = `/api/users/admin/register`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
};

export const updateProfile = async ({id, data}) => {
  const url = `/api/users/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true
  });
};
