export function updateImgWidth(images) {
  let tempRows = [];
  let row = {};

  images.map((image, index) => {
    if (image.display === "inline") {
      let rowWidth = (row.rowWidth ? row.rowWidth : 0) + image.imgWidth;
      let imagesInRow = row.imagesInRow ? row.imagesInRow : [];
      imagesInRow[imagesInRow.length] = {
        imagesNumber: index,
        folder: image.folder,
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

  return tempRows;
}
