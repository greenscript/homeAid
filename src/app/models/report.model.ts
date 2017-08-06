export class Report {
  private author: string = '';
  private description: string = '';
  private authorImg: string = '';

  constructor(pAuthor: string, pDesciption: string, pAuthorImg: string) {
    this.setAuthor(pAuthor);
    this.setDescription(pDesciption);
    this.setAuthorImg(pAuthorImg);
  }

  getAuthor() {
    return this.author;
  }

  getDescription() {
    return this.description;
  }

  getAuthorImg() {
    return this.authorImg;
  }

  setAuthor(pValue) {
    this.setAuthor = pValue;
  }

  setDescription(pValue) {
    this.description = pValue;
  }

  setAuthorImg(pValue) {
    this.authorImg = pValue;
  }
}
