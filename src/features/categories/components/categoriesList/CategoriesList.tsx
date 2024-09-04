import {
  Button,
  ContainedList,
  ContainedListItem,
  Loading,
  Theme,
} from "@carbon/react";
import { Edit, TrashCan } from "@carbon/icons-react";
import useSessionStore from "../../../../stores/sessionStore";
import { Category, useCategoriesQuery } from "../../apis/useCategoriesQuery";

type CategoriesListProps = {
  setSelectedCategory?: (category: Category) => void;
};

function CategoriesList({ setSelectedCategory }: CategoriesListProps) {
  const { session } = useSessionStore();
  const categories = useCategoriesQuery(session?.id);

  const onCategorySelect = (category: Category) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
  };

  const itemAction = (category: Category) => {
    return (
      <>
        <Button
          kind="ghost"
          iconDescription="Edit"
          renderIcon={Edit}
          aria-label="Edit"
          onClick={() => onCategorySelect(category)}
          hasIconOnly
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
  };

  return (
    <div>
      <Loading active={categories.isLoading} />

      <Theme theme="white">
        <ContainedList label="All Categories" kind="on-page">
          {categories.data?.map((category) => (
            <ContainedListItem key={category.id} action={itemAction(category)}>
              {category.name}
            </ContainedListItem>
          ))}
        </ContainedList>
      </Theme>
    </div>
  );
}

export default CategoriesList;
