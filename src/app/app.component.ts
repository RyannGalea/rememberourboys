import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import { thoughts } from './core/thoughts';
import Thoughts from './core/processedThoughts';
import * as _ from 'lodash';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('search') search: ElementRef;

  public loadedThoughts;
  public searchWord = '';
  public loadAmount = 100;
  public thoughts   = Thoughts;
  public searchSet  = this.thoughts;

  constructor() {
    this.loadedThoughts = this.loadThoughts();
  }

  loadMore() {
    this.loadedThoughts = this.loadThoughts(this.loadedThoughts.length);
  }

  loadThoughts(currLength?) {
    if (currLength) { return this.searchSet.slice(0, currLength + this.loadAmount); }
    return this.searchSet.slice(0, this.loadAmount);
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(500))
      .subscribe(res => this.filter(res['target'].value.trim().toLowerCase()));
  }

  filter(val) {

    if (val.length === 0) {
      this.searchSet = this.thoughts;
      this.loadedThoughts = this.loadThoughts();
      return;
    }

    val = val.toLowerCase();
    this.searchSet = this.thoughts.filter(res => {
      const author  = res.author && res.author.toLowerCase() || '';
      const comment = res.comment && res.comment.toLowerCase() || '';
      return author.search(val) > -1 || comment.search(val) > -1;
    }).map(res => ({
      author: _.replace(res.author && res.author.toLowerCase() || '', new RegExp(val, 'g'), `<span>${val}</span>`),
      comment: this.cap(_.replace(res.comment && res.comment.toLowerCase(), new RegExp(val, 'g'), `<span>${val}</span>`))
    }));
    this.loadedThoughts = this.loadThoughts();

  }

  // constructor() {

  //   const arr = thoughts.split('<b>');
  //   const withAuthor = arr.map(res => {
  //     const data = res.split('</b><br>');
  //     data[1] = data[1] ? data[1].trim().replace(/<br>/, '').replace(/<hr>/, '').replace(/"/, '') : '';
  //     return {
  //       author: data[0].trim() ? this.checkNoName(data[0]) : '',
  //       comment: data[1] ? this.cap(data[1].trim()) : 'No Comment'
  //     };
  //   }).filter(res => res[1] !== 'No Comment');

  //   const removeDups = _.uniqBy(withAuthor, (e) => {
  //     return e.comment;
  //   });

  //   const final = removeDups.filter(res => res.comment).map(res => {
  //     res.comment = res.comment.replace(/<br>/, '').replace(/<hr>/, '').trim();
  //     return res;
  //   });

  //   console.log(final);

  // }

  // checkNoName(name) {
  //   const check = name.toLowerCase().trim();
  //   return check === 'no name' ? '' : this.cap(name.trim());
  // }

  cap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
