import { ActivatedRoute} from '@angular/router';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription} from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { GetPhotos, LoadMorePhotos, RemovePhotos } from 'src/app/state/photo.action';
import { PhotoState } from 'src/app/state/photo.state';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-photo-page',
  templateUrl: './photo-page.component.html',
  styleUrls: ['./photo-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PhotoPageComponent implements OnDestroy, OnInit {

  @Select(PhotoState.getPhotos) photos$!: Observable<Photo[]>;
  @Select(PhotoState.getPhotosLoading) loading$!: Observable<boolean>;
  @Select(PhotoState.getPhotosLoaded) loaded$!: Observable<boolean>;
  @Select(PhotoState.getLoadMoreLoading) loadMoreLoading$!: Observable<boolean>;
  @Select(PhotoState.getLoadMoreLoaded) loadMoreLoaded$! : Observable<boolean>;
  @Select(PhotoState.getIsEmpty) isEmpty$!: Observable<boolean>;
  rover!: string;
  camera!: string;
  sol!: number;
  isListView: boolean = false;
  subscription!: Subscription
  constructor(private store: Store,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
       this.rover = params['rover'];
       this.camera = params['camera'];
       this.sol = params['sol'];
       this.store.dispatch(new GetPhotos(
        this.rover,
        this.camera,
        this.sol
      ));
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new RemovePhotos);

  }

  loadMore(): void {
    this.store.dispatch(new LoadMorePhotos(
      this.rover,
      this.camera,
      this.sol
    ));

  }

  showListView(): void {
    this.isListView = true;
  }

  showGridView(): void {
    this.isListView = false;
  }

}
