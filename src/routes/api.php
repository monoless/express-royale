<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
\Route::post('auth/register', 'Auth\RegisterController@register');
\Route::post('auth/login', 'Auth\LoginController@login');

Broadcast::routes(['middleware' => ['auth:sanctum']]);
