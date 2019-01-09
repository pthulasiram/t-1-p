import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Book } from './book';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
//import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
//import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private dbPath = 'ebooks';
  authState: any = null;
  private popularDbPath = 'popular';
  booksRef: AngularFireList<Book> = null;
  maxBooks = 40;
  ud="1scY4sHsZmOJVrVHm1vnuX3eNnE2"
  //private afAuth:AngularFireAuth
  constructor(private db: AngularFireDatabase,private http: Http) {
    // this.afAuth.authState.subscribe((auth) => {
    //   this.authState = auth
    //   if (auth != null) {
    //     console.log(auth.uid);
       
    //   }
    // });
    this.booksRef = db.list(this.dbPath);
    //this.popularEbooksRef = db.list(this.popularDbPath);
  }
  addBook(book: Book): void {
    this.booksRef.push(book);
  }
  updateBook(key: string, value: any): void {
    this.booksRef.update(key, value).catch(error => this.handleError(error));
  }
  deleteBook(key: string): void {
    this.booksRef.remove(key).catch(error => this.handleError(error));
  }
  getAllBooks(): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.limitToLast(this.maxBooks));
  }

  homePage(start, end): Observable<any> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('stx')
      .startAt(start.toLowerCase())
      .endAt("\uf8ff" + end.toLowerCase() + "\uf8ff")
      .limitToFirst(4)).valueChanges();
  }
  
  searchEbooksByTitle(start, end): Observable<any> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('stx')
      .startAt(start.toLowerCase())
      .endAt("\uf8ff" + end.toLowerCase() + "\uf8ff")
      .limitToFirst(40)).valueChanges();
  }
  getEbookById(id: string): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('id').equalTo(id).limitToFirst(1));
  }

  getEbooksByTitle(title: string): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('title')
      .startAt(title.toLowerCase())
      .endAt(title + '\uf8ff').limitToLast(40));
  }
  listEbooksByTopic(topic:string):Observable<any>{
    return this.db.list(
      this.dbPath,ref=>ref.orderByChild('topic').startAt(topic)
      .endAt( topic + '\uf8ff').limitToLast(40)
    ).valueChanges();
  }
// deprecated
  getEbooksByTopic(topic: string): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('topic')
      .startAt(topic)
      .endAt('\uf8ff' + topic + '\uf8ff').limitToLast(40));
  }
  getEbookByTopic(topic: string): AngularFireList<Book> {
    //console.log(topic)
    if (topic == undefined) {
      topic = '';
    }
    return this.db.list(this.dbPath, ref => ref.orderByChild('topic').equalTo(topic).limitToFirst(2));
  }
  listRelatedBooks(): AngularFireList<Book> {
    return this.db.list(this.dbPath, ref => ref.limitToLast(2));
  }
  deleteAll(): void {
    this.booksRef.remove().catch(error => this.handleError(error));
  }
  getBasePath() {
    return environment.externalPath;
  }
  private handleError(error) {
    console.log(error);
  }

  getImage(imageUrl: string): Observable<any> {
    return this.http.get(imageUrl, {
      responseType: ResponseContentType.Blob
       });
  }
  // authenticate 
  // loginWithEmail(email: string, password: string) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       this.authState = user
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       throw error
  //     });
  // }

  // //logout
  // logOut(){
  //   this.afAuth.auth.signOut();
  // }

  toCamelCase(input: string) {
    return input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
  }
}
