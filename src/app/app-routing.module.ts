import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ct', pathMatch: 'full' },
  /* { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)}, */
  { path: 'ct', loadChildren: './pages/ct/ct.module#CtPageModule' },
  { path: 'ct-details', loadChildren: './pages/ct-details/ct-details.module#CtDetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
