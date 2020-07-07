<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignInRequest;
use App\Providers\RouteServiceProvider;
use App\Services\AccountService;
use App\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers {
        login as protected abstractLogin;
    }

    protected AccountService $accountService;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected string $redirectTo = RouteServiceProvider::HOME;

    /**
     * LoginController constructor.
     * @param AccountService $accountService
     */
    public function __construct(AccountService $accountService)
    {
        $this->middleware('guest')->except('logout');
        $this->accountService = $accountService;
    }

    /**
     * @param SignInRequest $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(SignInRequest $request)
    {
        return $this->abstractLogin($request);
    }

    /**
     * @param SignInRequest $request
     */
    protected function validateLogin(SignInRequest $request)
    {
        // do nothing
    }

    /**
     * @param SignInRequest $request
     * @return bool
     */
    protected function attemptLogin(SignInRequest $request)
    {
        $user = $this->accountService->loginByUsername(
            $request->input('username'),
            $request->input('password')
        );

        if (!$user) {
            return false;
        }

        $this->guard()->login($user);

        return true;
    }

    /**
     * @return \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return \Auth::guard();
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  SignInRequest $request
     * @return Response|array
     */
    protected function sendLoginResponse(SignInRequest $request)
    {
        $this->clearLoginAttempts($request);

        if ($response = $this->authenticated($request, $this->guard()->user())) {
            return $response;
        }

        return new Response('', 204);
    }

    /**
     * @param SignInRequest $request
     * @param Authenticatable|User $user
     * @return array
     */
    protected function authenticated(SignInRequest $request, Authenticatable $user)
    {
        return [
            'token' => $this->accountService->publishToken($user, $request->header('Request-Id'))
        ];
    }
}
