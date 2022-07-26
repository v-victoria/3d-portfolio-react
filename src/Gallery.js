import React from "react";

export default function Gallery() {
  function importAll(list) {
    let images = null;
    list.keys().map((img) => {
      let folder = img.slice(2, 4);
      let imgName = img.slice(-12, -7);

      if (images === null) {
        images = [];
        let array = [];
        array[0] = imgName;
        let image = { folder: folder, imgNames: array };
        images[0] = image;
      } else {
        if (images[images.length - 1].folder === folder) {
          let imgNames = images[images.length - 1].imgNames;
          imgNames[imgNames.length] = imgName;
        } else {
          let array = [];
          array[0] = imgName;
          let image = { folder: folder, imgNames: array };
          images[images.length] = image;
        }
      }

      return true;
    });

    return images;
  }

  const images = importAll(require.context("./img_md", true, /\./));

  return (
    <div>
      {images.map((project, index) => {
        return (
          <ul key={index} className={"folder-" + project.folder}>
            {project.imgNames.map((imageName, i) => {
              return (
                <li key={i}>
                  <img
                    src={require("./img_md/" +
                      project.folder +
                      "_md/" +
                      imageName +
                      "_md.jpg")}
                    alt=""
                  />
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}
