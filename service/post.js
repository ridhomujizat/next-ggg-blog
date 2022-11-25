import callAPI from "config/callAPI";
const CURRENT_API = "blogs";

export const getBlogs = async ({
  type,
  limit,
  page,
  label,
  category,
  search,
  status,
  offset,
}) => {
  const url = `/api/${CURRENT_API}`;
  let params = {};

  if (type) {
    params = { type };
  }

  if (limit) {
    params = { ...params, limit };
  }

  if (page) {
    params = { ...params, page };
  }

  if (label) {
    params = { ...params, label_id: label };
  }

  if (category) {
    params = { ...params, category_id: category };
  }

  if (search) {
    params = { ...params, search: search };
  }
  if (status === "draft") {
    url = url + "/draft";
  }

  if (offset && offset !== 0) {
    params = { ...params, offset };
  }

  return callAPI({
    url,
    method: "GET",
    params,
  });
};

export const getDetailBlog = async ({ id, data, type }) => {
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
    token: true,
  });
};

export const getDetailBySlugBlog = async ({ id, type }) => {
  const url = `/api/${CURRENT_API}/${id}`;

  const URL1 = encodeURI(url);

  let params = {};

  if (type) {
    params = { type };
  }

  return callAPI({
    url: URL1,
    method: "GET",
    params,
  });
};

export const postBlog = async (data) => {
  const url = `/api/${CURRENT_API}/create`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
};

export const deleteBlog = async ({ id, data }) => {
  const url = `/api/${CURRENT_API}/${id}`;

  return callAPI({
    url,
    method: "DELETE",
    data,
    token: true,
  });
};

export const updateBlog = async ({ id, data }) => {
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

  const respon = await callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });

  let image_url 
  const split = respon.image_url.split("//")

  if(split.length === 3){
    image_url = split[0]+ "//" +  split[1] + "/" +  split[2]
  } else {
    image_url =  respon.image_url
  }

  console.log(image_url)
  return {
    ...respon,
    image_url
  }

};

export const deleteImageBlog = async (data) => {
  const url = `/api/images/${CURRENT_API}/upload`;

  return callAPI({
    url,
    method: "PUT",
    data,
    token: true,
  });
};

export const postCategory = async (data) => {
  const url = `https://apiblog.goodgamesguild.com/api/blogs/category-create`;

  return callAPI({
    url,
    method: "POST",
    data,
    token: true,
  });
};
