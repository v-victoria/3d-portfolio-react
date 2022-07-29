import React, { useState, useEffect } from "react";
import OpenCloseButton from "./OpenCloseButton";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import "./Project.css";

export default function Project({
  project,
  tempImgList,
  setTempImgList,
  listChange,
  setListChange,
  updateImg,
  backgroundIndex,
}) {
  const [folder, setFolder] = useState(null);

  useEffect(() => {
    setFolder({
      folderName: project.folder,
      images: project.imagesArray,
    });
  }, [updateImg, project.folder, project.imagesArray]);

  if (folder) {
    return (
      <span className={"Project folder-" + project.folder}>
        {folder.images.map((img, index) => {
          let toggle = img.display === "inline" ? true : false;
          let src = require("./img_md/" +
            folder.folderName +
            "_md/" +
            img.imgName +
            "_md_" +
            img.imgWidth +
            ".jpg");

          let classNames =
            (index === 0 ? " start" : "") +
            (index ===
            folder.images.filter(function (img) {
              return img.display === "inline";
            }).length -
              1
              ? " end"
              : "") +
            " background-" +
            backgroundIndex;

          let newWidth = img.showWidth + "%";

          return (
            <XyzTransition
              appear
              xyz="fade left back"
              key={index}
              duration={{ appear: "auto", in: 300, out: 0 }}
            >
              {toggle && (
                <a href="/">
                  <img
                    src={src}
                    alt=""
                    width={newWidth}
                    className={classNames}
                  />
                </a>
              )}
            </XyzTransition>
          );
        })}

        <OpenCloseButton
          project={project}
          tempImgList={tempImgList}
          setTempImgList={setTempImgList}
          listChange={listChange}
          setListChange={setListChange}
        />
      </span>
    );
  } else {
    return null;
  }
}
