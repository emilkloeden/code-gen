import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpringLanguageComponent } from './spring-language/spring-language.component';
import { TypescriptLanguageComponent } from './typescript-language/typescript-language.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: '/spring'
  },
  {
    path: 'spring',
    component: SpringLanguageComponent,
  },
  {
    path: 'typescript',
    component: TypescriptLanguageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
