import React, { useState, useEffect } from "react";
import OpenCloseButton from "./OpenCloseButton";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import "./Images.css";
import ProjectFullScreen from "./ProjectFullScreen";

export default function Images({
  updatedImages,
  setTempImgList,
  setListChange,
  updateImg,
}) {
  const [images, setImages] = useState(null);
  const [showProject, setShowProject] = useState(false);
  const [project, setProject] = useState(null);
  const [imgInFolderIndex, setImgInFolderIndex] = useState(null);

  useEffect(() => {
    setImages(updatedImages);
  }, [updateImg, updatedImages]);

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

  function getToggle(image) {
    return image.display === "inline" ? true : false;
  }

  function getSrc(image) {
    return require("./img_md/" +
      image.folder +
      "_md/" +
      image.imgName +
      "_md_" +
      image.imgWidth +
      ".jpg");
  }

  function getStart(index) {
    return index === 0
      ? " start"
      : images[index].folder !== images[index - 1].folder
      ? " start"
      : "";
  }

  function getEnd(image, index) {
    return images.length - 1 !== index
      ? image.display === "inline"
        ? images[index + 1].display === "none"
          ? " end"
          : images[index].folder !== images[index + 1].folder
          ? " end"
          : ""
        : ""
      : " end";
  }

  function getButtonClassName(image, index) {
    return image.display === "inline"
      ? images.length - 1 !== index
        ? image.folder !== images[index + 1].folder
          ? ""
          : images[index + 1].display === "none"
          ? ""
          : " none"
        : ""
      : " none";
  }

  function getImgInFolderIndex(imgList, imgName) {
    let imgIndex = 0;
    for (let i = 0; i < imgList.length; i++) {
      if (imgList[i].imgName === imgName) {
        imgIndex = i;
      }
    }
    return imgIndex;
  }

  function getId(event) {
    event.preventDefault();
    let imgIndex = event.target.id;
    let imgList = getFolderImages(images[imgIndex].folder);
    setProject(imgList);
    setImgInFolderIndex(getImgInFolderIndex(imgList, images[imgIndex].imgName));
    setShowProject(true);
  }

  if (images) {
    return (
      <div className="Images">
        {showProject ? (
          <ProjectFullScreen
            project={project}
            imgIndex={imgInFolderIndex}
            setShowProject={setShowProject}
          />
        ) : null}
        {images.map((image, index) => {
          let toggle = getToggle(image);
          let src = getSrc(image);
          let end = getEnd(image, index);
          let start = getStart(index);
          let none = image.display === "none" ? " none" : "";
          let classNames =
            start + end + none + " background-" + getBackgroundIndex(index);
          let newWidth = image.showWidth;
          let button = getButtonClassName(image, index);
          let smNone = image.imgWidth < 500 ? " sm-none" : "";

          return (
            <div
              key={index}
              style={{ width: newWidth + "%" }}
              className={classNames + " container" + smNone}
            >
              <div className="img-container">
                <div className="cover-top"></div>
                <a href="/" id={index} onClick={getId}>
                  <i
                    className="fa-solid fa-magnifying-glass-plus"
                    id={index}
                  ></i>
                </a>
                <div className="cover-bottom"></div>
                <XyzTransition
                  appear={false}
                  xyz="fade left back"
                  duration={{ appear: "auto", in: 300, out: 0 }}
                >
                  {toggle && <img src={src} alt=""></img>}
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
