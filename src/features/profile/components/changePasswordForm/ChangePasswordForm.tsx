import { Form, Stack, TextInput } from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useChangePasswordMutation } from "../../../auth/api/useChangePasswordMutation";
import useToastNotificationStore from "../../../../stores/toastNotificationStore";
import SubmitButton from "../../../../common/components/submitButton/SubmitButton";

const formSchema = z.object({
  oldPassword: z.string().min(5, {
    message: "Password must be atleast 5 characters",
  }),
  newPassword: z.string().min(5, {
    message: "Password must be atleast 5 characters",
  }),
});

function ChangePasswordForm() {
  const { setToastNotification } = useToastNotificationStore();
  const changePassword = useChangePasswordMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    changePassword.mutate(values, {
      onSuccess: (data) => {
        setToastNotification({
          kind: "success",
          title: "Update Password",
          subTitle: data.message,
        });
      },
      onError: (error) => {
        setToastNotification({
          kind: "error",
          title: "Update Password",
          subTitle: error.message,
        });
      },
    });
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
        <SubmitButton
          isLoading={changePassword.isPending}
          loadingText="Updating..."
        >
          Update Password
        </SubmitButton>
      </Stack>
    </Form>
  );
}

export default ChangePasswordForm;
