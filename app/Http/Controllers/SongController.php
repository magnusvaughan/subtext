<?php

namespace App\Http\Controllers;

use App\Album;
use App\Song;
use App\Lyric;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use function GuzzleHttp\json_encode;

class SongController extends Controller
{
    public function index()
      {        
        $song = Song::all();
        return $song;
      }

      public function store(Request $request)
      {
        $validatedData = $request->validate([
          'name' => 'required',
          'track_number' => 'required',
          'artist' => 'required',
          'album' => 'required',
          'year' => 'required',
          'lyrics' => 'required',
        ]);
      
        $album = Album::where('album_name', $validatedData['album'])->first();
        if ($album === null) {
          $album = album::create([
            'album_name' => $validatedData['album'],
            'artist_name' => $validatedData['artist'],
            'year' => $validatedData['year'],
          ]);
        }

        Log::info((string) $album);

        $song = song::create([
          'name' => $validatedData['name'],
          'track_number' => $validatedData['track_number'],
          'album_id' => $album->id,
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
