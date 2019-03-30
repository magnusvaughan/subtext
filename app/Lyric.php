<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lyric extends Model
{
    protected $fillable = ['lyric_text', 'song_id', 'image_url'];
}
