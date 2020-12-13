<?php namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * AuthController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if( !$token = auth()->attempt( $credentials ) )
        {
            return response()->json(['message' => 'Sorry your credentials do not match'], 400);
        }

        return $this->respondWithToken( $token );
    }

    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function me()
    {
        return response()->json( auth()->user() );
    }

    public function refresh()
    {
        return $this->respondWithToken( auth()->refresh() );
    }

    public function respondWithToken( $token )
    {
        return response()->json([
           'token' => $token,
           'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
