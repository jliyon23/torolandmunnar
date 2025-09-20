/**
 * Applies Cloudinary transformations to a given image URL.
 * @param {string} url - The original Cloudinary image URL.
 * @param {string} transformations - A comma-separated string of Cloudinary transformations.
 * @returns {string} The new URL with transformations applied.
 */
export const optimizeCloudinaryImage = (url, transformations) => {
  const parts = url.split("/upload/");
  if (parts.length === 2) {
    return `${parts[0]}/upload/${transformations}/${parts[1]}`;
  }
  // Return original url if format is unexpected or not a cloudinary url
  return url;
};