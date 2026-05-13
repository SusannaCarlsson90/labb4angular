import { Component, inject, signal } from '@angular/core';
import { Repository } from '../models/repository';
import { GithubreposService } from '../services/githubrepos';
import { CommonModule, DatePipe } from '@angular/common'; // Importera DatePipe

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  repositories = signal<Repository[]>([]);
  error = signal<string | null>(null);
  
  githubReposService = inject(GithubreposService);
  ngOnInit() {
  this.loadRepositories();
  }


  async loadRepositories() {
    try {
const response = await this.githubReposService.loadRepos();
this.repositories.set(response);
console.table(this.repositories());
    } catch(error) {
      console.error(error);
      this.error.set("Kunde inte ladda data, försök igen senare");
    }
  }
}
