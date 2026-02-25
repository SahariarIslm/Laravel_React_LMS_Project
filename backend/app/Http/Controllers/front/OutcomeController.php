<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Outcome;
use Illuminate\Support\Facades\Validator;

class OutcomeController extends Controller
{
    // This method will return all outcomes of a course
    public function index(Request $request){
        $outcomes = Outcome::where('course_id',$request->course_id)->get();
        return response()->json([
            'status' => 200,
            'data'   => $outcomes
        ],200);
    }

    // This method will store/save a outcomes of a course
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'course_id' => 'required',
            'outcome' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors
            ],400);
        }

        $outcome = new Outcome();
        $outcome->course_id = $request->course_id;
        $outcome->text = $request->outcome;
        $outcome->sort_order = 1000;
        $outcome->save();

        return response()->json([
            'status' => 200,
            'data' => $outcome,
            'message'=> 'Outcome added successfully.'
        ],200);
    }

    // This method will update a outcome
    public function update($id, Request $request){
        $outcome = Outcome::find($id);
        if ($outcome == null) {
            return response()->json([
                'status'=>404,
                'message'=>'Outcome not found'
            ],404);
        }
        $validator = Validator::make($request->all(),[
            'outcome' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors()
            ],400);
        }

        $outcome->text = $request->outcome;
        $outcome->save();

        return response()->json([
            'status' => 200,
            'data' => $outcome,
            'message'=> 'Outcome updated successfully.'
        ],200);
    }

    // This method will destroy/delete a outcome
    public function destroy($id){
        $outcome = Outcome::find($id);
        if ($outcome == null) {
            return response()->json([
                'status'=>404,
                'message'=>'Outcome not found'
            ],404);
        }

        $outcome->delete();
        return response()->json([
            'status' => 200,
            'message'=> 'Outcome deleted successfully.'
        ],200);
    }
}
