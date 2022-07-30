export function saveShowWidth(rows, images) {
  rows.map((row) => {
    let rowWidth = row.rowWidth;
    row.imagesInRow.map((img) => {
      let imgWidth = images[img.imagesNumber].imgWidth;
      let showWidth =
        (imgWidth / rowWidth) * (100 - row.imagesInRow.length * 2);
      images[img.imagesNumber].showWidth = showWidth;
      return true;
    });
    return true;
  });

  return images;
}
