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
import { Category } from "../../apis/useCategoriesQuery";
import { useUpdateCategoryMutation } from "../../apis/useUpdateCategoryMutation";
import { useEffect } from "react";

type CategoriesFormProps = {
  category?: Category;
  onSaveCallback?: () => void;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required",
  }),
});

function CategoriesForm({ category, onSaveCallback }: CategoriesFormProps) {
  const { session } = useSessionStore();
  const createCategory = useCreateCategoryMutation(session?.id);
  const updateCategory = useUpdateCategoryMutation(session?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category) {
      form.setValue("name", category.name);
      form.setFocus("name");
    }
  }, [category, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (category) {
      updateCategory.mutate(
        { ...category, name: values.name },
        {
          onSuccess: () => {
            form.reset();
            if (onSaveCallback) onSaveCallback();
          },
        },
      );
    } else {
      createCategory.mutate(values.name, {
        onSuccess: () => form.reset(),
      });
    }
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
        {(createCategory.error || updateCategory.error) && (
          <div style={{ padding: "1rem 0" }}>
            <InlineNotification
              kind="error"
              title={`${category ? "Update Category" : "Create Category"} Failed:`}
              subtitle={
                createCategory.error?.message || updateCategory.error?.message
              }
              lowContrast
            />
          </div>
        )}

        {(createCategory.isSuccess || updateCategory.isSuccess) && (
          <div style={{ padding: "1rem 0" }}>
            <InlineNotification
              kind="success"
              title={`${category ? "Update Category" : "Create Category"} Success:`}
              subtitle={
                createCategory.data?.message || updateCategory.data?.message
              }
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
          {createCategory.isPending || updateCategory.isPending ? (
            <InlineLoading
              description={`${category ? "Updating..." : "Saving..."}`}
            />
          ) : (
            <Button type="submit">Save</Button>
          )}
        </Stack>
      </Form>
    </div>
  );
}

export default CategoriesForm;
