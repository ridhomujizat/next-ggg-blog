import callAPI from "config/callAPI";

export const getLabels = async ({ type }) => {
  const url = `/api/label-blogs`;
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

export const getDetailLabel = async ({ id, data, type }) => {
  const url = `/api/label-blogs/${id}`;

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

export const postLabel = async (data) => {
  const url = `/api/label-blogs/create`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
};

export const deleteLabels = async ({ id, data }) => {
  const url = `/api/label-blogs/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    data,
    token: true,
  });
};

export const updateLabels = async ({ id, data }) => {
  const url = `/api/label-blogs/${id}`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
};
