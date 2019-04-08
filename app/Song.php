<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = ['name', 'album_id', 'track_number', 'artist', 'lyrics'];

    public function lyrics()
    {
      return $this->hasMany(Lyric::class);
    }
}
