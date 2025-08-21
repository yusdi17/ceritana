<?php

namespace App\Models;

use App\Models\Cerita;
use App\Models\KalenderBudaya;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Provinsi extends Model
{
    use HasFactory;

    protected $table = 'provinsi';

    protected $fillable = ['name','code','lat','lng'];

    protected $casts = [
        'lat' => 'decimal:6',
        'lng' => 'decimal:6',
    ];

    public function cerita()
    {
        return $this->hasMany(Cerita::class, 'provinsi_id');
    }

    public function kalenderBudaya()
    {
        return $this->hasMany(KalenderBudaya::class, 'provinsi_id');
    }
}
