<?php

namespace App\Models;

use App\Models\User;
use App\Models\Provinsi;
use App\Models\StoryMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cerita extends Model
{
    use HasFactory;

    protected $table = 'cerita';

    protected $fillable = [
        'provinsi_id',
        'user_id',
        'judul',
        'slug',
        'thumbnail',
        'cerita',
        'is_published',
        'published_at'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function provinsi()
    {
        return $this->belongsTo(Provinsi::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublic($q)
    {
        return $q->where('is_published', true)
            ->where('status', 'approved')
            ->whereNotNull('published_at');
    }

    public function scopeFilter($q, array $f)
    {
        if (!empty($f['search'])) {
            $s = $f['search'];
            $q->where(function ($w) use ($s) {
                $w->where('judul', 'like', "%{$s}%")
                    ->orWhere('summary', 'like', "%{$s}%")
                    ->orWhere('cerita', 'like', "%{$s}%");
            });
        }
        if (!empty($f['provinsi_id'])) $q->where('provinsi_id', $f['provinsi_id']);
        if (!empty($f['user_id']))     $q->where('user_id', $f['user_id']);
        if (isset($f['is_published'])) $q->where('is_published', (bool)$f['is_published']);

        return $q;
    }

    public function media()
    {
        return $this->hasMany(StoryMedia::class, 'cerita_id')->ordered();
    }

    protected $appends = ['thumbnail_url'];

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }
}
