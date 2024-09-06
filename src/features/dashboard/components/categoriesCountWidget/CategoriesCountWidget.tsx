import { Categories } from "@carbon/icons-react";
import CountWidget from "../countWidget/CountWidget";
import { InlineLoading } from "@carbon/react";
import useSessionStore from "../../../../stores/sessionStore";
import { useCategoriesCountQuery } from "../../apis/useCategoriesCountQuery";

function CategoriesCountWidget() {
  const { session } = useSessionStore();
  const categoriesCount = useCategoriesCountQuery(session?.id);

  return (
    <CountWidget
      renderIcon={() => <Categories size={32} style={{ color: "white" }} />}
      value={
        categoriesCount.isLoading ? (
          <InlineLoading />
        ) : (
          categoriesCount.data || 0
        )
      }
      label="Categories"
      iconBgColor="orange"
      flex={1}
    />
  );
}

export default CategoriesCountWidget;
