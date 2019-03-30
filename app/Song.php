<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = ['name', 'artist', 'lyrics'];

    public function lyrics()
    {
      return $this->hasMany(Lyric::class);
    }
}
