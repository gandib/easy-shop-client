"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { getAllProducts } from "@/src/services/ProductService";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { queryParams, TProductMeta } from "@/src/types";

const NavbarSearchForm = ({
  setProductData,
  setLoading,
  searchText,
  handleSubmit,
  register,
}: {
  setProductData: Dispatch<SetStateAction<TProductMeta | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  searchText: any;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
}) => {
  useEffect(() => {
    const query: queryParams[] = [];
    query.push({ name: "limit", value: 10 });
    query.push({ name: "searchTerm", value: searchText });

    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts(query);
      setProductData(allProducts);
      setLoading(false);
    };

    if (searchText) {
      setLoading(true);
      fetchData();
    } else {
      setProductData(undefined);
    }
  }, [searchText]);

  const onSubmit = (data: FieldValues) => {};
  return (
    <div className="flex justify-center items-center my-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("search")}
          aria-label="Search"
          placeholder="Search Product..."
          size="lg"
          startContent={
            <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
          }
          type="text"
        />
      </form>
    </div>
  );
};

export default NavbarSearchForm;
