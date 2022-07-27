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
    console.log("useEffect");
    let rows = [];
    let images = tempImgList;

    if (!images) {
      console.log("images===null");
      images = importAllImg(require.context("./img_md", true, /\./));
      setTempImgList(images);
    } else {
      console.log("images update");
      rows = updateImgWidth(images);
      images = saveShowWidth(rows, images);
      setUpdatedImages(images);
      setUpdateImg((prevState) => !prevState);
    }
  }, [tempImgList, listChange]);

  if (updatedImages) {
    return (
      <div className="Gallery">
        {updatedImages.map((project, index) => {
          console.log("Gallery");
          console.log(listChange);
          return (
            <Project
              key={index}
              project={project}
              tempImgList={tempImgList}
              setTempImgList={setTempImgList}
              listChange={listChange}
              setListChange={setListChange}
              updateImg={updateImg}
            />
          );
        })}
      </div>
    );
  } else {
    return "Loading...";
  }
}
