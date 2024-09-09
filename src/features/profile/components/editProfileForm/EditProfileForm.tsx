import { Button, Form, Stack, TextInput } from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit">Save</Button>
      </Stack>
    </Form>
  );
}

export default EditProfileForm;
