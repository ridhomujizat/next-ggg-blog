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

export const getDetailBlog= async ({ id, data, type }) => {
  const url = `/api/${CURRENT_API}/detail/${id}`;

  let params = {};

  if (type) {
    params = { type };
  }

  return callAPI({
    url,
    method: "GET",
    data,
    params,
    token: true
  });
};

export const postBlog= async (data) => {
  const url = `/api/${CURRENT_API}/create`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
};

export const deleteBlog= async ({ id, data }) => {
  const url = `/api/${CURRENT_API}/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    data,
    token: true,
  });
};

export const updateBlog= async ({ id, data }) => {
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

export const deleteImageBlog= async (data) => {
  const url = `/api/images/${CURRENT_API}/upload`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
};
