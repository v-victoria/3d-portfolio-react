import React, { useState, useEffect } from "react";
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
      saveShowWidth();
      setUpdateImages(images);
    }

    function updateImgWidth(folderName) {
      let tempRows = [];
      let row = {};
      if (folderName === "start") {
        images = importAll(require.context("./img_md", true, /\./));

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

    function importAll(list) {
      let images = null;
      list.keys().map((img) => {
        let folder = img.slice(2, 4);
        let imgName = img.slice(8, 13);
        let pathBeforeWidth = img.slice(0, 17);
        let imgWidth = parseInt(
          img.replace(pathBeforeWidth, "").replace(".jpg", "")
        );

        if (images === null) {
          images = [];
          let array = [];
          array[0] = { imgName: imgName, imgWidth: imgWidth, showWidth: 0 };
          let image = {
            folder: folder,
            openStatus: true,
            imagesArray: array,
          };
          images[0] = image;
        } else {
          let openStatus = false;
          if (images.length === 1) {
            openStatus = true;
          }
          if (images[images.length - 1].folder === folder) {
            let imagesArray = images[images.length - 1].imagesArray;
            imagesArray[imagesArray.length] = {
              imgName: imgName,
              imgWidth: imgWidth,
              showWidth: 0,
            };
          } else {
            let array = [];
            array[0] = { imgName: imgName, imgWidth: imgWidth, showWidth: 0 };
            let image = {
              folder: folder,
              openStatus: openStatus,
              imagesArray: array,
            };
            images[images.length] = image;
          }
        }

        return true;
      });

      return images;
    }

    function saveShowWidth() {
      rows.map((row) => {
        let rowWidth = row.rowWidth;
        row.imagesInRow.map((img) => {
          let imgWidth =
            images[img.imagesNumber].imagesArray[img.imagesArrayNumber]
              .imgWidth;
          let showWidth =
            (imgWidth / rowWidth) * (100 - row.imagesInRow.length * 2);
          images[img.imagesNumber].imagesArray[
            img.imagesArrayNumber
          ].showWidth = showWidth;
          return true;
        });
        return true;
      });
    }
  }, [rows, tempImgList]);

  if (updateImages !== null) {
    return (
      <div className="Gallery">
        {updateImages.map((project, index) => {
          return (
            <span key={index} className={project.folder}>
              {project.imagesArray.map((image, i) => {
                if (!(!project.openStatus && i > 0)) {
                  return (
                    // <a key={i} href="/" width={image.showWidth + "%"}>
                    <img
                      key={i}
                      src={require("./img_md/" +
                        project.folder +
                        "_md/" +
                        image.imgName +
                        "_md_" +
                        image.imgWidth +
                        ".jpg")}
                      alt=""
                      width={image.showWidth + "%"}
                    />
                    // </a>
                  );
                } else {
                  return null;
                }
              })}
            </span>
          );
        })}
      </div>
    );
  } else {
    return "Loading...";
  }
}
