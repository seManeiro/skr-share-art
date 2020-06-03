import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from '../../../common/articles.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { fade, slideFromR } from '../../../animations';


@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  animations:[
    fade, slideFromR
  ]
})
export class MainViewComponent implements OnInit {

  filterArticles: Article[]= [];
  articleList: Article[]= [];;
  isEnable: boolean = false;
  
  filteredUniqueTopics: Article[]= [];

  search: string;
  previewText: string;
  previewTitle: string;
  isLoggedIn: boolean;



  constructor(
    private fireService: FirebaseService,
    private router: Router,
    private articleService: ArticleService,
    public authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getListOfArticles();
    this.getUniqueTopics();
    
  }


  getUniqueTopics() {

    this.filteredUniqueTopics = this.removeDuplicatesBy(x => x.topic, this.articleList);
    return this.filteredUniqueTopics; 
  }

  removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {
        var key = keyFn(x), isNew = !mySet.has(key);
        if (isNew) mySet.add(key);
        return isNew;
    });
}


  getListOfArticles() {
    this.fireService.getListOfArticules().subscribe((data) => {
      this.articleList = [];
      data.forEach((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        console.log('objects');
        this.articleList.push(a as Article);
      });
    });
    return this.articleList.sort((a, b) => new Date(1000*b.updatedDate).getDate() - new Date(1000*a.updatedDate).getDate());
  }

  ngOnInit(): void {


  }

  searchFilter() {
    console.log('filtrando: ' + this.search);
    this.filterArticles = this.articleList.filter((o) =>
      Object.keys(o).some((k) =>
        o[k].toString().toLowerCase().includes(this.search.toLowerCase())
      )
    );

    if (this.filterArticles.length > 0) {
      this.articleService.sendArticleList(this.filterArticles);
      this.router.navigate(['filtered_view']);
    } else {
      alert("The search key : '" + this.search + "' didn't give any result.");
      this.router.navigate(['']);
    }
  }

  editArticle(article) {
    this.articleService.sendArticle(article);
    this.router.navigate(['edit_article']);
  }

  deleteArticle(id: string) {
    if (window.confirm('Are sure you want to delete this article ?')) {
      this.fireService.deleteArticle(id);
    }
  }

  showcompleteArticle(article: Article) {
    this.articleService.sendArticle(article);
    this.router.navigate(['complete_view']);
  }

  cardViewTextChunck(text) {
    if (text.length > 200) return text.substr(0, 200) + '...';
    else return text;
  }

  showPreview(text, title: string) {
    this.previewTitle = title;

    if (this.isEnable === true) {
      this.isEnable = false;
    } else if (text.length > 600) {
      this.isEnable = true;
      this.previewText = text.substr(0, 2200) + '...';
    } else if (text.length < 600) {
      this.isEnable = true;
      this.previewText = text;
    }
  }

  removePreview() {
    this.isEnable = false;
  }

  filterArticleList(topic: string) {
    this.filterArticles = this.articleList.filter((t) => t.topic === topic);
    this.articleService.sendArticleList(this.filterArticles);

    this.router.navigate(['filtered_view']);
  }
}






