import { Component, OnInit } from '@angular/core';
import { SeoService } from '../shared/seo.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data: any = {
    'title': 'Contact - EbooksDen',
    'description': 'Contact us for any queires to ebooksden.com. We are listening to help our readers.',
    'type': 'website',
    'locale': 'en_US',
    'url': environment.site_url,
    'site_name': environment.site_name
  }
  constructor(private seo: SeoService, public router: Router) { }

  ngOnInit() {
    this.data['image'] = './assets/images/logo.png';
    this.router.events
    .subscribe((event) => {
      this.seo.updatePageMeta(this.data);
      console.log(event);
    });
    this.seo.updatePageMeta(this.data);
  }

}
