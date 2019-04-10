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

Route::post('songs', 'SongController@store');
Route::get('songs/{id}', 'SongController@show');
Route::post('lyrics', 'LyricController@store');

Route::get('albums', 'AlbumController@index');
Route::get('albums/{id}', 'AlbumController@show');
