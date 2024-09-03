import { Edit, TrashCan } from "@carbon/icons-react";
import { Button, ContainedList, ContainedListItem, Theme } from "@carbon/react";

function CategoriesList() {
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
      <Theme theme="white">
        <ContainedList label="All Categories" kind="on-page" action={""}>
          <ContainedListItem action={itemAction}>Gadgets</ContainedListItem>
          <ContainedListItem action={itemAction}>Automotive</ContainedListItem>
          <ContainedListItem action={itemAction}>
            Raw Materials
          </ContainedListItem>
        </ContainedList>
      </Theme>
    </div>
  );
}

export default CategoriesList;
