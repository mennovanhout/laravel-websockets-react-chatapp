<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function sendMessage(Request $request) {
        $data = $request->validate([
            'message' => 'required|min:1|max:255',
        ]);

        $data['user_id'] = $request->user()->id;

        $message = Message::create($data);

        NewMessage::dispatch($message);

        return response(null, 204);
    }

    public function retrieve(Request $request) {
        return \App\Http\Resources\Message::collection(Message::all());
    }
}
