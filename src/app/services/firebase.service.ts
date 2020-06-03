import { Injectable } from '@angular/core';
import { Article } from '../common/articles.model';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {


  articleList: AngularFireList<any>; // Reference to Student data list, its an Observable
  articleObject: AngularFireObject<any>;



  constructor(private db: AngularFireDatabase, private router: Router) {}

  UpdateArticle(article: Article) {
    this.articleObject = this.db.object('/articles/' + article.$key);

    console.log('aca :' + JSON.stringify(article));

    this.articleObject
      .update({
        author: article.author,
        title: article.title,
        topic: article.topic,
        text: article.text,
        createdDate: article.createdDate,
        updatedDate: Date.now(),
        filesUrl:article.filesUrl,
        imageUrl: article.imageUrl,
        links:article.links
      })
      .then(async () => {
        await alert('the artcile was updated successfuly!');
        this.router.navigate(['']);
      });
  }

  getListOfArticules() {
    return this.db.list('/articles').snapshotChanges();
  }

  addNewArticle(article: Article) {
    this.articleList = this.db.list('articles');
    this.articleList
      .push({
        author: article.author,
        title: article.title,
        topic: article.topic,
        text: article.text,
        createdDate: article.createdDate,
        updatedDate: article.updatedDate,
        filesUrl: article.filesUrl,
        imageUrl: article.imageUrl,
        links: article.links

      })
      .then(async () => {
        await alert('the artcile was successfuly stored!');
        this.router.navigate(['']);
      });
  }



  deleteArticle(id: string) {
    this.articleObject = this.db.object('/articles/' + id);
    this.articleObject.remove().then(async () => {
      await alert('the artcile was deleted successfuly!');
      this.router.navigate(['']);
    });
  }
}
