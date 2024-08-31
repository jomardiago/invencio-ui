import {
  Button,
  Form,
  InlineLoading,
  InlineNotification,
  Stack,
  TextInput,
} from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../../../../apis/auth/loginMutation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Not a valid email",
    }),
  password: z.string().min(5, {
    message: "Password must be atleast 5 characters",
  }),
});

function LoginForm() {
  const login = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login.mutate(values, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {login.error && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="error"
            title="Login Failed:"
            subtitle={login.error?.message}
            lowContrast
          />
        </div>
      )}

      <Stack gap={4}>
        <TextInput
          id="email"
          type="email"
          labelText="Email"
          {...form.register("email")}
          invalid={Boolean(form.formState.errors.email)}
          invalidText={form.formState.errors.email?.message}
        />
        <TextInput
          id="password"
          type="password"
          labelText="Password"
          {...form.register("password")}
          invalid={Boolean(form.formState.errors.password)}
          invalidText={form.formState.errors.password?.message}
        />
        {login.isPending ? (
          <InlineLoading description="Logging in..." />
        ) : (
          <Button type="submit">Login</Button>
        )}
      </Stack>
    </Form>
  );
}

export default LoginForm;
