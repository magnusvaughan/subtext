<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    protected $fillable = ['name', 'description'];

    public function turns()
    {
      return $this->hasMany(Turn::class);
    }
}
