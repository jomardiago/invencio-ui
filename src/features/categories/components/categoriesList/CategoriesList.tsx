import {
  Button,
  ContainedList,
  ContainedListItem,
  Loading,
  Theme,
} from "@carbon/react";
import { Edit, TrashCan } from "@carbon/icons-react";
import useSessionStore from "../../../../stores/sessionStore";
import { useCategoriesQuery } from "../../apis/useCategoriesQuery";

function CategoriesList() {
  const { session } = useSessionStore();
  const categories = useCategoriesQuery(session?.id);

  const itemAction = (
    <>
      <Button
        kind="ghost"
        iconDescription="Edit"
        hasIconOnly
        renderIcon={Edit}
        aria-label="Edit"
      />
      <Button
        kind="danger"
        iconDescription="Delete"
        hasIconOnly
        renderIcon={TrashCan}
        aria-label="Delete"
      />
    </>
  );

  return (
    <div>
      <Loading active={categories.isLoading} />

      <Theme theme="white">
        <ContainedList label="All Categories" kind="on-page" action={""}>
          {categories.data?.map((category) => (
            <ContainedListItem key={category.id} action={itemAction}>
              {category.name}
            </ContainedListItem>
          ))}
        </ContainedList>
      </Theme>
    </div>
  );
}

export default CategoriesList;
