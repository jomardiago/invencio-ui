import {
  Button,
  Form,
  InlineLoading,
  Select,
  SelectItem,
  Stack,
  TextInput,
} from "@carbon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSessionStore from "../../../../stores/sessionStore";
import { useCreateSaleMutation } from "../../apis/useCreateSaleMutation";
import { useProductsQuery } from "../../../products/apis/useProductsQuery";
import { useEffect } from "react";
import { Sale } from "../../apis/useSalesQuery";
import { useUpdateSaleMutation } from "../../apis/useUpdateSaleMutation";
import useToastNotificationStore from "../../../../stores/toastNotificationStore";

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

function SaleForm({ sale }: { sale?: Sale }) {
  const { session } = useSessionStore();
  const { setToastNotification } = useToastNotificationStore();
  const createSale = useCreateSaleMutation(session?.id);
  const updateSale = useUpdateSaleMutation(session?.id);
  const products = useProductsQuery(session?.id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      sellingPrice: 0.0,
      quantity: 0,
      total: 0.0,
    },
  });

  const watchProductId = form.watch("productId");
  useEffect(() => {
    if (watchProductId) {
      const product = products.data?.find(
        (product) => product.id === Number(watchProductId),
      );

      if (product) {
        form.setValue("sellingPrice", parseFloat(product.sellingPrice));
      }
    }
  }, [watchProductId, form, products.data]);

  const watchQuantity = form.watch("quantity");
  useEffect(() => {
    if (watchQuantity) {
      const sellingPrice = form.getValues("sellingPrice");
      const total = watchQuantity * sellingPrice;
      form.setValue("total", total);
    }
  }, [watchQuantity, form]);

  useEffect(() => {
    if (sale) {
      form.setValue("productId", String(sale.productId));
      form.setValue("quantity", sale.quantity);
      form.setValue("sellingPrice", parseFloat(sale.sellingPrice));
      form.setValue("total", parseFloat(sale.total));
    }
  }, [sale, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (sale) {
      updateSale.mutate(
        {
          productId: Number(values.productId),
          quantity: values.quantity,
          saledId: sale.id,
          sellingPrice: values.sellingPrice,
          total: values.total,
        },
        {
          onSuccess: (data) => {
            setToastNotification({
              kind: "success",
              title: "Update Sale",
              subTitle: data.message,
            });
          },
          onError: (error) => {
            setToastNotification({
              kind: "error",
              title: "Update Sale",
              subTitle: error.message,
            });
          },
        },
      );
    } else {
      createSale.mutate(
        {
          ...values,
          productId: Number(values.productId),
        },
        {
          onSuccess: (data) => {
            setToastNotification({
              kind: "success",
              title: "Create Sale",
              subTitle: data.message,
            });
          },
          onError: (error) => {
            setToastNotification({
              kind: "error",
              title: "Create Sale",
              subTitle: error.message,
            });
          },
        },
      );
    }
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
          {products.data?.map((product) => (
            <SelectItem value={product.id} text={product.title} />
          ))}
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
        {createSale.isPending ? (
          <InlineLoading description="Saving..." />
        ) : (
          <Button type="submit">Save</Button>
        )}
      </Stack>
    </Form>
  );
}

export default SaleForm;
