import { GetPhotos,
         GetPhotosSuccess,
         GetPhotosFail,
         LoadMorePhotos,
         LoadMorePhotosSuccess,
         LoadMorePhotosFail,
         RemovePhotos
        } from './photo.action';
import { PhotoService } from './../sevices/photo.service';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Photo } from "../models/photo";


export class PhotoStateModel {
  photos!: Photo[];
  pages!: number;
  loading!: boolean;
  loaded!: boolean;
  loadMoreLoading!: boolean;
  loadMoreLoaded!: boolean;
  isEmpty!: boolean;
}

@State<PhotoStateModel>({
  name: 'photos',
  defaults: {
    photos: [],
    pages: 1,
    loading: false,
    loaded: true,
    loadMoreLoading: false,
    loadMoreLoaded: true,
    isEmpty: false,
  }
})

@Injectable()
export class PhotoState {

  constructor(private photoService: PhotoService){}

  @Selector()
  static getPhotos(state: PhotoStateModel) {
    return state.photos;
  }


  @Selector()
  static getPhotosLoading(state: PhotoStateModel) {
    return state.loading
  }

  @Selector()
  static getPhotosLoaded(state: PhotoStateModel) {
    return state.loaded;
  }

  @Selector()
  static getLoadMoreLoading(state: PhotoStateModel) {
    return state.loadMoreLoading;
  }

  @Selector()
  static getLoadMoreLoaded(state: PhotoStateModel) {
    return state.loadMoreLoaded;
  }

  @Selector()
  static getIsEmpty(state: PhotoStateModel) {
    return state.isEmpty;
  }



  @Action(GetPhotos)
  get(ctx: StateContext<PhotoStateModel>,{camera,rover,sol} :GetPhotos){
    const state = ctx.getState();
    ctx.patchState({
      loading: true,
      loaded: false
    });
    this.photoService.getPhotos(rover,sol,camera, state.pages).subscribe(
      response => ctx.dispatch(new GetPhotosSuccess(response.photos)),
      error => ctx.dispatch(new GetPhotosFail(error))
    );
  }

  @Action(GetPhotosSuccess)
  getPhotoSuccess(ctx: StateContext<PhotoStateModel>,{photos} : GetPhotosSuccess) {
    if(photos.length != 0){
      ctx.patchState({
        photos: photos,
        loading: false,
        loaded: true
      });
    } else {
      ctx.patchState({
        loading: false,
        loaded: true,
        isEmpty: true,
        loadMoreLoaded: false
      });
    }

  }

  @Action(GetPhotosFail)
  GetPhotosFail(ctx: StateContext<PhotoStateModel>,{error} : GetPhotosFail){
    ctx.patchState({
      loading: false,
      loaded: false
    });
  }

  @Action(LoadMorePhotos)
  loadMorePhotos(ctx: StateContext<PhotoStateModel>, {camera,rover,sol} : LoadMorePhotos) {
    const state = ctx.getState();
    ctx.patchState({
      loadMoreLoading: true,
      loadMoreLoaded: false
    });
    this.photoService.getPhotos(rover,sol,camera,state.pages + 1).subscribe(
      response => ctx.dispatch(new LoadMorePhotosSuccess(response.photos)),
      error => ctx.dispatch(new LoadMorePhotosFail(error))
    )
  }

  @Action(LoadMorePhotosSuccess)
  loadMorePhotosSuccess(ctx: StateContext<PhotoStateModel>, {addPhotos}: LoadMorePhotosSuccess) {
    const state = ctx.getState();
    if(addPhotos.length !== 0) {
      ctx.patchState({
        photos: [...state.photos,...addPhotos],
        pages: state.pages + 1,
        loadMoreLoading: false,
        loadMoreLoaded:true
      })
    } else {
      ctx.patchState({
        loadMoreLoading: false,
        loadMoreLoaded: true
      })
    }

  }

  @Action(LoadMorePhotosFail)
  loadMorePhotosFail(ctx: StateContext<PhotoStateModel>) {
    ctx.patchState({
      loadMoreLoaded: false,
      loadMoreLoading: false
    })
  }

  @Action(RemovePhotos)
  removePhotos(ctx: StateContext<PhotoStateModel>) {
    ctx.patchState({
      photos: [],
      pages: 1,
      loading: false,
      loaded: true,
      loadMoreLoading: false,
      loadMoreLoaded: true,
      isEmpty: false,
    });
  }
}
