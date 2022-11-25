import { uploadImageBlog } from "service/post";
import { nanoid } from "nanoid";

export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export const CloudImage = async (ImageURL) => {
  try {
    const block = ImageURL.split(";");
    if (block.length > 1) {
      const filename = nanoid();
      // console.log(block)
      const contentType = block[0].split(":")[1];
      const fname = filename + "." + contentType.split("/")[1];
      // get the real base64 content of the file
      const realData = block[1].split(",")[1]; //
      // console.log(realData)
      const blob = b64toBlob(realData, contentType);
      //formData.append("test", "ALOHAAA");
      const f = new FormData();
      f.append("photo", blob, fname);
      const responImage = await uploadImageBlog(f);
      return responImage.image_url;
    }
  } catch (err) {
    console.log(err);
    return ImageURL;
  }
};
