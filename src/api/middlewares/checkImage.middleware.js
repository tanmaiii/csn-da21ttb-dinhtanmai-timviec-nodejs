import sizeOf from "image-size";

export default function checkImage(file) {
  try {
    const dimensions = sizeOf(file.path);
    return dimensions.width > 0 && dimensions.height > 0;
  } catch (error) {
    return false;
  }
}
