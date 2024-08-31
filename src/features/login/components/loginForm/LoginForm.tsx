import { Button, Form, Stack, TextInput } from "@carbon/react";

function LoginForm() {
  return (
    <Form>
      <Stack gap={4}>
        <TextInput id="email" labelText="Email" />
        <TextInput id="password" labelText="Password" />
        <Button>Login</Button>
      </Stack>
    </Form>
  );
}

export default LoginForm;
