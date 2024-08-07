export type Size = {
  width: number,
  height: number
}
export type Coordinate = {
  x: number,
  y: number,
}
export const adaptCoordinatesToImgSize = (position: Coordinate, originalSize: Size, currentSize: Size): Coordinate => {
  const widthRatio = currentSize.width / originalSize.width;
  const heightRatio = currentSize.height / originalSize.height;

  return {
    x: Math.round(position.x * widthRatio),
    y: Math.round(position.y * heightRatio)
  }
} 