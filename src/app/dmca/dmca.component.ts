import { Component, OnInit } from '@angular/core';
import { SeoService } from '../shared/seo.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DmcaComponent implements OnInit {
  data: any = {
    'title': 'DMCA -  DMCA Policy',
    'description': 'Ebooksden. DMCA policy to use contents in this website',
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
