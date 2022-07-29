export function setImgListOnButtonClick(
  tempImgList,
  setTempImgList,
  setListChange,
  projectIndex,
  setRunTimer
) {
  let images = tempImgList;
  let imagesArray = images[projectIndex].imagesArray;

  if (images[projectIndex].openStatus) {
    for (let i = imagesArray.length - 1; i > 0; i--) {
      if (imagesArray[i].display === "inline") {
        imagesArray[i].display = "none";
        images[projectIndex].imagesArray = imagesArray;

        if (i === 1) {
          images[projectIndex].openStatus = false;
        }
      }
    }
  } else {
    for (let i = 1; i < imagesArray.length; i++) {
      if (imagesArray[i].display === "none") {
        imagesArray[i].display = "inline";
        images[projectIndex].imagesArray = imagesArray;

        if (i === imagesArray.length - 1) {
          images[projectIndex].openStatus = true;
          setRunTimer(false);
        } else {
          setRunTimer(true);
        }
        i = imagesArray.length;
      }
    }
  }

  setTempImgList(images);
  setListChange((prevState) => !prevState);
}
