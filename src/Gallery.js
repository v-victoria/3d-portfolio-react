import React, { useState, useEffect } from "react";
import { saveShowWidth } from "./saveShowWidth";
import { importAllImg } from "./importAllImg";
import { updateImgWidth } from "./updateImgWidth";
import Project from "./Project";
import "./Gallery.css";

export default function Gallery() {
  const [updatedImages, setUpdatedImages] = useState(null);
  const [tempImgList, setTempImgList] = useState(null);
  const [listChange, setListChange] = useState(false);
  const [updateImg, setUpdateImg] = useState(false);

  useEffect(() => {
    let rows = [];
    let images = tempImgList;

    if (!images) {
      images = importAllImg(require.context("./img_md", true, /\./));
      setTempImgList(images);
    } else {
      rows = updateImgWidth(images);
      images = saveShowWidth(rows, images);
      setUpdatedImages(images);
      setUpdateImg((prevState) => !prevState);
    }
  }, [tempImgList, listChange]);

  function getBackgroundIndex(index) {
    let backgroundIndex = Math.round((index / 5 - Math.trunc(index / 5)) / 0.2);
    return backgroundIndex;
  }

  if (updatedImages) {
    return (
      <div className="Gallery">
        {updatedImages.map((project, index) => {
          return (
            <Project
              key={index}
              project={project}
              tempImgList={tempImgList}
              setTempImgList={setTempImgList}
              listChange={listChange}
              setListChange={setListChange}
              updateImg={updateImg}
              backgroundIndex={getBackgroundIndex(index)}
            />
          );
        })}
      </div>
    );
  } else {
    return "Loading...";
  }
}
