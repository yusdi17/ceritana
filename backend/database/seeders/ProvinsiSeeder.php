<?php

namespace Database\Seeders;

use App\Models\Provinsi;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProvinsiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            ['name'=>'Aceh','code'=>'ACE'],
            ['name'=>'Sumatera Utara','code'=>'SUMUT'],
            ['name'=>'Sumatera Barat','code'=>'SUMBAR'],
            ['name'=>'Riau','code'=>'RIAU'],
            ['name'=>'Kepulauan Riau','code'=>'KEPRI'],
            ['name'=>'Jambi','code'=>'JAMBI'],
            ['name'=>'Sumatera Selatan','code'=>'SUMSEL'],
            ['name'=>'Bangka Belitung','code'=>'BABEL'],
            ['name'=>'Bengkulu','code'=>'BKL'],
            ['name'=>'Lampung','code'=>'LPG'],
            ['name'=>'DKI Jakarta','code'=>'DKI'],
            ['name'=>'Jawa Barat','code'=>'JABAR'],
            ['name'=>'Jawa Tengah','code'=>'JATENG'],
            ['name'=>'DI Yogyakarta','code'=>'DIY'],
            ['name'=>'Jawa Timur','code'=>'JATIM'],
            ['name'=>'Banten','code'=>'BTN'],
            ['name'=>'Bali','code'=>'BALI'],
            ['name'=>'Nusa Tenggara Barat','code'=>'NTB'],
            ['name'=>'Nusa Tenggara Timur','code'=>'NTT'],
            ['name'=>'Kalimantan Barat','code'=>'KALBAR'],
            ['name'=>'Kalimantan Tengah','code'=>'KALTENG'],
            ['name'=>'Kalimantan Selatan','code'=>'KALSEL'],
            ['name'=>'Kalimantan Timur','code'=>'KALTIM'],
            ['name'=>'Kalimantan Utara','code'=>'KALTARA'],
            ['name'=>'Sulawesi Utara','code'=>'SULUT'],
            ['name'=>'Sulawesi Tengah','code'=>'SULTENG'],
            ['name'=>'Sulawesi Selatan','code'=>'SULSEL'],
            ['name'=>'Sulawesi Tenggara','code'=>'SULTRA'],
            ['name'=>'Gorontalo','code'=>'GOR'],
            ['name'=>'Sulawesi Barat','code'=>'SULBAR'],
            ['name'=>'Maluku','code'=>'MAL'],
            ['name'=>'Maluku Utara','code'=>'MALUT'],
            ['name'=>'Papua Barat','code'=>'PABAR'],
            ['name'=>'Papua','code'=>'PAPUA'],
            ['name'=>'Papua Pegunungan','code'=>'PAPUA-PG'],
            ['name'=>'Papua Tengah','code'=>'PAPUA-TG'],
            ['name'=>'Papua Selatan','code'=>'PAPUA-SL'],
        ];

        foreach ($items as $item) {
            Provinsi::create($item);
        }
    }
}
