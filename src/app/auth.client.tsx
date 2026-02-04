"use client";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ActionState } from "@/lib/middleware";
import { signIn, signUp, signOut } from "./(login)/actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

/* ----------------------------------------
   LOGIN FORM
-----------------------------------------*/

export function LoginForm() {
  const [signInState, signInFormAction, signInPending] =
    useActionState<ActionState, FormData>(signIn, { error: "" });

  const [signUpState, signUpFormAction, signUpPending] =
    useActionState<ActionState, FormData>(signUp, { error: "" });

  const pending = signInPending || signUpPending;
  const state = signInState.error ? signInState : signUpState;

  return (
    <form className="space-y-5">
      {/* Username */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Username
        </label>
        <Input
          name="username"
          type="text"
          required
          maxLength={50}
          placeholder="Enter your username"
          className="h-10 rounded-lg border-gray-300 focus:border-black focus:ring-black"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          name="password"
          type="password"
          required
          maxLength={100}
          placeholder="Enter your password"
          className="h-10 rounded-lg border-gray-300 focus:border-black focus:ring-black"
        />
      </div>

      {/* Login */}
      <Button
        type="submit"
        formAction={signInFormAction}
        disabled={pending}
        className="h-10 w-full rounded-lg bg-black text-white hover:bg-gray-900"
      >
        Log in
      </Button>

      {/* Create Account */}
      <Button
        type="submit"
        formAction={signUpFormAction}
        variant="outline"
        disabled={pending}
        className="h-10 w-full rounded-lg"
      >
        Create account
      </Button>

      {/* Error */}
      {state?.error && (
        <p className="text-center text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}

/* ----------------------------------------
   LOGIN DROPDOWN
-----------------------------------------*/

export function SignInSignUp() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-gray-100">
        Log in
        <ChevronDown className="h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent className="w-72 rounded-xl border bg-white p-5 shadow-lg">
        <h3 className="mb-4 text-center text-lg font-semibold">
          Welcome Back
        </h3>
        <LoginForm />
      </PopoverContent>
    </Popover>
  );
}

/* ----------------------------------------
   SIGN OUT DROPDOWN
-----------------------------------------*/

export function SignOut(props: { username: string }) {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-gray-100">
        {props.username}
        <ChevronDown className="h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent className="w-40 rounded-xl border bg-white p-3 shadow-lg">
        <form>
          <Button
            formAction={signOut}
            variant="destructive"
            className="w-full"
          >
            Sign out
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
