import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article, ImageUrl, FileUrl } from 'src/app/common/articles.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {

  article: Article;

  linksList: string[] = [];

  selectedFile: File;
  fileList: File[] = [];
  listOfFilesNames: any[] = [];

  selectedImageFile: File;
  imageFileList: File[] = [];
  listOfImageFilesNames: any[] = [];

  imageTask: AngularFireUploadTask;
  imagePercentage: Observable<number>;
  imageSnapshot: Observable<any>;

  fileTask: AngularFireUploadTask;
  filePercentage: Observable<number>;
  fileSnapshot: Observable<any>;

  parseFilesUrl: any;
  parseImageUrl: any;

  filesUrl:FileUrl[] = [];
  imageUrl:ImageUrl[] = [];

  removeFile:FileUrl;
  removeImage:ImageUrl;

  constructor(
    private articleService: ArticleService,
    private dbService: FirebaseService,
    private storage: AngularFireStorage
  ) {

  }

  ngOnInit(): void {

    this.article = this.articleService.getArticle();

    this.linksList = Object.values(this.article.links);
    this.parseImageUrl = Object.values(this.article.imageUrl);
    this.parseFilesUrl = Object.values(this.article.filesUrl);

    this.parseImageUrl.forEach(a => {
      this.listOfImageFilesNames.push(a.name)
    })

    this.parseFilesUrl.forEach(a => {
      this.listOfFilesNames.push(a.name)
    })

    this.filesUrl = Object.values(this.article.filesUrl);
    this.imageUrl = Object.values(this.article.imageUrl);

    console.log(JSON.stringify(this.imageUrl))
    console.log(JSON.stringify(this.filesUrl));

  }

  addLink(link: HTMLInputElement) {
    if (link.value !== '') {
      this.linksList.push(link.value);
    }
    console.log(JSON.stringify(this.linksList));

    link.value = '';
  }

  removeLink(index) {
    this.linksList.splice(index, 1);
    console.log(JSON.stringify(this.linksList));
  }

  update() {
    this.article.links = this.linksList;
    this.article.filesUrl = this.filesUrl;
    this.article.imageUrl = this.imageUrl;

    console.log(JSON.stringify(this.article));
    this.dbService.UpdateArticle(this.article);
  }

  onFileChanged(event: any) {
    for (var i = 0; i <= event.target.files.length -1 ; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFilesNames.push(selectedFile.name);
    }

  }

  removeSelectedFile(index, fileName) {
    this.listOfFilesNames.splice(index, 1);
    this.fileList.splice(index, 1);

    let url = this.getFilesUrl(fileName);
    this.filesUrl.splice(index, 1);
    this.storage.storage.refFromURL(url).delete();

  }

  getFilesUrl(fileName){
    this.removeFile = this.filesUrl.find(a => a.name === fileName);
    return  this.removeFile.url;

  }

  onImageFileChanged(event: any) {

    for (var i = 0; i <= event.target.files.length -1; i++) {
      var selectedImageFile = event.target.files[i];
      this.imageFileList.push(selectedImageFile);
      this.listOfImageFilesNames.push(selectedImageFile.name);
    }
  }

  removeSelectedImageFile(index, fileName) {
    this.listOfImageFilesNames.splice(index, 1);
    this.imageFileList.splice(index, 1);

    let url = this.getImageFilesUrl(fileName);
    this.imageUrl.splice(index, 1);
    this.storage.storage.refFromURL(url).delete();

  }

  getImageFilesUrl(fileName){
    this.removeImage = this.imageUrl.find(a => a.name === fileName);
    return  this.removeImage.url;

  }

  saveImageFiles() {

    this.imageFileList.forEach((file) => {
      let name = `skr/images/${Date.now()}_${file.name}`;
      console.log(name)
      const fileRef = this.storage.ref(name);

      this.imageTask = this.storage.upload(name, file);

      this.imagePercentage = this.imageTask.percentageChanges();

      this.imageSnapshot = this.imageTask.snapshotChanges().pipe(
        finalize(async () => {
          await fileRef.getDownloadURL().subscribe((url) => {
            let imgUrl: ImageUrl = { name: name, url: url };
            this.imageUrl.push(imgUrl);
          });
        })
      );
    });
  }

  saveFiles() {

    this.fileList.forEach((file) => {
      let name = `skr/files/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(name);
      console.log(name)

      this.fileTask = this.storage.upload(name, file);

      this.filePercentage = this.fileTask.percentageChanges();

      this.fileSnapshot = this.fileTask.snapshotChanges().pipe(
        finalize(async () => {
          await fileRef.getDownloadURL().subscribe((url) => {
            let fUrl: FileUrl = { name: name, url: url };
            this.filesUrl.push(fUrl);

          });
        })
        );
      });
  }



}
