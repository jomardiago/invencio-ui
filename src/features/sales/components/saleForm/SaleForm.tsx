import {
  Button,
  Form,
  Select,
  SelectItem,
  Stack,
  TextInput,
} from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  productId: z.string().min(1, {
    message: "Product is required.",
  }),
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
  quantity: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .int({ message: "Stock must be an integer." })
      .nonnegative({ message: "Stock cannot be negative." })
      .min(1, { message: "Stock cannot be less than 1." }),
  ),
  total: z.preprocess(
    (val) => parseFloat(val as string),
    z
      .number()
      .nonnegative({ message: "Price must be a positive number." })
      .min(0, { message: "Price cannot be less than 0." })
      .refine((val) => val.toFixed(2).length <= 12, {
        message: "Price must have up to 2 decimal places.",
      }),
  ),
});

function SaleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      sellingPrice: 0.0,
      quantity: 0,
      total: 0.0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Select
          id="productId"
          labelText="Product"
          {...form.register("productId")}
          invalid={Boolean(form.formState.errors.productId)}
          invalidText={form.formState.errors.productId?.message}
        >
          <SelectItem value="" text="Select Product" />
        </Select>
        <TextInput
          id="sellingPrice"
          labelText="Selling Price"
          {...form.register("sellingPrice")}
          invalid={Boolean(form.formState.errors.sellingPrice)}
          invalidText={form.formState.errors.sellingPrice?.message}
          disabled
        />
        <TextInput
          id="quantity"
          labelText="Quantity"
          {...form.register("quantity")}
          invalid={Boolean(form.formState.errors.quantity)}
          invalidText={form.formState.errors.quantity?.message}
        />
        <TextInput
          id="total"
          labelText="Total"
          {...form.register("total")}
          invalid={Boolean(form.formState.errors.total)}
          invalidText={form.formState.errors.total?.message}
          disabled
        />
        <Button type="submit">Save</Button>
      </Stack>
    </Form>
  );
}

export default SaleForm;
