import { Component, PLATFORM_ID, OnInit, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LinkService } from './shared/link.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ebooksden';
  subscription: Subscription
 
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private readonly linkService:LinkService) {
      
      linkService.startRouteListener();
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe(() => {
        //setInterval(() => {
        window.scrollTo(0, 0)
        //}, 16)
      }
      )
    }
  }
  ngOnDestroy() {
    if ( isPlatformBrowser(this.platformId)){
      this.subscription.unsubscribe();
    }
  }

  initializeNav(){
     // Main Navigation
     $( '.hamburger-menu' ).on( 'click', function() {
      $(this).toggleClass('open');
      $('.site-navigation').toggleClass('show');
  });

  // Testimonial Slider
  var swiper = new Swiper('.testimonial-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      effect: 'fade',
      speed: 800,
      pagination: '.swiper-pagination',
      paginationClickable: true
  });

  $('.gallery-wrap').masonry({
      itemSelector: '.gallery-grid'
  });

  // Accordion & Toggle
  $('.accordion-wrap.type-accordion').collapsible({
      accordion: true,
      contentOpen: 0,
      arrowRclass: 'arrow-r',
      arrowDclass: 'arrow-d'
  });

  $('.accordion-wrap .entry-title').on('click', function() {
      $('.accordion-wrap .entry-title').removeClass('active');
      $(this).addClass('active');
  });

  }
}
