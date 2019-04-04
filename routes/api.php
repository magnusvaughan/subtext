<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// routes/api.php

Route::get('stories', 'StoryController@index');
Route::post('stories', 'StoryController@store');
Route::get('stories/{id}', 'StoryController@show');
Route::post('turns', 'TurnController@store');

Route::get('songs', 'SongController@index');
Route::post('songs', 'SongController@store');
Route::get('songs/{id}', 'SongController@show');
Route::post('lyrics', 'LyricController@store');

Route::post('artist', 'SongController@search');
