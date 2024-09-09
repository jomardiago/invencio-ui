import { useEffect, useState } from "react";
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
import { useProfileQuery } from "../../apis/useProfileQuery";
import useSessionStore from "../../../../stores/sessionStore";
import { useUpdateProfileMutation } from "../../apis/useUpdateProfileMutation";
import { useCreateProfileMutation } from "../../apis/useCreateProfileMutation";

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

function EditProfileForm() {
  const { session } = useSessionStore();
  const profile = useProfileQuery(session?.id);
  const updateProfile = useUpdateProfileMutation(session?.id);
  const createProfile = useCreateProfileMutation(session?.id);
  const [isUpdate, setIsUpdate] = useState(false);
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
    if (profile.data) {
      form.setValue("firstName", profile.data.firstName || "");
      form.setValue("lastName", profile.data.lastName || "");
      form.setValue("contactNumber", profile.data.contactNumber || "");
      form.setValue("address", profile.data.address || "");
      setIsUpdate(true);
    }
  }, [profile, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (profile.data) {
      updateProfile.mutate(values);
    } else {
      createProfile.mutate(values);
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {(createProfile.error || updateProfile.error) && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="error"
            title={`${isUpdate ? "Update Profile" : "Create Profile"} Failed:`}
            subtitle={
              createProfile.error?.message || updateProfile.error?.message
            }
            lowContrast
          />
        </div>
      )}

      {(createProfile.isSuccess || updateProfile.isSuccess) && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="success"
            title={`${isUpdate ? "Update Profile" : "Create Profile"} Success:`}
            subtitle={
              createProfile.data?.message || updateProfile.data?.message
            }
            lowContrast
          />
        </div>
      )}

      <Stack gap={4}>
        <TextInput
          id="firstName"
          type="text"
          labelText="First Name"
          {...form.register("firstName")}
          invalid={Boolean(form.formState.errors.firstName)}
          invalidText={form.formState.errors.firstName?.message}
        />
        <TextInput
          id="lastName"
          type="text"
          labelText="Last Name"
          {...form.register("lastName")}
          invalid={Boolean(form.formState.errors.lastName)}
          invalidText={form.formState.errors.lastName?.message}
        />
        <TextInput
          id="contactNumber"
          type="text"
          labelText="Contact Number"
          {...form.register("contactNumber")}
          invalid={Boolean(form.formState.errors.contactNumber)}
          invalidText={form.formState.errors.contactNumber?.message}
        />
        <TextInput
          id="address"
          type="text"
          labelText="Address"
          {...form.register("address")}
          invalid={Boolean(form.formState.errors.address)}
          invalidText={form.formState.errors.address?.message}
        />
        {updateProfile.isPending ? (
          <InlineLoading description="Saving..." />
        ) : (
          <Button type="submit">Save</Button>
        )}
      </Stack>
    </Form>
  );
}

export default EditProfileForm;
