import React, { useState, useEffect } from "react";
import { saveShowWidth } from "./saveShowWidth";
import { importAllImg } from "./importAllImg";
import { updateImgWidth } from "./updateImgWidth";
import Images from "./Images";

export default function Gallery() {
  const [updatedImages, setUpdatedImages] = useState(null);
  const [tempImgList, setTempImgList] = useState(null);
  const [listChange, setListChange] = useState(false);
  const [updateImg, setUpdateImg] = useState(false);

  useEffect(() => {
    let rows = [];
    let tempImages = tempImgList;

    if (!tempImages) {
      tempImages = importAllImg(require.context("./img_md", true, /\./));
      setTempImgList(tempImages);
    } else {
      rows = updateImgWidth(tempImages);
      tempImages = saveShowWidth(rows, tempImages);
      setUpdatedImages(tempImages);
      setUpdateImg((prevState) => !prevState);
    }
  }, [tempImgList, listChange]);

  if (updatedImages) {
    return (
      <div className="Gallery">
        <Images
          updatedImages={updatedImages}
          setTempImgList={setTempImgList}
          setListChange={setListChange}
          updateImg={updateImg}
        />
      </div>
    );
  } else {
    return "Loading...";
  }
}
