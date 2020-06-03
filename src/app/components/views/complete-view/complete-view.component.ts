import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article, ImageUrl, FileUrl } from 'src/app/common/articles.model';
import { Router } from "@angular/router";
import { ArticleService } from '../../../services/article.service';
import {Location} from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { fade, slideFromL } from 'src/app/animations';

@Component({
  selector: 'complete-view',
  templateUrl: './complete-view.component.html',
  styleUrls: ['./complete-view.component.css'],
  animations:[
    fade, slideFromL
  ]
})
export class CompleteViewComponent implements OnInit{

  article:Article;
  isLoggedIn:boolean;

  linksList:string[]=[];

   imageList:ImageUrl[]=[];

   filesList:FileUrl[]=[];


  constructor(private authService :AuthService,private fireService : FirebaseService,private articleService: ArticleService, private router:Router, private _location: Location) {
    this.article = this.articleService.getArticle();

    this.isLoggedIn = this.authService.isLoggedIn();

  }



  ngOnInit() {

   this.linksList =Object.values(this.article.links);
   this.imageList =Object.values(this.article.imageUrl);
   this.filesList =Object.values(this.article.filesUrl);

  }

  editArticle(article){
    this.articleService.sendArticle(article);
    this.router.navigate(['edit_article']);
  }

  deleteArticle(id:string) {
    if (window.confirm('Are sure you want to delete this article ?')) {
     this.fireService.deleteArticle(id)
    }
  }

  close(){
    this._location.back();
  }

}
