import { Categories } from "@carbon/icons-react";
import {
  Button,
  Form,
  InlineLoading,
  InlineNotification,
  Stack,
  TextInput,
} from "@carbon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSessionStore from "../../../../stores/sessionStore";
import { useCreateCategoryMutation } from "../../apis/useCreateCategoryMutation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required",
  }),
});

function CategoriesForm() {
  const { session } = useSessionStore();
  const createCategory = useCreateCategoryMutation(session?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createCategory.mutate(values.name, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div>
      <h4>
        <Categories /> Add New Category
      </h4>

      <Form
        style={{ marginTop: "1rem" }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {createCategory.error && (
          <div style={{ padding: "1rem 0" }}>
            <InlineNotification
              kind="error"
              title="Create Category Failed:"
              subtitle={createCategory.error?.message}
              lowContrast
            />
          </div>
        )}

        <Stack gap={4}>
          <TextInput
            id="name"
            type="name"
            labelText="Name"
            {...form.register("name")}
            invalid={Boolean(form.formState.errors.name)}
            invalidText={form.formState.errors.name?.message}
          />
          {createCategory.isPending ? (
            <InlineLoading description="Saving..." />
          ) : (
            <Button type="submit">Save</Button>
          )}
        </Stack>
      </Form>
    </div>
  );
}

export default CategoriesForm;
