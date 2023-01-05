import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as Config } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // TODO: update service and appID once service is ready.

  //private appID = 'app:recipeExtractor';  
  private appID = 'app:albogdano';  
  //private RECIPES_SERVICE = 'Base_API_URL' + '/recipes';
  private RECIPES_SERVICE = 'https://paraio.com' + '/v1/recipes';

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Anonymous ' + this.appID
    })
  };

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<string[]>(this.RECIPES_SERVICE, this.options);
  }

  add(name: string, text: string) {
    if (!name || !text) { return of(null); }
    const recipe: any = { name, text };
    return this.http.post(this.RECIPES_SERVICE, JSON.stringify(recipe), this.options);
  }

  edit(id: string, name: string, text: string) {
    if (!id) { return of(null); }
    const recipe: any = { name, text };
    return this.http.patch(this.RECIPES_SERVICE + '/' + id, JSON.stringify(recipe), this.options);
  }

  remove(id: string) {
    if (!id) { return of(null); }
    return this.http.delete(this.RECIPES_SERVICE + '/' + id, this.options);
  }

  search(q: string) {
    return this.http.get(this.RECIPES_SERVICE + '?q=' + q, this.options);
  }
}

