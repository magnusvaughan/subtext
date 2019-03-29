<?php

namespace App\Http\Controllers;

use App\Story;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index()
      {
        $story = Story::all();
        return $story->toJson();
      }

      public function store(Request $request)
      {
        $validatedData = $request->validate([
          'name' => 'required',
          'description' => 'required',
        ]);

        $story = Story::create([
          'name' => $validatedData['name'],
          'description' => $validatedData['description'],
        ]);

        return response()->json('Project created!');
      }

      public function show($id)
      {
        $story = Story::with(['turns'])->find($id);

        return $story->toJson();
      }

}
