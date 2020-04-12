import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ArticleService } from '@app/http';
import { ApplicationService } from '@app/services';
import { Article } from '@shared/models';

@Component({
  selector: 'fm-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  @ViewChild(NgForm) articleForm: NgForm;

  article$: Observable<Article>;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly app: ApplicationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly articleService: ArticleService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.article$ = this.route.snapshot.params.id ? this.load(+id) : this.new();
  }

  load(id: number): Observable<Article> {
    return this.articleService.getArticle(id);
  }

  new(): Observable<Article> {
    const article = new Article();
    article.team_id = this.app.team?.id ?? 0;

    return of(article);
  }

  save(article: Article): void {
    if (this.articleForm.valid === true) {
      const observable = article.id ? this.articleService.update(article) : this.articleService.create(article);
      observable.subscribe(() => {
        this.snackBar.open('Articolo salvato correttamente', undefined, {
          duration: 3000
        });
        void this.router.navigateByUrl(`/teams/${article.team_id}/articles#${article.id}`);
      });
    }
  }
}
