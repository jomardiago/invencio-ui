import { useState } from "react";
import classes from "./Categories.module.scss";
import CategoriesForm from "./components/categoriesForm/CategoriesForm";
import CategoriesList from "./components/categoriesList/CategoriesList";
import { Category } from "./apis/useCategoriesQuery";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const onSaveCallback = () => setSelectedCategory(undefined);

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <CategoriesForm
          category={selectedCategory}
          onSaveCallback={onSaveCallback}
        />
      </div>
      <div className={classes.categoriesWrapper}>
        <CategoriesList setSelectedCategory={setSelectedCategory} />
      </div>
    </div>
  );
}

export default Categories;
