<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('color')->default('#63d275');
            $table->integer('sort')->default(0);
            $table->timestamps();
        });

        $member = Role::create([
            'name' => 'Member'
        ]);

        Schema::table('users', function  (Blueprint $table) use ($member) {
            $table->unsignedBigInteger('role_id')->default($member->id);

            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');

        Schema::table('users', function (Blueprint $table) {
           $table->dropForeign('role_id');
           $table->dropColumn('role_id');
        });
    }
}
