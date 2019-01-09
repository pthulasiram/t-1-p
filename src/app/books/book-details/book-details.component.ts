import { Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { environment } from '../../../environments/environment'
import { Meta ,Title, DomSanitizer} from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SeoService } from '../../shared/seo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../shared/book';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BookService } from '../../shared/book.service';
import { database } from 'firebase';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  data: any = {
    'title': '  ',
    'description': '  ',
    'type': 'article',
    'locale': 'en_US',
    'url': '   ',
    'site_name': environment.site_name,
    'author': '@DenEbooks',
    'year': '  ' ,
    'edition': '    ',
    'publisher': '@DenEbooks',
    'pages': '   ',
    'language':'    ',
    'topic': '   ',
    'published_time':'   ',
    'section':'   ',
    'tags':[],
    'image':'   '

  }
  cors_api:string = environment.cors_api;
  book$: Observable<any>;
  spinner: boolean = true;
  showNoBooks: boolean = false;
  book: Book[] = null;
  rbooks: Book[] = null;
  showRbooks: boolean = false;
  baseURL: string = "";
  downloadPath: string = "";
  imageBaseURL: string = "";
  imageToShow: any;
  imageData: any;
  imageR1Data: any;
  imageR2Data: any;
  isImageLoading: boolean;
  pageTitle:string;

  constructor(@Inject(PLATFORM_ID) private platform: Object, private router: Router, 
  private dom: DomSanitizer,public activeRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta, public bookService: BookService, public seoService: SeoService) {
    this.baseURL = bookService.getBasePath();
    this.imageBaseURL = environment.site_config.imagePath;
    this.downloadPath = environment.site_config.dPath;
    
  
  }

  ngOnInit() {
    this.data['image'] = './assets/images/logo.png';
    this.book$ = this.activeRoute.snapshot.data['books_data'];
   // this.updateArticleMeta(this.data);
    if (isPlatformBrowser(this.platform)) {
      // here you can run any browser specific code, like:
     // window.alert('This will run only in the browser!');
    }
    this.data.url = environment.site_url + this.router.url;
    // const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    this.book$ = this.activeRoute.paramMap.pipe(
      switchMap(p => {
        const id = p.get("id");
        console.log(id);
        // this.getBookById(routeParams.id);
        return this.bookService.getEbookById(id).valueChanges();
      })

    );
    console.log(routeParams.id)
    this.getBookById(this.book$)

  }

  getBookById(book$: Observable<any>) {

    // book$.pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // )
     book$.subscribe(books => {
      this.book = books;
      this.spinner = false;
      if (this.book.length > 0) {
        this.showNoBooks = false;
        this.fetchImage(this.book[0].coverurl,'m')
      } else {
        this.showNoBooks = true
        this.book = [];
      }
      this.updateMetaData(this.book[0])
      this.spinner = false;
      if (this.book[0].title) {
        this.listRelatedEbooks(this.book[0].topic);
        
      } else {
        this.listRelatedEbooks('');
      }
      //this.updatePopularEbooks(this.book[0]);
    });

  }

  listRelatedEbooks(topic: string) {

    // this.bookService.getEbookByTopic(topic).snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // )
    this.bookService.getEbookByTopic(topic).valueChanges().subscribe(books => {
      this.rbooks = books;
      let size: number = this.rbooks.length;
      if (!(size == 2)) {
        this.updateRelatedEbooks();
        this.showRbooks = false;
      } else {
        this.showRbooks = true;
        this.fetchImage(this.rbooks[0].coverurl,'R1')
        this.fetchImage(this.rbooks[1].coverurl,'R2')
      }
      //this.fetchImage(this.rbooks[0].coverurl,'R1')
      //this.fetchImage(this.rbooks[1].coverurl,'R2')
      //debugger;
    });
  }
  updateRelatedEbooks() {
    // this.bookService.listRelatedBooks().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // )
    this.bookService.listRelatedBooks().valueChanges().subscribe(books => {
      this.showRbooks = true;
      this.rbooks = books;
      this.fetchImage(this.rbooks[0].coverurl,'R1')
      this.fetchImage(this.rbooks[1].coverurl,'R2')
      //debugger
    });
  }
  OnChagneEbook(index: number) {
    this.book[0] = this.rbooks[index];
    this.activeRoute.snapshot.params.id = this.book[0].id;
  }

  updateMetaData(book: Book) {
    let titles:string[] = book.title.split(":");
    let tempTitle = book.title;
    //let pageTitle= '';
    if(titles.length > 0){
      tempTitle = titles[0]
    }
    if (book.edition !=null &&  book.edition !=undefined && Number(book.edition)) {

      let edition: string = ''
      let ed: Number = Number(book.edition?book.edition:0);
      
      if ((ed > 1) && (ed < 10)) {
        edition = ed + ' nd Edition'
      } else if (ed > 9) {
        edition = ed + ' th Edition'
      } else {
        edition = ed + ' st Edition'
      }
      this.data.title = tempTitle + ' ' + edition + ' - Ebook Free Download';
      this.pageTitle = book.title + ' ' + edition + ' - Ebook Free Download';
    } else {
      this.data.title = "[" + book.extension.toUpperCase() + '] ' + tempTitle + ' - Ebook Free Download';
      this.pageTitle = "[" + book.extension.toUpperCase() + '] ' + book.title + ' - Ebook Free Download';
    }
    if(book.edition !=null &&  book.edition !=undefined && Number(book.edition)){
      this.data.title = tempTitle + ' ' + book.edition + ' - Ebook Free Download';
      this.pageTitle = book.title + ' ' + book.edition + ' - Ebook Free Download';
    }

    this.data.description ="You will learn about "+ book.title + ' by ' + book.author+'. Ebook Free Download';
    this.data.publisher = book.publisher;
    let tags: string[] = [];
    tags.push(book.title);
    tags.push(book.author);
    tags.push(book.publisher);
    tags.push(book.year);
    tags.push(book.extension);
    if( book.googlebookid && book.googlebookid!='' ){
      tags.push(book.googlebookid);
    }
    if( book.openlibraryid && book.openlibraryid!='' ){
      tags.push(book.openlibraryid);
    }
    if (book.topic) {
      let topics: string[] = book.topic.split('\\');
      topics.forEach(x => {
        tags.push(x)
      })
      this.data.section = book.topic.replace('\\\\', "");
    }
    tags.push('Free Ebook Download')
    //tags.push(topics.toString())
    //topics;
    this.data.tags = tags;
    this.data.published_time = formatDate(new Date(book.year?book.year:new Date().getFullYear+""), 'yyyy-MM-ddTHH:mm:ssZ', 'en');;
    this.data.image = this.imageBaseURL + book.coverurl;
    // console.log(this.data.toString())
    this.book[0].title = this.pageTitle;
    this.seoService.updateArticleMeta(this.data);
   

  }

  fetchImage(path: string, pos:string) : any {
   // debugger;
   if(path == null){
      return
   }
   path = this.cors_api+environment.site_config.imagePath+path
    this.bookService.getImage(path).toPromise()
      .then((res: any) => {
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });
        let urlCreator = window.URL;
         let imageData = this.dom.bypassSecurityTrustUrl(
            urlCreator.createObjectURL(blob));
          if(pos == 'R1'){
            this.imageR1Data=imageData
          }else if(pos == 'R2'){
            this.imageR2Data=imageData
          }else{
            this.imageData = imageData

          }
      });
  }
}
