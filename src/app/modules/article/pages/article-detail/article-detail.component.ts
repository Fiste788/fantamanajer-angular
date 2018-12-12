import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from '@app/core/models';
import { ApplicationService, ArticleService } from '@app/core/services';

@Component({
  selector: 'fm-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  @ViewChild(NgForm) articleForm: NgForm;

  constructor(
    public snackBar: MatSnackBar,
    private app: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      const id = parseInt(this.route.snapshot.params['id'], 10);
      this.articleService
        .getArticle(id)
        .subscribe(article => (this.article = article));
    } else {
      this.article = new Article();
      this.article.team_id = this.app.team.id;
    }
  }

  cancel() { }

  save() {
    if (this.articleForm.valid) {
      let observable = null;
      if (this.article.id) {
        observable = this.articleService.update(this.article);
      } else {
        observable = this.articleService.create(this.article);
      }
      observable.subscribe(article => {
        this.snackBar.open('Articolo salvato correttamente', null, {
          duration: 3000
        });
        this.router.navigateByUrl(
          '/teams/' + this.article.team_id + '/articles#' + article.id
        );
      });
    }
  }
}