import { Button, InlineLoading } from "@carbon/react";

type SubmitButtonProps = {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
};

function SubmitButton({
  isLoading = false,
  loadingText,
  children,
}: SubmitButtonProps) {
  return (
    <>
      {isLoading ? (
        <InlineLoading description={loadingText} />
      ) : (
        <Button type="submit">{children}</Button>
      )}
    </>
  );
}

export default SubmitButton;
