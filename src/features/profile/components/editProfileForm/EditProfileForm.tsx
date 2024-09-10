import { useEffect } from "react";
import { Form, Stack, TextInput } from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSessionStore from "../../../../stores/sessionStore";
import { useUpdateProfileMutation } from "../../apis/useUpdateProfileMutation";
import { useCreateProfileMutation } from "../../apis/useCreateProfileMutation";
import { Profile } from "../../apis/useProfileQuery";
import useToastNotificationStore from "../../../../stores/toastNotificationStore";
import SubmitButton from "../../../../common/components/submitButton/SubmitButton";

const formSchema = z.object({
  firstName: z.string().max(100, {
    message: "First name must be not more than 100 characters.",
  }),
  lastName: z.string().max(100, {
    message: "Last name must be not more than 100 characters.",
  }),
  contactNumber: z.string().max(100, {
    message: "Contact number must be not more than 100 characters.",
  }),
  address: z.string().max(100, {
    message: "Address must be not more than 100 characters.",
  }),
});

function EditProfileForm({ profile }: { profile?: Profile }) {
  const { session } = useSessionStore();
  const { setToastNotification } = useToastNotificationStore();
  const updateProfile = useUpdateProfileMutation(session?.id);
  const createProfile = useCreateProfileMutation(session?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      address: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.setValue("firstName", profile.firstName || "");
      form.setValue("lastName", profile.lastName || "");
      form.setValue("contactNumber", profile.contactNumber || "");
      form.setValue("address", profile.address || "");
    }
  }, [profile, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (profile) {
      updateProfile.mutate(values, {
        onSuccess: (data) => {
          setToastNotification({
            kind: "success",
            title: "Update Profile",
            subTitle: data.message,
          });
        },
        onError: (error) => {
          setToastNotification({
            kind: "error",
            title: "Update Profile",
            subTitle: error.message,
          });
        },
      });
    } else {
      createProfile.mutate(values, {
        onSuccess: (data) => {
          setToastNotification({
            kind: "success",
            title: "Create Profile",
            subTitle: data.message,
          });
        },
        onError: (error) => {
          setToastNotification({
            kind: "error",
            title: "Create Profile",
            subTitle: error.message,
          });
        },
      });
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <TextInput
          id="firstName"
          type="text"
          labelText="First Name"
          autoComplete="off"
          {...form.register("firstName")}
          invalid={Boolean(form.formState.errors.firstName)}
          invalidText={form.formState.errors.firstName?.message}
        />
        <TextInput
          id="lastName"
          type="text"
          labelText="Last Name"
          autoComplete="off"
          {...form.register("lastName")}
          invalid={Boolean(form.formState.errors.lastName)}
          invalidText={form.formState.errors.lastName?.message}
        />
        <TextInput
          id="contactNumber"
          type="text"
          labelText="Contact Number"
          autoComplete="off"
          {...form.register("contactNumber")}
          invalid={Boolean(form.formState.errors.contactNumber)}
          invalidText={form.formState.errors.contactNumber?.message}
        />
        <TextInput
          id="address"
          type="text"
          labelText="Address"
          autoComplete="off"
          {...form.register("address")}
          invalid={Boolean(form.formState.errors.address)}
          invalidText={form.formState.errors.address?.message}
        />
        <SubmitButton
          isLoading={createProfile.isPending || updateProfile.isPending}
          loadingText="Saving..."
        >
          Save
        </SubmitButton>
      </Stack>
    </Form>
  );
}

export default EditProfileForm;
