import { Categories } from "@carbon/icons-react";
import { Button, Form, Stack, TextInput } from "@carbon/react";

function CategoriesForm() {
  return (
    <div>
      <h4>
        <Categories /> Add New Category
      </h4>

      <Form style={{ marginTop: "1rem" }}>
        <Stack gap={4}>
          <TextInput id="categoryName" labelText="Category Name" />
          <Button>Save</Button>
        </Stack>
      </Form>
    </div>
  );
}

export default CategoriesForm;
