import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {path:"",component:ReadComponent},
  {path:"add", component:AddComponent},
  {path:"add/:id", component:AddComponent},
  {path:"delete", component:DeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
