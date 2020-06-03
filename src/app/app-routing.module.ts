
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { MainViewComponent} from './components/views/main-view/main-view.component';
import { CompleteViewComponent} from './components/views/complete-view/complete-view.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { ArticleFormComponent } from './components/form/article-form.component';
import { FilteredViewComponent } from './components/views/filtered-view/filtered-view.component';

import { AuthGuard } from './services/auth-guard.service'
import { EditArticleComponent } from './components/form/edit-article/edit-article.component';

const routes: Routes = [

  { path: '', component: MainViewComponent },
  { path: 'complete_view', component: CompleteViewComponent },
  { path: 'filtered_view', component: FilteredViewComponent },
  { path: 'new_article', component: ArticleFormComponent, canActivate: [AuthGuard] },
  { path: 'edit_article', component: EditArticleComponent, canActivate: [AuthGuard] },
  { path: 'sign_up', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SignInComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule {}
