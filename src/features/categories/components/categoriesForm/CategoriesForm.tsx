import { Categories } from "@carbon/icons-react";
import { Button, Form, InlineLoading, Stack, TextInput } from "@carbon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSessionStore from "../../../../stores/sessionStore";
import { useCreateCategoryMutation } from "../../apis/useCreateCategoryMutation";
import { Category } from "../../apis/useCategoriesQuery";
import { useUpdateCategoryMutation } from "../../apis/useUpdateCategoryMutation";
import { useEffect } from "react";
import useToastNotificationStore from "../../../../stores/toastNotificationStore";

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
  const { setToastNotification } = useToastNotificationStore();
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
          onSuccess: (data) => {
            form.reset();
            setToastNotification({
              kind: "success",
              title: "Update Category",
              subTitle: data.message,
            });
            if (onSaveCallback) onSaveCallback();
          },
          onError: (error) => {
            setToastNotification({
              kind: "error",
              title: "Update Category",
              subTitle: error.message,
            });
          },
        },
      );
    } else {
      createCategory.mutate(values.name, {
        onSuccess: (data) => {
          form.reset();
          setToastNotification({
            kind: "success",
            title: "Create Category",
            subTitle: data.message,
          });
        },
        onError: (error) => {
          setToastNotification({
            kind: "error",
            title: "Create Category",
            subTitle: error.message,
          });
        },
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
        <Stack gap={4}>
          <TextInput
            id="name"
            type="name"
            labelText="Name"
            autoComplete="off"
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
