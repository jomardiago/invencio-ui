import classes from "./Categories.module.scss";
import CategoriesForm from "./components/categoriesForm/CategoriesForm";
import CategoriesList from "./components/categoriesList/CategoriesList";

function Categories() {
  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <CategoriesForm />
      </div>
      <div className={classes.categoriesWrapper}>
        <CategoriesList />
      </div>
    </div>
  );
}

export default Categories;
