import React, { useState, useRef, useMemo } from "react";
import styled from "@emotion/styled";
import JoditEditor from "jodit-react";
import { Box } from "@chakra-ui/react";
import "jodit/build/jodit.min.css";

const BlogStyled = styled(Box)`
  .jodit-ui-form {
    color: #000;
  }
`;

const Jodit = ({ content, setContent }) => {
  const editor = useRef(null);
  // const [content, setContent] = useState("");

  const config = {
    // buttons: [
    //   "bold",
    //   "italic",
    //   "underline",
    //   "|",
    //   "ol",
    //   "ul",
    //   "|",
    //   "fontsize",
    //   "|",
    //   "left",
    //   "center",
    //   "right",
    //   "justify",
    //   "|",
    //   "table",
    //   "image",
    //   "video",
    // ],
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ["brush", "file"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    height: 400,
  };

  return (
    <BlogStyled sx={{ ".jodit-ui-form": { color: "#000" } }}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => {
          setContent(newContent);
          console.log(newContent);
        }} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </BlogStyled>
  );
};

export default Jodit;
