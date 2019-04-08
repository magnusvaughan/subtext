<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = ['album_name', 'artist_name', 'year'];

    public function songs()
    {
      return $this->hasMany(Song::class);
    }
}
