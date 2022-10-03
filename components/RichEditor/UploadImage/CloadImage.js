import { uploadImageBlog } from "service/post";

export const CloudImage = async (form_data) => {
  try {
    const respon = await uploadImageBlog(form_data)
    if (respon) {
      return respon.image_url;
    }
  } catch (err) {}
};
