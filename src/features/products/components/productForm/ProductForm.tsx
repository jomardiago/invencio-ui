import { useEffect } from "react";
import {
  Button,
  Form,
  InlineNotification,
  Select,
  SelectItem,
  Stack,
  TextInput,
} from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCategoriesQuery } from "../../../categories/apis/useCategoriesQuery";
import useSessionStore from "../../../../stores/sessionStore";
import { useCreateProductMutation } from "../../apis/useCreateProductMutation";
import { Product } from "../../apis/useProductsQuery";
import { useUpdateProductMutation } from "../../apis/useUpdateProductMutation";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  stock: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int({ message: "Stock must be an integer." })
      .nonnegative({ message: "Stock cannot be negative." })
      .min(0, { message: "Stock cannot be less than 0." }),
  ),
  buyingPrice: z.preprocess(
    (val) => parseFloat(val as string),
    z
      .number()
      .nonnegative({ message: "Price must be a positive number." })
      .min(0, { message: "Price cannot be less than 0." })
      .refine((val) => val.toFixed(2).length <= 12, {
        message: "Price must have up to 2 decimal places.",
      }),
  ),
  sellingPrice: z.preprocess(
    (val) => parseFloat(val as string),
    z
      .number()
      .nonnegative({ message: "Price must be a positive number." })
      .min(0, { message: "Price cannot be less than 0." })
      .refine((val) => val.toFixed(2).length <= 12, {
        message: "Price must have up to 2 decimal places.",
      }),
  ),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
});

function ProductForm({ product }: { product?: Product }) {
  const { session } = useSessionStore();
  const categories = useCategoriesQuery(session?.id);
  const createProduct = useCreateProductMutation(session?.id);
  const updateProduct = useUpdateProductMutation(session?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      stock: 0,
      buyingPrice: 0.0,
      sellingPrice: 0.0,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.setValue("title", product.title);
      form.setValue("stock", product.stock);
      form.setValue("buyingPrice", parseFloat(product.buyingPrice));
      form.setValue("sellingPrice", parseFloat(product.sellingPrice));
      form.setValue("categoryId", String(product.category.id));
    }
  }, [product, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (product) {
      updateProduct.mutate({
        id: product.id,
        buyingPrice: values.buyingPrice,
        categoryId: Number(values.categoryId),
        sellingPrice: values.sellingPrice,
        stock: values.stock,
        title: values.title,
      });
    } else {
      createProduct.mutate(
        { ...values, categoryId: Number(values.categoryId) },
        {
          onSuccess: () => form.reset(),
        },
      );
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {createProduct.error && updateProduct.error && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="error"
            title={`${product ? "Update Product" : "Create Product"} Failed:`}
            subtitle={
              createProduct.error.message || updateProduct.error.message
            }
            lowContrast
          />
        </div>
      )}

      {(createProduct.isSuccess || updateProduct.isSuccess) && (
        <div style={{ padding: "1rem 0" }}>
          <InlineNotification
            kind="success"
            title={`${product ? "Update Product" : "Create Product"} Success:`}
            subtitle={
              createProduct.data?.message || updateProduct.data?.message
            }
            lowContrast
          />
        </div>
      )}

      <Stack gap={4}>
        <TextInput
          id="title"
          labelText="Title"
          {...form.register("title")}
          invalid={Boolean(form.formState.errors.title)}
          invalidText={form.formState.errors.title?.message}
        />
        <TextInput
          id="stock"
          labelText="Stock"
          {...form.register("stock")}
          invalid={Boolean(form.formState.errors.stock)}
          invalidText={form.formState.errors.stock?.message}
        />
        <TextInput
          id="buyingPrice"
          labelText="Buying Price"
          {...form.register("buyingPrice")}
          invalid={Boolean(form.formState.errors.buyingPrice)}
          invalidText={form.formState.errors.buyingPrice?.message}
        />
        <TextInput
          id="sellingPrice"
          labelText="Selling Price"
          {...form.register("sellingPrice")}
          invalid={Boolean(form.formState.errors.sellingPrice)}
          invalidText={form.formState.errors.sellingPrice?.message}
        />
        <Select
          id="categoryId"
          labelText="Category"
          {...form.register("categoryId")}
          invalid={Boolean(form.formState.errors.categoryId)}
          invalidText={form.formState.errors.categoryId?.message}
        >
          <SelectItem value="" text="Select Category" />
          {categories.data?.map((category) => (
            <SelectItem
              key={category.id}
              value={String(category.id)}
              text={category.name}
            />
          ))}
        </Select>
        <Button type="submit">Save</Button>
      </Stack>
    </Form>
  );
}

export default ProductForm;
