export enum FileMimeTypeEnum {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  GIF = 'image/gif',
  BMP = 'image/bmp',
  TIFF = 'image/tiff',
  TIF = 'image/tif',
  SVG = 'image/svg+xml',
  ICO = 'image/x-icon',
  HEIC = 'image/heic',
  HEIF = 'image/heif',
  AVIF = 'image/avif',
  DNG = 'image/x-adobe-dng',
  CR2 = 'image/x-canon-cr2',
  NEF = 'image/x-nikon-nef',
  ARW = 'image/x-sony-arw',
  RAF = 'image/x-fuji-raf',
  PSD = 'image/vnd.adobe.photoshop',
  ICNS = 'image/x-icns',
}

// Массив из enum
export const ImageMimeTypes = Object.values(FileMimeTypeEnum);
