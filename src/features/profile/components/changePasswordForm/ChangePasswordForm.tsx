import { Button, Form, Stack, TextInput } from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  oldPassword: z.string().min(5, {
    message: "Password must be atleast 5 characters",
  }),
  newPassword: z.string().min(5, {
    message: "Password must be atleast 5 characters",
  }),
});

function ChangePasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <TextInput
          id="oldPassword"
          type="password"
          labelText="Old Password"
          {...form.register("oldPassword")}
          invalid={Boolean(form.formState.errors.oldPassword)}
          invalidText={form.formState.errors.oldPassword?.message}
        />
        <TextInput
          id="newPassword"
          type="password"
          labelText="New Password"
          {...form.register("newPassword")}
          invalid={Boolean(form.formState.errors.newPassword)}
          invalidText={form.formState.errors.newPassword?.message}
        />
        <Button type="submit">Update Password</Button>
      </Stack>
    </Form>
  );
}

export default ChangePasswordForm;
