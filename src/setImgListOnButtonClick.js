export function setImgListOnButtonClick(
  images,
  setTempImgList,
  setListChange,
  projectIndex,
  setRunTimer
) {
  let tempImages = images;

  if (tempImages[projectIndex[0]].openStatus) {
    for (
      let i = projectIndex[1];
      i <= projectIndex[projectIndex.length - 1];
      i++
    ) {
      if (tempImages[i].display === "inline") {
        tempImages[i].display = "none";
        tempImages[i].openStatus = false;
      }
      if (i === projectIndex[projectIndex.length - 1]) {
        tempImages[projectIndex[0]].openStatus = false;
      }
    }
  } else {
    for (
      let i = projectIndex[1];
      i <= projectIndex[projectIndex.length - 1];
      i++
    ) {
      if (tempImages[i].display === "none") {
        tempImages[i].display = "inline";
        tempImages[i].openStatus = true;

        if (i === projectIndex[projectIndex.length - 1]) {
          tempImages[projectIndex[0]].openStatus = true;
          console.log("setRunTimer(false)");
          setRunTimer(false);
        } else {
          console.log("setRunTimer(true)");
          setRunTimer(true);
        }
        i = projectIndex[projectIndex.length - 1] + 1;
      }
    }
  }
  console.log(tempImages);
  setTempImgList(tempImages);
  setListChange((prevState) => !prevState);
}
