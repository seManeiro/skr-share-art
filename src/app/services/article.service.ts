import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Article } from 'src/app/common/articles.model';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private article:Article;
  private articleList:Article [];

    sendArticle(article: Article) {
        this.article= article
    }

    sendArticleList(articleList: Article[]) {
      this.articleList= articleList;
  }

    clearArticle() {
        this.article = null;;
    }

    clearArticleList() {
      this.article = null;;
  }

    getArticle() {
        return this.article;
    }

    getArticleList() {
      return this.articleList;
  }
}
