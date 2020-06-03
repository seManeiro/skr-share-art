export interface Article {

  $key: string;
  author: string;
  title: string;
  topic: string;
  text: string;
  createdDate: number;
  updatedDate:number;
  filesUrl:FileUrl[];
  imageUrl:ImageUrl[];
  links:string[];
}

export interface FileUrl {
  name:String;
  url:string;

}

export interface ImageUrl {
  name:String;
  url:string;
}
