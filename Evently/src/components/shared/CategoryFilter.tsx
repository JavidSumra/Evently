import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { getAllCategories } from "@/lib/actions/category.actions";
// import { ICategory } from "@/lib/database/models/category.model";
// import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
// import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CategoryFilter = () => {
  const { t } = useTranslation();
  const [categories] = useState([{ name: "Test", _id: 1 }]);
  //   const router = useRouter();
  //   const searchParams = useSearchParams();

  useEffect(() => {
    // const getCategories = async () => {
    //   //   const categoryList = await getAllCategories();
    //   //   categoryList && setCategories(categoryList as ICategory[]);
    // };
    // getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    // let newUrl = "";

    if (category && category !== "All") {
      //   newUrl = formUrlQuery({
      //     params: searchParams.toString(),
      //     key: "category",
      //     value: category,
      //   });
    } else {
      //   newUrl = removeKeysFromQuery({
      //     params: searchParams.toString(),
      //     keysToRemove: ["category"],
      //   });
    }

    // router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder={t("category")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            value={category?.name}
            key={category?._id}
            className="select-item p-regular-14"
          >
            {category?.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
