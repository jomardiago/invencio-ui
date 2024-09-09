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
import { useChangePasswordMutation } from "../../../auth/api/useChangePasswordMutation";

const formSchema = z.object({
  oldPassword: z.string().min(5, {
    message: "Password must be atleast 5 characters",
  }),
  newPassword: z.string().min(5, {
    message: "Password must be atleast 5 characters",
  }),
});

function ChangePasswordForm() {
  const changePassword = useChangePasswordMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    changePassword.mutate(values);
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {changePassword.error && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="error"
            title="Change Password Failed:"
            subtitle={changePassword.error.message}
            lowContrast
          />
        </div>
      )}

      {changePassword.isSuccess && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="success"
            title="Change Password Success:"
            subtitle={changePassword.data.message}
            lowContrast
          />
        </div>
      )}

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
        {changePassword.isPending ? (
          <InlineLoading description="Saving..." />
        ) : (
          <Button type="submit">Update Password</Button>
        )}
      </Stack>
    </Form>
  );
}

export default ChangePasswordForm;
