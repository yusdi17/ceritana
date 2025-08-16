<?php

namespace App\Models;

use App\Models\Cerita;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StoryMedia extends Model
{
    use HasFactory;

    protected $table = 'story_media';

    protected $fillable = [
        'cerita_id','type','url','caption','duration_seconds','sort_order'
    ];

    public function cerita() {
        return $this->belongsTo(Cerita::class);
    }

    // Scope default urut
    public function scopeOrdered($q) {
        return $q->orderBy('sort_order')->orderBy('id');
    }
}
