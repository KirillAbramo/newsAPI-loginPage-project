import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  data: any;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService
      .getData('v2/top-headlines?country=us&category=business')
      .subscribe(data => {
        console.log(data);
        this.data = data;

      })

  }

}
