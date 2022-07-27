import React, { useState, useEffect } from "react";
import { saveShowWidth } from "./saveShowWidth";
import { importAllImg } from "./importAllImg";
import Project from "./Project";
import "./Gallery.css";

export default function Gallery() {
  const [rows, setRows] = useState(null);
  const [updateImages, setUpdateImages] = useState(null);
  const [tempImgList, setTempImgList] = useState(null);

  useEffect(() => {
    let images = tempImgList;

    if (rows === null) {
      setRows(updateImgWidth("start"));
      setTempImgList(images);
    } else {
      images = saveShowWidth(rows, images);
      setUpdateImages(images);
    }

    function updateImgWidth(folderName) {
      let tempRows = [];
      let row = {};
      if (folderName === "start") {
        images = importAllImg(require.context("./img_md", true, /\./));

        images.map((project, index) => {
          project.imagesArray.map((image, i) => {
            if (!(!project.openStatus && i > 0)) {
              let rowWidth = (row.rowWidth ? row.rowWidth : 0) + image.imgWidth;
              let imagesInRow = row.imagesInRow ? row.imagesInRow : [];
              imagesInRow[imagesInRow.length] = {
                imagesNumber: index,
                folder: project.folder,
                imagesArrayNumber: i,
              };

              row = {
                rowWidth: rowWidth,
                imagesInRow: imagesInRow,
              };

              if (row.rowWidth > 2000) {
                tempRows[tempRows.length] = row;
                row = {};
              }
            } else {
              image.showWidth = 0;
            }
            return true;
          });
          return true;
        });
      }

      return tempRows;
    }
  }, [rows, tempImgList]);

  if (updateImages !== null) {
    return (
      <div className="Gallery">
        {updateImages.map((project, index) => {
          return <Project key={index} project={project} />;
        })}
      </div>
    );
  } else {
    return "Loading...";
  }
}
