import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../artist.model';
import { Geo } from '../geo.model';
import { Track } from '../track.model';
import { Album } from '../album.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY_LASTFM = 'd6ef3e68741318c9c4e196ebdce2350e';


  constructor(private http: HttpClient) { }

  getTopCountry_spain(geoName: string, queryType:string){
    return this.http.get<Geo[]>(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&limit=10&api_key=d6ef3e68741318c9c4e196ebdce2350e&format=json`);
  }

  getTopCountry_germany(geoName: string, queryType:string){
    return this.http.get<Geo[]>(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=germany&api_key=d6ef3e68741318c9c4e196ebdce2350e&format=json`);
  }

  getTopCountry_italy(artistName: string, queryType:string){
    return this.http.get<Geo[]>(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=italy&api_key=d6ef3e68741318c9c4e196ebdce2350e&format=json`);
  }


  artist_detail(artistName: string, queryType: string) {
    return this.http.get<Artist[]>(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Nirvana&api_key=d6ef3e68741318c9c4e196ebdce2350e&format=json`);
  }


  artist_track(artistName: string, queryType: string){
    return this.http.get<Track[]>(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=Nirvana&api_key=d6ef3e68741318c9c4e196ebdce2350e&format=json`);

  }

  artist_album(artistName: string, queryType: string){
    return this.http.get<Album[]>(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Nirvana&api_key=d6ef3e68741318c9c4e196ebdce2350e&format=json`);
  }

}
