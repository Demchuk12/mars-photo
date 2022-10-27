import { Photo } from './../models/photo';
export class GetPhotos {
  static readonly type = '[PHOTO] Get Photos';
  constructor(public rover: string, public camera: string, public sol :number){}
}

export class GetPhotosSuccess {
  static readonly type = '[PHOTO] Get Photos Success';
  constructor(public photos: Photo[]){}
}

export class GetPhotosFail {
  static readonly type = '[PHOTO] Get Photos ';
  constructor(public error: any){}
}

export class LoadMorePhotos {
  static readonly type = '[PHOTO] Load More'
  constructor(public rover: string, public camera: string, public sol :number){}
}

export class LoadMorePhotosSuccess {
  static readonly type = '[PHOTO] Load More Success'
  constructor(public addPhotos: Photo[]){}
}

export class LoadMorePhotosFail {
  static readonly type = '[PHOTO] Load More Fail'
  constructor(public error: any){}
}

export class RemovePhotos {
  static readonly type = '[PHOTO] Remove Photos'
}
