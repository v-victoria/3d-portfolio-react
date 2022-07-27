import React, { useState, useEffect } from "react";
import OpenCloseButton from "./OpenCloseButton";
import "./Project.css";

export default function Project({
  project,
  tempImgList,
  setTempImgList,
  setListChange,
  updateImg,
}) {
  const [images, setImages] = useState(null);

  useEffect(() => {
    let image = [];
    for (let i = 0; i < project.imagesArray.length; i++) {
      image[i] = (
        <a
          key={i}
          href="/"
          className={
            project.imagesArray[i].display === "none" ? "d-none" : "d-inline"
          }
        >
          <img
            src={require("./img_md/" +
              project.folder +
              "_md/" +
              project.imagesArray[i].imgName +
              "_md_" +
              project.imagesArray[i].imgWidth +
              ".jpg")}
            alt=""
            width={project.imagesArray[i].showWidth + "%"}
            className={
              project.imagesArray[i].display === "none" ? "img-clear" : ""
            }
          />
        </a>
      );
    }
    setImages(image);
  }, [updateImg, project.folder, project.imagesArray]);

  if (images) {
    return (
      <span className={"Project folder-" + project.folder}>
        {images}
        <OpenCloseButton
          project={project}
          tempImgList={tempImgList}
          setTempImgList={setTempImgList}
          setListChange={setListChange}
        />
      </span>
    );
  } else {
    return null;
  }
}
