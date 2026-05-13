import { Component, inject, signal, OnInit } from '@angular/core';
import { Repository } from '../models/repository';
import { GithubreposService } from '../services/githubrepos';
import { CommonModule} from '@angular/common'; 

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  repositories = signal<Repository[]>([]);
  error = signal<string | null>(null);
  
  githubReposService = inject(GithubreposService);
  ngOnInit() {
  this.loadRepositories();
  }


  async loadRepositories() {
    try {
const response = await this.githubReposService.getCourses();
this.repositories.set(response);
console.table(this.repositories());
    } catch(error) {
      console.error(error);
      this.error.set("Kunde inte ladda data, försök igen senare");
    }
  }
  //Metod för att sortera data
sortData(key: keyof Repository) {  //För varje key i mitt interface:
  const sorted = [...this.repositories()].sort((a, b) => //Skapar en kopia av listan för att kunna sortera utan att störa originalet och sorterar sedan från a-b
  {
    return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1; //Jämför värdet a och b om A är före B flytta ner, annars flytta upp
  });
  this.repositories.set(sorted); //Uppdaterar signalen så att ändringen syns på skärmen
}
}


