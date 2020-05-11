<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    //
    public function klasses()
    {
        return $this->hasMany('App\Klass');
    }

    public function news()
    {
        return $this->hasMany('App\CompetitionNews');
    }

    public function locationItems()
    {
        return $this->hasMany('App\LocationItem');
    }

    public function students()
    {
        return $this->hasMany('App\Student');
    }
}