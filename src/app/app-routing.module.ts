import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PhotoPageComponent } from './pages/photo-page/photo-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent, title: 'Explore Mars' },
  {path: 'photo', component: PhotoPageComponent,title: 'Mars Photos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
