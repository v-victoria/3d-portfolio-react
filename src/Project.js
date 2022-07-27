import React from "react";
import OpenCloseButton from "./OpenCloseButton";

export default function Project({ project }) {
  return (
    <span className={project.folder}>
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
      <OpenCloseButton />
    </span>
  );
}
