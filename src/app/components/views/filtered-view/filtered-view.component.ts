import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/common/articles.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { fade, slideFromR } from 'src/app/animations';

@Component({
  selector: 'app-filtered-view',
  templateUrl: './filtered-view.component.html',
  styleUrls: ['./filtered-view.component.css'],
  animations:[
    fade, slideFromR
  ]
})
export class FilteredViewComponent implements OnInit {

  articleList: Article[];

  filteredTopics: Set<string>;
  isEnable:boolean= false;

  previewText:string;
  previewTitle:string;
  isLoggedIn: boolean;


constructor(private fireService : FirebaseService, private router:Router,
            private articleService: ArticleService, public authService :AuthService) {

              this.isLoggedIn = this.authService.isLoggedIn();
              this.articleList= articleService.getArticleList();
              this.filteredTopics = this.getUniqueTopics(this.articleList);

 }



  ngOnInit(): void {

  }

  getUniqueTopics(articleList: Article[]){


    let uniqueSet ;
    articleList.forEach(t =>{
      uniqueSet = new Set(t.topic); 
    }
      );

    return uniqueSet;

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

  showcompleteArticle(article:Article){
    this.articleService.sendArticle(article);
    this.router.navigate(['complete_view']);

  }

  cardViewTextChunck(text){
    if(text.length > 200)
      return text.substr(0, 200) + '...';
      else
      return text;
  }


  showPreview(text, title:string){
    this.previewTitle = title;

    if(this.isEnable === true){
      this.isEnable=false;
    }
    else if(text.length > 600) {
      this.isEnable= true;
      this.previewText= text.substr(0, 1200) + '...';
    }
    else if(text.length < 600){
      this.isEnable= true;
      this.previewText=text;
    }
  }

  removePreview(){
    this.isEnable=false;
  }



}
