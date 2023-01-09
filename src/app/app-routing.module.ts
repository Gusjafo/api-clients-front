import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/app-home', pathMatch: 'full' },
  { path: 'app-home', component: HomeComponent },
  { path: 'app-create', component: CreateComponent },
  { path: 'app-edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
