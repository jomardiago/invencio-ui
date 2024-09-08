import { useState } from "react";
import {
  Button,
  ContainedList,
  ContainedListItem,
  InlineNotification,
  Loading,
  Modal,
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
  const [deleteConfig, setDeleteConfig] = useState<{
    data: Category | undefined;
    isOpen: boolean;
  }>({
    data: undefined,
    isOpen: false,
  });

  const onCategorySelect = (category: Category) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
  };

  const onCategoryDelete = () => {
    if (deleteConfig.data) {
      deleteCategory.mutate(deleteConfig.data, {
        onSettled: () => setDeleteConfig({ isOpen: false, data: undefined }),
      });
    }
  };

  const confirmCategoryDeletion = (category: Category) => {
    setDeleteConfig({
      data: category,
      isOpen: true,
    });
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
            onClick={() => confirmCategoryDeletion(category)}
            hasIconOnly
          />
        )}
      </>
    );
  };

  return (
    <div>
      <Loading active={categories.isLoading || deleteCategory.isPending} />

      <Modal
        open={deleteConfig.isOpen}
        onRequestClose={() =>
          setDeleteConfig({ isOpen: false, data: undefined })
        }
        modalHeading={`Are you sure you want to delete ${deleteConfig.data?.name}? It will delete the record in the database permanently.`}
        modalLabel="Category"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestSubmit={onCategoryDelete}
        danger
      />

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
