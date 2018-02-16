<?php

namespace App\Http\Controllers;

class DxlController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    public function show()
    {   
        return view('DXL.home');
    }

}
