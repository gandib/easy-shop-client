"use client";
import { IProduct, queryParams } from "@/src/types";
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
import { getAllProducts } from "@/src/services/ProductService";
import { IMeta } from "../../Dashboard/VendorProductCard";
import { handleProductSelect } from "@/src/utils/handleProductSelect";
import { averageRating } from "@/src/utils/averageRating";

const CompareCard = ({
  products,
}: {
  products: { meta: IMeta; data: IProduct[] };
}) => {
  const [firstProductId, setFirstProductId] = useState({ id: "", catId: "" });
  const [secondProductId, setSecondProductId] = useState({ id: "", catId: "" });
  const [thirdProductId, setThirdProductId] = useState({ id: "", catId: "" });
  const [productData, setProductData] = useState(products);
  const [limit, setLimit] = useState(products?.meta?.total);

  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }

    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts(query);
      setProductData(allProducts);
    };
    fetchData();
  }, [limit]);

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
    if (firstProductId.id && !secondProduct?.id && !thirdProduct?.id) {
      return setFirstProductId({ id, catId });
    }
    handleProductSelect(id, catId, validateProductSelection, setFirstProductId);
  };

  const handleSecondSelect = (id: string, catId: string) =>
    handleProductSelect(
      id,
      catId,
      validateProductSelection,
      setSecondProductId
    );

  const handleThirdSelect = (id: string, catId: string) =>
    handleProductSelect(id, catId, validateProductSelection, setThirdProductId);

  const firstProduct = productData?.data?.find(
    (product) => product?.id === firstProductId?.id
  );
  const secondProduct = productData?.data?.find(
    (product) => product.id === secondProductId.id
  );
  const thirdProduct = productData?.data?.find(
    (product) => product.id === thirdProductId.id
  );

  const firstAverageRating = averageRating(firstProduct?.rating || []);
  const secondAverageRating = averageRating(secondProduct?.rating || []);
  const thirdAverageRating = averageRating(thirdProduct?.rating || []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Compare Products</h1>
      <div className="grid sm:grid-cols-3 mb-2">
        <div>
          <Select className="max-w-xs" label="Select Product">
            {productData?.data?.map((product: IProduct) => (
              <SelectItem
                onPress={() =>
                  handleFirstSelect(product?.id, product?.categoryId)
                }
                key={product?.id}
              >
                {product?.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Select className="max-w-xs" label="Select Product">
            {productData?.data?.map((product: IProduct) => (
              <SelectItem
                onPress={() =>
                  handleSecondSelect(product?.id, product?.categoryId)
                }
                key={product?.id}
              >
                {product?.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Select className="max-w-xs" label="Select Product">
            {productData?.data?.map((product: IProduct) => (
              <SelectItem
                onPress={() =>
                  handleThirdSelect(product?.id, product?.categoryId)
                }
                key={product?.id}
              >
                {product?.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Brand</TableColumn>
          <TableColumn>{firstProduct && firstProduct?.shop?.name}</TableColumn>
          <TableColumn>
            {secondProduct && secondProduct?.shop?.name}
          </TableColumn>
          <TableColumn>{thirdProduct && thirdProduct?.shop?.name}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Name</TableCell>
            <TableCell>{firstProduct && firstProduct?.name}</TableCell>
            <TableCell>{secondProduct && secondProduct?.name}</TableCell>
            <TableCell>{thirdProduct && thirdProduct?.name}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Price</TableCell>
            <TableCell>{firstProduct && firstProduct?.price}</TableCell>
            <TableCell>{secondProduct && secondProduct?.price}</TableCell>
            <TableCell>{thirdProduct && thirdProduct?.price}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Discount</TableCell>
            <TableCell>{firstProduct && firstProduct?.discount}</TableCell>
            <TableCell>{secondProduct && secondProduct?.discount}</TableCell>
            <TableCell>{thirdProduct && thirdProduct?.discount}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Rating</TableCell>
            <TableCell>{firstProduct && firstAverageRating}</TableCell>
            <TableCell>{secondProduct && secondAverageRating}</TableCell>
            <TableCell>{thirdProduct && thirdAverageRating}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Description</TableCell>
            <TableCell>{firstProduct && firstProduct?.description}</TableCell>
            <TableCell>{secondProduct && secondProduct?.description}</TableCell>
            <TableCell>{thirdProduct && thirdProduct?.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompareCard;
