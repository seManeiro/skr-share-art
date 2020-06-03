import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Article, FileUrl, ImageUrl } from 'src/app/common/articles.model';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent implements OnInit {


  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];

  selectedImageFile: File;
  imageFileList: File[] = [];
  listOfImageFiles: any[] = [];

  imageUrlList: ImageUrl[];

  imageTask: AngularFireUploadTask;
  imagePercentage: Observable<number>;
  imageSnapshot: Observable<any>;

  fileTask: AngularFireUploadTask;
  filePercentage: Observable<number>;
  fileSnapshot: Observable<any>;

  article = {
    author: '',
    title: '',
    topic: '',
    text: '',
    createdDate: '',
    updatedDate: '',
    filesUrl: [],
    imageUrl: [],
    links: [],
  };

  constructor(
    private dbService: FirebaseService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name);
    }


  }

  removeSelectedFile(index) {
    this.listOfFiles.splice(index, 1);
    this.fileList.splice(index, 1);

  }

  onImageFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedImageFile = event.target.files[i];
      this.imageFileList.push(selectedImageFile);
      this.listOfImageFiles.push(selectedImageFile.name);
    }

  }

  removeSelectedImageFile(index) {
    this.listOfImageFiles.splice(index, 1);
    this.imageFileList.splice(index, 1);

  }

  addLink(link: HTMLInputElement) {
    this.article.links.push(link.value);
    console.log(JSON.stringify(this.article.links));
    link.value = '';
  }

  removeLink(index) {
    this.article.links.splice(index, 1);
  }



  saveArticleToDB() {
    let article: Article = {
      $key: null,
      title: this.article.title,
      author: this.article.author,
      topic: this.article.topic,
      text: this.article.text,
      createdDate: Date.now(),
      updatedDate: Date.now(),
      filesUrl: this.article.filesUrl,
      imageUrl: this.article.imageUrl,
      links: this.article.links,
    };

    this.dbService.addNewArticle(article);
  }

  saveImageFiles(){

    this.imageFileList.forEach((file) => {
      let name = `skr/images/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(name);

      this.imageTask = this.storage.upload(name, file);

      this.imagePercentage = this.imageTask.percentageChanges();

      this.imageSnapshot = this.imageTask.snapshotChanges().pipe(
        finalize(async () => {
          await fileRef.getDownloadURL().subscribe((url) => {
            let imageUrl: ImageUrl = { name: name, url: url };
            this.article.imageUrl.push(imageUrl);
          });
        })
      );
    });

  }




  saveFiles() {
    this.fileList.forEach((file) => {
      let name = `skr/files/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(name);

      this.fileTask = this.storage.upload(name, file);

      this.filePercentage = this.fileTask.percentageChanges();

      this.fileSnapshot = this.fileTask.snapshotChanges().pipe(

       finalize(async () => {
          await fileRef.getDownloadURL().subscribe((url) => {
            let fUrl: FileUrl = { name: name, url: url };
            this.article.filesUrl.push(fUrl);
          });
        })
      );
    });

  }


  submit() {
    let article: Article = {
      $key: null,
      title: this.article.title,
      author: this.article.author,
      topic: this.article.topic,
      text: this.article.text,
      createdDate: Date.now(),
      updatedDate: Date.now(),
      filesUrl: this.article.filesUrl,
      imageUrl: this.article.imageUrl,
      links: this.article.links,
    };

    this.dbService.addNewArticle(article);
  }
}
