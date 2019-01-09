import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})


export class SubscribeComponent implements OnInit {

  submitted = false;
  //https://ebooksden.us7.list-manage.com/subscribe/post-json?u=8da0d202af4400557dbbd1629&amp;id=854229a002
	mailChimpEndpoint = 'https://ebooksden.us7.list-manage.com/subscribe/post-json?u=8da0d202af4400557dbbd1629&amp;id=854229a002&';
  error = '';
  success='';
  subscribeForm:FormGroup
	constructor(private http: HttpClient,private formBuilder: FormBuilder) { 
    this.subscribeForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ])
    });
    // // reactive form components
    // emailControl = new FormControl('', [
    //   Validators.required,
    //   Validators.email,
    // ]);
  }
 
	// nameControl = new FormControl('', [
	// 	Validators.required
	// ]);

	submit() {
    this.error = '';
		if (this.subscribeForm.valid ) {

			const params = new HttpParams()
				//.set('NAME', this.nameControl.value)
				.set('EMAIL', this.subscribeForm.controls.email.value)
				.set('b_123abc123abc123abc123abc123abc123abc', ''); // hidden input name

			const mailChimpUrl = this.mailChimpEndpoint + params.toString();

      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
			this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
				if (response.result && response.result !== 'error') {
          this.submitted = true;
          this.success="Thank You for your intrest ...";
          setTimeout( () => {
            this.success=''
          },1000)
         // console.log(this.success)
				}
				else {
          this.error = response.msg;
          setTimeout( () => {
            this.error=''
          },1000)
         // console.log(this.error)
				}
			}, error => {
				console.error(error);
        this.error = 'Sorry, an error occurred.';
        setTimeout( () => {
          this.error=''
        },1000)
      });
      this.subscribeForm.controls.email.setValue('');
		}
	}

  ngOnInit() {
  }

}
