import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../atoms/button";

import { AuthTemplate } from "./auth-template";

const SignInForm = (
  <div className="flex flex-col gap-6">
    <div>
      <h1 className="font-display text-2xl font-semibold text-on-surface">Welcome back</h1>
      <p className="font-body text-sm text-on-surface-variant mt-1">Sign in to Grove Companion</p>
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-body text-sm font-medium text-on-surface">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="rounded-xl bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-body text-sm font-medium text-on-surface">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="rounded-xl bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
    <Button variant="primary" className="w-full">
      Sign in
    </Button>
    <p className="font-body text-center text-sm text-on-surface-variant">
      Don't have an account?{" "}
      <a href="/#" className="text-primary font-medium">
        Sign up
      </a>
    </p>
  </div>
);

const SignUpForm = (
  <div className="flex flex-col gap-6">
    <div>
      <h1 className="font-display text-2xl font-semibold text-on-surface">Create your account</h1>
      <p className="font-body text-sm text-on-surface-variant mt-1">
        Join Grove Companion — it's free
      </p>
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-body text-sm font-medium text-on-surface">
          Your name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Marcus"
          className="rounded-xl bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-email" className="font-body text-sm font-medium text-on-surface">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          placeholder="you@example.com"
          className="rounded-xl bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
    <Button variant="primary" className="w-full">
      Create account
    </Button>
    <p className="font-body text-center text-sm text-on-surface-variant">
      Already have an account?{" "}
      <a href="/#" className="text-primary font-medium">
        Sign in
      </a>
    </p>
  </div>
);

const meta = {
  title: "Templates/AuthTemplate",
  component: AuthTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignIn: Story = {
  name: "Sign in",
  args: { children: SignInForm },
};

export const SignUp: Story = {
  name: "Sign up",
  args: { children: SignUpForm },
};
