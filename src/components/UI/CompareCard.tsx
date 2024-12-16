"use client";
import { IProduct } from "@/src/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CompareCard = ({ products }: { products: { data: IProduct[] } }) => {
  const [firstProductId, setFirstProductId] = useState({ id: "", catId: "" });
  const [secondProductId, setSecondProductId] = useState({ id: "", catId: "" });
  const [thirdProductId, setThirdProductId] = useState({ id: "", catId: "" });

  const validateProductSelection = (catId: string) => {
    if (
      (firstProductId.catId && firstProductId.catId !== catId) ||
      (secondProductId.catId && secondProductId.catId !== catId) ||
      (thirdProductId.catId && thirdProductId.catId !== catId)
    ) {
      return false;
    }
    return true;
  };

  const handleFirstSelect = (id: string, catId: string) => {
    if (!validateProductSelection(catId)) {
      toast(
        "Product must be from the same category as other selected products"
      );
      return;
    }
    setFirstProductId({ id, catId });
  };

  const handleSecondSelect = (id: string, catId: string) => {
    if (!validateProductSelection(catId)) {
      toast(
        "Product must be from the same category as other selected products"
      );
      return;
    }
    setSecondProductId({ id, catId });
  };

  const handleThirdSelect = (id: string, catId: string) => {
    if (!validateProductSelection(catId)) {
      toast(
        "Product must be from the same category as other selected products"
      );
      return;
    }
    setThirdProductId({ id, catId });
  };

  const firstProduct = products?.data?.filter(
    (product) => product.id === firstProductId.id
  );
  const secondProduct = products?.data?.filter(
    (product) => product.id === secondProductId.id
  );
  const thirdProduct = products?.data?.filter(
    (product) => product.id === thirdProductId.id
  );

  const firstRating = firstProduct[0]?.rating || [];
  const firstAverageRating =
    firstRating.length > 0
      ? `${(
          firstRating.reduce((pre, next) => pre + next.rating, 0) /
          firstRating.length
        ).toFixed(1)}/5`
      : "0/5";

  const secondRating = secondProduct[0]?.rating || [];
  const secondAverageRating =
    secondRating.length > 0
      ? `${(
          secondRating.reduce((pre, next) => pre + next.rating, 0) /
          secondRating.length
        ).toFixed(1)}/5`
      : "0/5";

  const thirdRating = thirdProduct[0]?.rating || [];
  const thirdAverageRating =
    thirdRating.length > 0
      ? `${(
          thirdRating.reduce((pre, next) => pre + next.rating, 0) /
          thirdRating.length
        ).toFixed(1)}/5`
      : "0/5";

  return (
    <div>
      <div className="grid sm:grid-cols-3 mb-2">
        <div>
          <Select className="max-w-xs" label="Select Product">
            {products?.data?.map((product: IProduct) => (
              <SelectItem
                onClick={() =>
                  handleFirstSelect(product.id, product.categoryId)
                }
                key={product.id}
              >
                {product.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Select className="max-w-xs" label="Select Product">
            {products?.data?.map((product: IProduct) => (
              <SelectItem
                onClick={() =>
                  handleSecondSelect(product.id, product.categoryId)
                }
                key={product.id}
              >
                {product.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Select className="max-w-xs" label="Select Product">
            {products?.data?.map((product: IProduct) => (
              <SelectItem
                onClick={() =>
                  handleThirdSelect(product.id, product.categoryId)
                }
                key={product.id}
              >
                {product.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Brand</TableColumn>
          <TableColumn>{firstProduct[0]?.shop?.name}</TableColumn>
          <TableColumn>{secondProduct[0]?.shop?.name}</TableColumn>
          <TableColumn>{thirdProduct[0]?.shop?.name}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Name</TableCell>
            <TableCell>{firstProduct[0]?.name}</TableCell>
            <TableCell>{secondProduct[0]?.name}</TableCell>
            <TableCell>{thirdProduct[0]?.name}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Price</TableCell>
            <TableCell>{firstProduct[0]?.price}</TableCell>
            <TableCell>{secondProduct[0]?.price}</TableCell>
            <TableCell>{thirdProduct[0]?.price}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Discount</TableCell>
            <TableCell>{firstProduct[0]?.discount}</TableCell>
            <TableCell>{secondProduct[0]?.discount}</TableCell>
            <TableCell>{thirdProduct[0]?.discount}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Rating</TableCell>
            <TableCell>
              {firstProduct.length > 0 && firstAverageRating}
            </TableCell>
            <TableCell>
              {secondProduct.length > 0 && secondAverageRating}
            </TableCell>
            <TableCell>
              {thirdProduct.length > 0 && thirdAverageRating}
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Description</TableCell>
            <TableCell>{firstProduct[0]?.description}</TableCell>
            <TableCell>{secondProduct[0]?.description}</TableCell>
            <TableCell>{thirdProduct[0]?.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompareCard;
