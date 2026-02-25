<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\CourseController;
use App\Http\Controllers\front\OutcomeController;

Route::post('/register',[AccountController::class,'register']);
Route::post('/login',[AccountController::class,'authenticate']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware'=>['auth:sanctum']],function () {
    Route::post('/courses',[CourseController::class,'store']);
    Route::get('/courses/meta-data',[CourseController::class,'metaData']);
    Route::get('/course/{id}',[CourseController::class,'show']);
    Route::put('/course/{id}',[CourseController::class,'update']);
    // outcome routes
    Route::get('/outcomes',[OutcomeController::class,'index']);
    Route::post('/outcomes',[OutcomeController::class,'store']);
    Route::put('/outcome/{id}',[OutcomeController::class,'update']);
    Route::delete('/outcome/{id}',[OutcomeController::class,'destroy']);
});
