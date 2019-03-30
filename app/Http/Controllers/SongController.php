<?php

namespace App\Http\Controllers;

use App\Song;
use App\Lyric;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use function GuzzleHttp\json_encode;

class SongController extends Controller
{
    public function index()
      {
        $song = Song::all();
        return $song->toJson();
      }

      public function store(Request $request)
      {
        $validatedData = $request->validate([
          'name' => 'required',
          'artist' => 'required',
          'lyrics' => 'required',
        ]);

        $song_data = [];

        $song = song::create([
          'name' => $validatedData['name'],
          'artist' => $validatedData['artist'],
          'lyrics' => $validatedData['lyrics'],
        ]);

        $song_data['song'] = $song;
        $song_data['lyrics'] = [];

        $lyrics_array = preg_split('/\r\n|\r|\n/', $validatedData['lyrics']);

        $giphy_key = env("GIPHY_API_KEY", "");

        foreach ($lyrics_array as $key => $lyric) {

          $search_term = $lyric;
  
          $url = "http://api.giphy.com/v1/gifs/search?q=" . $search_term . "&api_key=" . $giphy_key . "&limit=5";
    
          $client = new Client();
          $body = $client->get($url)->getBody();
          $obj = json_decode($body);
          $image_url = $obj->data[0]->images->downsized_large->url ? $obj->data[0]->images->downsized_large->url : '';

          $new_lyric = Lyric::create([
            'lyric_text' => $lyric,
            'song_id' => '12',
            'image_url' => $image_url
          ]);

            $song_data['lyrics'][] = $new_lyric;

        }

        $song_data_formatted = json_decode(json_encode($song_data));

        return json("Song Created");
      }

      public function show($id)
      {
        $song = Song::with(['lyrics'])->find($id);
 
        return $song->toJson();
      }

}
