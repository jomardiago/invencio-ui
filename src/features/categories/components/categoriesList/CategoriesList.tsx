import {
  Button,
  ContainedList,
  ContainedListItem,
  InlineNotification,
  Loading,
  Theme,
} from "@carbon/react";
import { Edit, TrashCan } from "@carbon/icons-react";
import useSessionStore from "../../../../stores/sessionStore";
import { Category, useCategoriesQuery } from "../../apis/useCategoriesQuery";
import { useDeleteCategoryMutation } from "../../apis/useDeleteCategory";

type CategoriesListProps = {
  setSelectedCategory?: (category: Category) => void;
};

function CategoriesList({ setSelectedCategory }: CategoriesListProps) {
  const { session } = useSessionStore();
  const categories = useCategoriesQuery(session?.id);
  const deleteCategory = useDeleteCategoryMutation(session?.id);

  const onCategorySelect = (category: Category) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
  };

  const onCategoryDelete = (category: Category) => {
    deleteCategory.mutate(category);
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
        {session?.isAdmin && (
          <Button
            kind="danger"
            iconDescription="Delete"
            renderIcon={TrashCan}
            aria-label="Delete"
            onClick={() => onCategoryDelete(category)}
            hasIconOnly
          />
        )}
      </>
    );
  };

  return (
    <div>
      <Loading active={categories.isLoading || deleteCategory.isPending} />

      {deleteCategory.isSuccess && (
        <div>
          <InlineNotification
            kind="success"
            title="Delete Category Success:"
            subtitle={deleteCategory.data.message}
            lowContrast
          />
        </div>
      )}

      {deleteCategory.isError && (
        <div>
          <InlineNotification
            kind="error"
            title="Delete Category Failed:"
            subtitle={deleteCategory.error.message}
            lowContrast
          />
        </div>
      )}

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
