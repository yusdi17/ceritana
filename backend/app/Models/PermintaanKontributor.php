<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PermintaanKontributor extends Model
{
    use HasFactory;

    protected $table = 'permintaan_kontributor';

    protected $fillable = ['user_id','alasan','status','notes'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
