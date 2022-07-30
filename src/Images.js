import React, { useState, useEffect } from "react";
import OpenCloseButton from "./OpenCloseButton";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import "./Images.css";

export default function Images({
  updatedImages,
  setTempImgList,
  setListChange,
  updateImg,
}) {
  const [images, setImages] = useState(null);

  useEffect(() => {
    console.log("useEffect Images");

    setImages(updatedImages);
  }, [updateImg, updatedImages]);

  console.log(images);

  function getBackgroundIndex(index) {
    let folder = parseInt(images[index].folder);
    let backgroundIndex = Math.round(
      (folder / 5 - Math.trunc(folder / 5)) / 0.2
    );
    return backgroundIndex;
  }

  function getFolderImages(folder) {
    let project = images.filter(function (img) {
      return img.folder === folder;
    });
    return project;
  }
  if (images) {
    return (
      <div className="Images">
        {images.map((image, index) => {
          let toggle = image.display === "inline" ? true : false;
          let src = require("./img_md/" +
            image.folder +
            "_md/" +
            image.imgName +
            "_md_" +
            image.imgWidth +
            ".jpg");

          let end =
            images.length - 1 !== index
              ? image.display === "inline"
                ? images[index + 1].display === "none"
                  ? " end"
                  : images[index].folder !== images[index + 1].folder
                  ? " end"
                  : ""
                : ""
              : " end";
          let start =
            index === 0
              ? " start"
              : images[index].folder !== images[index - 1].folder
              ? " start"
              : "";
          let none = image.display === "none" ? " none" : "";

          let classNames =
            start + end + none + " background-" + getBackgroundIndex(index);

          let newWidth = image.showWidth;
          // let magnifyingGlassML =
          //   (window.innerWidth * 0.9 * (newWidth + 0.85)) / 100;
          // let magnifyingGlassMT =
          //   (window.innerWidth * 0.9 * newWidth * 8) / image.imgWidth / 2 - 36;

          let button =
            image.display === "inline"
              ? images.length - 1 !== index
                ? image.folder !== images[index + 1].folder
                  ? ""
                  : images[index + 1].display === "none"
                  ? ""
                  : " none"
                : ""
              : " none";

          return (
            <div
              key={index}
              style={{ width: newWidth + "%" }}
              className={classNames + " img-container"}
            >
              <div>
                {/* <a href="/">
              //   <i
              //     className="fa-solid fa-magnifying-glass-plus"
              //     style={{
              //       // marginLeft: "-" + magnifyingGlassML + "px",
              //       marginTop: magnifyingGlassMT + "px",
              //     }}
              //   ></i>
              // </a> */}
                <XyzTransition
                  appear
                  xyz="fade left back"
                  duration={{ appear: "auto", in: 300, out: 0 }}
                >
                  {toggle && <img src={src} alt="" />}
                </XyzTransition>
                <OpenCloseButton
                  display={button}
                  project={getFolderImages(image.folder)}
                  images={images}
                  setTempImgList={setTempImgList}
                  setListChange={setListChange}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return "Loading...";
  }
}
