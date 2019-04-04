<?php

namespace App\Http\Controllers;

use App\Song;
use App\Lyric;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Goutte\Client as GoutteClient;

class SongController extends Controller
{
    public function index()
      {        
        $song = Song::all();
        return $song;
      }

      public function search(Request $request) {

        $validatedData = $request->validate([
          'artist' => 'required'
        ]);

        $artist_array = explode(" ", $validatedData['artist']);
        $artist_string = join("+", $artist_array);

        $request_url = "https://www.lyrics.com/artist/" .  $artist_string;

        $client = new GoutteClient();
        $artist_crawler = $client->request('GET', $request_url);
        $data = $artist_crawler->filter('td.tal.qx strong a')->each(function ($node){
          $href  = "https://www.lyrics.com" . $node->attr('href');
          $text  = $node->text();
      
          return compact('href', 'text');
        });

        return $data;

        // $song_crawler = $client->request('GET',"https://www.lyrics.com/lyric/1587445/Radiohead/Black+Star");
        // $data = $song_crawler->filter('#lyric-body-text')->text();

        // GET ALBUM TRACKLIST FROM **** API

        //Call STANDS 4 API for SONG

        //Stands4 API Data
        // $stands4_uid = env("STANDS4_UID", "");
        // $stands4_token_id = env("STANDS4_TOKEN_ID", "");

        // $url = "https://www.abbreviations.com/services/v2/lyrics.php?uid=" . 
        // $stands4_uid . 
        // "&tokenid=" . 
        // $stands4_token_id . 
        // "&term=" . 
        // $album_name . 
        // "&format=json";
      }

      public function store(Request $request)
      {
        $validatedData = $request->validate([
          'name' => 'required',
          'artist' => 'required',
          'lyrics' => 'required',
        ]);


        $song = song::create([
          'name' => $validatedData['name'],
          'artist' => $validatedData['artist'],
          'lyrics' => $validatedData['lyrics'],
        ]);

        $lyrics_array = preg_split('/\r\n|\r|\n/', $validatedData['lyrics']);

        $giphy_key = env("GIPHY_API_KEY", "");

        foreach ($lyrics_array as $key => $lyric) {

          $search_term = $lyric;
  
          $url = "http://api.giphy.com/v1/gifs/search?q=" . $search_term . "&api_key=" . $giphy_key . "&limit=1";
    
          $client = new Client();
          $body = $client->get($url)->getBody();
          $obj = json_decode($body);
          $image_url = $obj->data[0]->images->downsized_large->url ? $obj->data[0]->images->downsized_large->url : '';

          $new_lyric = Lyric::create([
            'lyric_text' => $lyric,
            'song_id' => $song->id,
            'image_url' => $image_url
          ]);

        }

        return $song->toJson();
      }

      public function show($id)
      {
        $song = Song::with(['lyrics'])->find($id);
 
        return $song->toJson();
      }

}
