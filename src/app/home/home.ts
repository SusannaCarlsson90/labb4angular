import { Component, inject, signal, OnInit, computed } from '@angular/core';
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
  searchTerm = signal<string>('')// En behållare som sparar texten användaren skriver i sökrutan

  filteredRepositories = computed(() => {
    const term = this.searchTerm().toLowerCase(); // Hämtar sökordet
    const list = this.repositories(); // Hämtar alla kurser 

    // Returnerar bara de kurser som matchar sökordet i kod eller namn
    return list.filter(repo =>
      repo.code.toLowerCase().includes(term) || 
      repo.coursename.toLowerCase().includes(term)
    );
  });
  
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
//Metod för sökning
  handleSearch(event: Event) {
    const input = event.target as HTMLInputElement; //Meddelar att det är en textruta
    this.searchTerm.set(input.value.toLowerCase()); //Sparar det som skrivs och gör om till små bokstäver
  }


// En funktion som körs när vi klickar på en rubrik för att sortera listan
sortData(key: keyof Repository) {
  const sorted = [...this.repositories()].sort((a, b) => { //Sortera i bokstavsordning
  
    return String(a[key]).localeCompare(String(b[key])); //Jämför a mot b
  });

  // Om listan redan är sorterad stigande, vänd på den så den blir fallande
  if (JSON.stringify(this.repositories()) === JSON.stringify(sorted)) {
    sorted.reverse();
  }

  this.repositories.set(sorted);
}
}


