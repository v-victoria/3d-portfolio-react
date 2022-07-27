export function importAllImg(list) {
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
