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
import { useCreateUserMutation } from "../../apis/useCreateUserMutation";
import useSessionStore from "../../../../stores/sessionStore";

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

function UsersForm() {
  const { session } = useSessionStore();
  const createUser = useCreateUserMutation(session?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createUser.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <div style={{ marginBottom: "1rem" }}>
        {createUser.error && (
          <InlineNotification
            kind="error"
            title="Create User Failed:"
            subtitle={createUser.error?.message}
            lowContrast
          />
        )}

        {createUser.isSuccess && (
          <InlineNotification
            kind="success"
            title="Create User Success:"
            subtitle={createUser.data.message}
            lowContrast
          />
        )}
      </div>

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
        {createUser.isPending ? (
          <InlineLoading description="Saving..." />
        ) : (
          <Button type="submit">Save</Button>
        )}
      </Stack>
    </Form>
  );
}

export default UsersForm;
