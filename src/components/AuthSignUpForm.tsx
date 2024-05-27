"use client";

import {
  TAuthCreateNewAccountValidator,
  AuthCreateNewAccountValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/server/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function AuthSignUpForm() {
  const router = useRouter();

  const form = useForm<TAuthCreateNewAccountValidator>({
    resolver: zodResolver(AuthCreateNewAccountValidator),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: singUp, isLoading } = trpc.auth.signUp.useMutation({
    onSuccess: ({ internalAccount }) => {
      toast.success(`Verification email sent to ${internalAccount.email}`);
      router.push(`/verify-email?to=${internalAccount.email}`);
    },
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast.error("User already exists");
        return;
      }

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }

      toast.error("Something went wrong");
    },
  });

  const onSubmit = ({
    email,
    password,
    confirmPassword,
  }: TAuthCreateNewAccountValidator) => {
    singUp({ email, password, confirmPassword });
  };

  return (
    <Form {...form}>
      <form
        id="auth-sign-in-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          data-test="auth-sign-in-button"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
