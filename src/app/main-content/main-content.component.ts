import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Artist } from '../artist.model';
import { Geo } from '../geo.model';
import { Track } from '../track.model';
import { Album } from '../album.model';



@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})

export class MainContentComponent implements OnInit {
  formular: FormGroup;
  searchStr: string = '';
  searchResult: boolean = true;
 
  artist: Artist = {
    name: '',
    image: '',
    listeners: 0,
    playcount: 0,
    summary: '',
    url: ''
  };

  geo: Geo = {
    artist: '',
    name: '',
    country: '',
  };

 

  tracks: Track[] = [
    { name: '',  rank: 1, listeners: 0 },
    { name: '',  rank: 2, listeners: 0 },
    { name: '',  rank: 3, listeners: 0 },
    { name: '',  rank: 4, listeners: 0 },
    { name: '',  rank: 5, listeners: 0 },
  ];

  albums: Album[] = [
    { name: '', playcount:  0, listeners: 0 },
    { name: '', playcount:  0, listeners: 0 },    
    { name: '', playcount:  0, listeners: 0 },    
    { name: '', playcount:  0, listeners: 0 },    
  ];


  constructor(
    private fb: FormBuilder,
    public api: ApiService,
    public http: HttpClient,
  ) {
    this.formular = this.fb.group({
      artist_search: [null]
    })
  }


  ngOnInit(): void {
    this.getTopCountry_spain();
    this.searchMusicInMain(); // Funktion  ist mit drin, damit die Detailview angezeigt wird
  }

  onSubmit() {
    var formData: any = new FormData();
    formData.append("artist_search", this.formular.get('artist_search')?.value);
    this.http.post('https://ptsv2.com/t/fxky4-1630999139/post', formData).subscribe( //Testserver zum versenden des Formulars

      (response) => console.log(response),
      (error) => console.log(error)
    )

    console.log("Artist send");
    console.log(this.formular.value);
    console.log("ArtistContent: ", this.formular);
  }


  searchMusicInMain() {

    this.searchResult = true;
    this.api.artist_detail(this.searchStr, 'getinfo').subscribe((res: any) => {
      this.artist.name = res.artist.name;
      this.artist.image = res.artist.image[2]['#text'];
      this.artist.listeners = res.artist.stats.listeners;
      this.artist.playcount = res.artist.stats.playcount;
      this.artist.summary = res.artist.bio.summary;
      this.artist.url = res.artist.url;
    });

    
  }


  getTopCountry_spain() {

    this.searchResult = true;
    this.api.getTopCountry_spain(this.searchStr, 'gettopartist').subscribe((res: any) => {
     
      this.artist.name = res.artist.name;
      
    });
  }

  getTopCountry_germany() {

    this.searchResult = true;
    this.api.getTopCountry_germany(this.searchStr, 'gettopartist').subscribe((res: any) => {
      this.geo.country = res.artist.name;
      
    });
  }

  getTopCountry_italy() {

    this.searchResult = true;
    this.api.getTopCountry_italy(this.searchStr, 'gettopartist').subscribe((res: any) => {
      this.geo.artist = res.geo.artist;
      
    });
  }


  artist_track() {

    this.searchResult = true;
    this.api.artist_track(this.searchStr, 'gettoptracks').subscribe((res: any) => {
        this.tracks[0].name = res.toptracks.track[0].name;
        this.tracks[0].listeners = res.toptracks.track[0].listeners;

        this.tracks[1].name = res.toptracks.track[1].name;
        this.tracks[1].listeners = res.toptracks.track[1].listeners;

        this.tracks[2].name = res.toptracks.track[2].name;
        this.tracks[2].listeners = res.toptracks.track[2].listeners;

        this.tracks[3].name = res.toptracks.track[3].name;
        this.tracks[3].listeners = res.toptracks.track[3].listeners;

        this.tracks[4].name = res.toptracks.track[4].name;
        this.tracks[4].listeners = res.toptracks.track[4].listeners;
    });
  }

  artist_album() {

    this.searchResult = true;
    this.api.artist_album(this.searchStr, 'gettopalbums').subscribe((res: any) => {
        this.albums[0].name = res.topalbums.album[0].name;
        this.albums[0].listeners = res.topalbums.album[0].listeners;

        this.albums[1].name = res.topalbums.album[1].name;
        this.albums[1].listeners = res.topalbums.album[1].listeners;

        this.albums[2].name = res.topalbums.album[2].name;
        this.albums[2].listeners = res.topalbums.album[2].listeners;

        this.albums[3].name = res.topalbums.album[3].name;
        this.albums[3].listeners = res.topalbums.album[3].listeners;

        this.albums[4].name = res.topalbums.album[4].name;
        this.albums[4].listeners = res.topalbums.album[4].listeners;
    });
  }

}//end class


