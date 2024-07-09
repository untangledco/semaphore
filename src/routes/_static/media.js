export const DEFAULT_MEDIA_WIDTH = 300
export const DEFAULT_MEDIA_HEIGHT = 250

export const ONE_TRANSPARENT_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

export const MEDIA_ALT_CHAR_LIMIT = 420

const acceptedFileTypes = [
  '.3gp',
  '.aac',
  '.flac',
  '.gif',
  '.jpeg',
  '.jpg',
  '.m4a',
  '.m4v',
  '.mov',
  '.mp3',
  '.mp4',
  '.oga',
  '.ogg',
  '.opus',
  '.png',
  '.wav',
  '.webm',
  '.wma',
  'audio/3gpp',
  'audio/aac',
  'audio/flac',
  'audio/m4a',
  'audio/mp3',
  'audio/mp4',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/wave',
  'audio/webm',
  'audio/x-aac',
  'audio/x-m4a',
  'audio/x-mp4',
  'audio/x-pn-wave',
  'audio/x-wav',
  'image/gif',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'video/ogg',
  'video/quicktime',
  'video/webm',
  'video/x-ms-asf'
]

export const mediaAccept = acceptedFileTypes.join(',')
