export default function checkFile(file) {

  if (!file) return false;

  if (file) {
    const fileSizeInBytes = file.size;
    const fileSizeInKilobytes = fileSizeInBytes / 1024;

    // You can now use these values for your own logic
    if (fileSizeInKilobytes > 3000) {
      return false;
    } else {
      return true;
    }
  }
}
