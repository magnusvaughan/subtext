<?php

namespace App\Http\Controllers;

use App\Turn;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class TurnController extends Controller
{
    public function store(Request $request)
    {
      $validatedData = $request->validate(['turn_text' => 'required']);

      $giphy_key = env("GIPHY_API_KEY", "");
      $search_term = $validatedData['turn_text'];

      $url = "http://api.giphy.com/v1/gifs/search?q=" . $search_term . "&api_key=" . $giphy_key . "&limit=5";

      $client = new Client();
      $body = $client->get($url)->getBody();
      $obj = json_decode($body);
      $image_url = $obj->data[0]->images->downsized_large->url;
      
      $turn = Turn::create([
        'turn_text' => $validatedData['turn_text'],
        'story_id' => $request->story_id,
        'image_url' => $image_url
      ]);

      return $turn->toJson();
    }

}
