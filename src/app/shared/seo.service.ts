import { Injectable, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { debug } from 'util';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  remove_meta_article: string[] = [
    'description',
    'og:locale',
    'og:type',
    'og:title',
    'og:description',
    'og:url',
    'og:site_name',
    'article:publisher',
    'article:section',
    'article:published_time',
    'og:image',
    'og:image:width',
    'og:image:height',
    'og:image:alt',
    'twitter:card',
    'twitter:description',
    'twitter:url',
    'twitter:title',
    'twitter:image',
    'twitter:site',
    'twitter:creator',
    'article:tag'


  ];

  constructor(private title: Title,
    private meta: Meta,  @Inject(PLATFORM_ID) private platformId: Object) { }

  updatePageMeta(data: any) {
    //console.log(data);
    //debugger
    this.removeMetaTags();
    this.title.setTitle(data.title);

    //this.meta.removeTag('name = "description"');
    this.meta.updateTag({
      name: 'description', content: data.description,
    });
    this.meta.updateTag({
      property: 'og:locale', content: data.locale,
    });
    this.meta.updateTag({
      property: 'og:type', content: data.type,
    });
    this.meta.updateTag({
      property: 'og:title', content: this.toCamelCase(data.title),
    });
    this.meta.updateTag({
      property: 'og:url', content: data.url,
    });

    this.meta.updateTag({
      property: 'og:site_name', content: data.site_name,
    });


    // image
    this.meta.updateTag({
      property: 'og:image', content: data.image,
    });
    this.meta.updateTag({
      property: 'og:image:width', content: '381',
    });
    this.meta.updateTag({
      property: 'og:image:height', content: '499',
    });
    this.meta.updateTag({
      property: 'og:image:alt', content: this.toCamelCase(data.title),
    });


    //twitter card

    //     <meta name="twitter:card" content="summary">
    // <meta name="twitter:url" content="https://davidwalsh.name/twitter-cards">
    // <meta name="twitter:title" content="How to Create a Twitter Card">
    // <meta name="twitter:description" content="Twitter's new Twitter Cards API allows developers to add META tags to their website, and Twitter will build card content from links to a given site.">
    // <meta name="twitter:image" content="https://davidwalsh.name/wp-content/themes/punky/images/logo.png">

    this.meta.updateTag({
      property: 'twitter:card', content: 'summary',
    });
    this.meta.updateTag({
      property: 'twitter:url', content: data.url,
    });
    this.meta.updateTag({
      property: 'twitter:site', content: '@DenEbooks',
    });
    this.meta.updateTag({
      property: 'twitter:creator', content: '@DenEbooks',
    });
    this.meta.updateTag({
      property: 'twitter:description', content: data.description,
    });
    this.meta.updateTag({
      property: 'twitter:title', content: this.toCamelCase(data.title),
    });

    this.meta.updateTag({
      property: 'twitter:image', content: data.image,
    });
  }
  // update article page
  updateArticleMeta(data: any) {
    //debugger
    this.removeMetaTags();
    this.title.setTitle(data.title);
   // this.meta.removeTag('name = "description"');
    this.meta.updateTag({
      name: 'description', content: data.description,
    });
    this.meta.updateTag({
      property: 'og:locale', content: data.locale,
    });
    this.meta.updateTag({
      property: 'og:type', content: data.type,
    });
    this.meta.updateTag({
      property: 'og:title', content: this.toCamelCase(data.title),
    });
    this.meta.updateTag({
      property: 'og:description', content: this.toCamelCase(data.title),
    });
    this.meta.updateTag({
      property: 'og:url', content: data.url,
    });

    this.meta.updateTag({
      property: 'og:site_name', content: data.site_name,
    });

    this.meta.updateTag({
      property: 'article:publisher', content: data.publisher,
    });

    //this.meta.removeTag('article:tag');

    data.tags.forEach(element => {
      if (element != undefined && element != "") {
        this.meta.addTag({
          property: 'article:tag', content: element,
        });
      }
    });
    this.meta.updateTag({
      property: 'article:section', content: data.section,
    });
    this.meta.updateTag({
      property: 'article:published_time', content: data.published_time,
    });
    // image
    this.meta.updateTag({
      property: 'og:image', content: data.image,
    });
    this.meta.updateTag({
      property: 'og:image:width', content: '381',
    });
    this.meta.updateTag({
      property: 'og:image:height', content: '499',
    });
    this.meta.updateTag({
      property: 'og:image:alt', content: this.toCamelCase(data.title),
    });

    // twitter cards


    this.meta.updateTag({
      property: 'twitter:card', content: 'summary',
    });
    this.meta.updateTag({
      property: 'twitter:description', content: data.description,
    });
    this.meta.updateTag({
      property: 'twitter:url', content: data.url,
    });
    this.meta.updateTag({
      property: 'twitter:title', content: this.toCamelCase(data.title),
    });
    this.meta.updateTag({
      property: 'twitter:image', content: data.image,
    });
    this.meta.updateTag({
      property: 'twitter:site', content: '@DenEbooks',
    });
    this.meta.updateTag({
      property: 'twitter:creator', content: '@DenEbooks',
    });
    //debugger;
  }

  removeMetaTags() {
    this.remove_meta_article.forEach(x => {
      if (this.meta.getTag('property = "' + x + '"')) {
   //     console.log('meta tags ' + x)
        this.meta.removeTag('property = "' + x + '"');
      } else if (x == "article:tag") {
        if (this.meta.getTags('property = "' + x + '"')) {
          this.meta.getTags('property = "' + x + '"').forEach(x =>{
            this.meta.removeTagElement(x)
          //  console.log('  elemenrt dsfasdgdgasdgd '+x)
          }
          )

        }
      }
    });

    // this.remove_meta_site.forEach(x =>{
    //   this.meta.removeTag('name ='+x); 
    // });
  } 
  //utility to move top
  scrollTop(){
    if (isPlatformBrowser(this.platformId)) {
     // setInterval(() => {
        window.scrollTo(0, 0)
     // }, 16)
    }
  }
  toCamelCase(input: string) {
    return input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
  }
}
