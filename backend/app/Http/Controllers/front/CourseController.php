<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Course;
use App\Models\Category;
use App\Models\Language;
use App\Models\Level;

class CourseController extends Controller
{
    // This method will return all courses for a specific user
    public function index()
    {

    }

    // This method will store/save a course in database as a draft.
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:5'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }
        // This will store course in db
        $course = new Course();
        $course->title = $request->title;
        $course->status = 0; // 0 for draft
        $course->user_id = $request->user()->id;
        $course->save();
        return response()->json([
            'status' => 200,
            'data'   => $course,
            'message' => 'Course created successfully',
        ],200);
    }
    // this will return categories, levels, languages
    public function metaData(){
        $categories = Category::all();
        $levels     = Level::all();
        $languages  = Language::all();
    }
}
