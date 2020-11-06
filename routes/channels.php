<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
Broadcast::channel('chat', function ($user) {
    if ($user !== null) {
        $resource = new \App\Http\Resources\User($user);
        return json_decode($resource->toJson(), true);
    }

    return null;
});
