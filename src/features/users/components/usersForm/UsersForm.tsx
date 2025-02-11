import { Form, Stack, TextInput } from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateUserMutation } from "../../apis/useCreateUserMutation";
import useSessionStore from "../../../../stores/sessionStore";
import useToastNotificationStore from "../../../../stores/toastNotificationStore";
import SubmitButton from "../../../../common/components/submitButton/SubmitButton";

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
  const { setToastNotification } = useToastNotificationStore();
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
      onSuccess: (data) => {
        setToastNotification({
          kind: "success",
          title: "Create User",
          subTitle: data.message,
        });
        form.reset();
      },
      onError: (error) => {
        setToastNotification({
          kind: "error",
          title: "Create User",
          subTitle: error.message,
        });
      },
    });
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <TextInput
          id="email"
          type="email"
          labelText="Email"
          autoComplete="off"
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
        <SubmitButton isLoading={createUser.isPending} loadingText="Saving...">
          Save
        </SubmitButton>
      </Stack>
    </Form>
  );
}

export default UsersForm;
