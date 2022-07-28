import React from "react";
import "./OpenCloseButton.css";

export default function OpenCloseButton({
  project,
  tempImgList,
  setTempImgList,
  listChange,
  setListChange,
}) {
  function setImgList(projectIndex) {
    let images = tempImgList;
    let imagesArray = images[projectIndex].imagesArray;

    if (images[projectIndex].openStatus) {
      for (let i = 1; i < imagesArray.length; i++) {
        console.log("btn -");
        imagesArray[i].display = "none";
        images[projectIndex].imagesArray = imagesArray;
        if (i === imagesArray.length - 1) {
          images[projectIndex].openStatus = false;
        }
      }
    } else {
      for (let i = 1; i < imagesArray.length; i++) {
        console.log("btn +");
        imagesArray[i].display = "inline";
        images[projectIndex].imagesArray = imagesArray;
        if (i === imagesArray.length - 1) {
          images[projectIndex].openStatus = true;
        }
      }
    }
    setTempImgList(images);
    setListChange(!listChange);
  }

  function getFolderName(event) {
    let folder = event.target.id;
    let projectIndex = 0;
    tempImgList.map((tempListProject, i) => {
      if (tempListProject.folder === folder) {
        projectIndex = i;
      }
      return true;
    });

    setImgList(projectIndex);
  }

  if (project.imagesArray.length > 1) {
    return (
      <button
        className="OpenCloseButton"
        id={project.folder}
        onClick={getFolderName}
      >
        {project.openStatus ? "-" : "+"}
        {project.imagesArray.length - 1}
      </button>
    );
  } else {
    return null;
  }
}
