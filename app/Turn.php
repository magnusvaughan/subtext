<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Turn extends Model
{
    protected $fillable = ['turn_text', 'story_id', 'image_url'];
}
