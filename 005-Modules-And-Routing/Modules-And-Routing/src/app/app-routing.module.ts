import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerProfilePostsComponent} from "./customer/customer-profile-posts/customer-profile-posts.component";
import {CustomerProfileAlbumsComponent} from "./customer/customer-profile-albums/customer-profile-albums.component";
import {CustomerProfileComponent} from "./customer/customer-profile/customer-profile.component";
import {CustomerPostsResolver} from "./customer/customer-posts.resolver";
import {AboutComponent} from "./pages/about/about.component";
import {HomeComponent} from "./pages/home/home.component";
import {DefaultViewComponent} from "./pages/default-view/default-view.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'to-be-redirected'
  },
  {
    path: 'to-be-redirected',
    component: DefaultViewComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'user/:id',
    // canActivate: [ProfileGuard],
    component: CustomerProfileComponent,
    children: [
      {
        // user/:id/posts
        path: 'posts',
        resolve: {posts: CustomerPostsResolver},
        component: CustomerProfilePostsComponent
      },
      {
        path: 'albums',
        component: CustomerProfileAlbumsComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
