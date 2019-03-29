<?php

namespace App\Http\Controllers;

use App\Turn;
use Illuminate\Http\Request;

class TurnController extends Controller
{
    public function store(Request $request)
    {
      $validatedData = $request->validate(['turn_text' => 'required']);

      $turn = Turn::create([
        'turn_text' => $validatedData['turn_text'],
        'story_id' => $request->story_id,
      ]);

      return $turn->toJson();
    }

}
