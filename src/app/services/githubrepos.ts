import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Repository } from '../models/repository';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubreposService {
  private url: string = "https://webbutveckling.miun.se/files/ramschema.json";

  http = inject(HttpClient);
// Ladda repos
async getCourses(): Promise<Repository[]> {
const courses = this.http.get<Repository[]>(this.url);
return await firstValueFrom(courses);
}
  }

