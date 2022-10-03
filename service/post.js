import callAPI from "config/callAPI";
const CURRENT_API = "blogs";

export const getBlogs = async ({ type }) => {
  const url = `/api/${CURRENT_API}`;
  let params = {};

  if (type) {
    params = { type };
  }

  return callAPI({
    url,
    method: "GET",
    params,
  });
};

export const getDetailCategory = async ({ id, data, type }) => {
  const url = `/api/${CURRENT_API}/${id}`;

  let params = {};

  if (type) {
    params = { type };
  }

  return callAPI({
    url,
    method: "GET",
    data,
    params,
  });
};

export const postCategory = async (data) => {
  const url = `/api/${CURRENT_API}/create`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
};

export const deleteCategory = async ({ id, data }) => {
  const url = `/api/${CURRENT_API}/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    data,
    token: true,
  });
};

export const updateCategory = async ({ id, data }) => {
  const url = `/api/${CURRENT_API}/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
};

export const uploadImageBlog = async (data) => {
  const url = `/api/images/${CURRENT_API}/upload`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
};

export const deleteImageCategory = async (data) => {
  const url = `/api/images/${CURRENT_API}/upload`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
};
