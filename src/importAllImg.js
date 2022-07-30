export function importAllImg(list) {
  let images = null;
  list.keys().map((img, index) => {
    let folder = img.slice(2, 4);
    let imgName = img.slice(8, 13);
    let pathBeforeWidth = img.slice(0, 17);
    let imgWidth = parseInt(
      img.replace(pathBeforeWidth, "").replace(".jpg", "")
    );

    if (images === null) {
      images = [];
      images[index] = {
        folder: folder,
        openStatus: true,
        imgName: imgName,
        imgWidth: imgWidth,
        showWidth: 0,
        display: "inline",
      };
    } else {
      let display = "none";
      let openStatus = false;

      if (images[index - 1].folder !== folder) {
        display = "inline";
      }
      if (folder === "01" || folder === "02") {
        openStatus = true;
        display = "inline";
      }
      images[images.length] = {
        folder: folder,
        openStatus: openStatus,
        imgName: imgName,
        imgWidth: imgWidth,
        showWidth: 0,
        display: display,
      };
    }

    return true;
  });

  return images;
}
