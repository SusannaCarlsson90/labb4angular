import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Repository } from '../models/repository';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubreposService {
  private url: string = "https://api.github.com/users/SusannaCarlsson90/repos";

  http = inject(HttpClient);
// Ladda repos
async loadRepos(): Promise<Repository[]> {
const repositories = this.http.get<Repository[]>(this.url);
return await firstValueFrom(repositories);
}
  }

