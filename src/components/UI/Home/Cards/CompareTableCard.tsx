import { IProduct } from "@/src/types";
import { averageRating } from "@/src/utils/averageRating";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Loading from "../../Shared/Loading";

const CompareTableCard = ({
  firstProduct,
  secondProduct,
  thirdProduct,
  loading,
}: {
  firstProduct?: IProduct;
  secondProduct?: IProduct;
  thirdProduct?: IProduct;
  loading: boolean;
}) => {
  return (
    <div className="relative">
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold z-10 rounded-lg transition-opacity duration-300">
          <Loading />
        </div>
      )}

      <Table isStriped aria-label="Product Comparison Table with Details">
        <TableHeader>
          <TableColumn>Brand</TableColumn>
          <TableColumn>{firstProduct?.shop?.name ?? "N/A"}</TableColumn>
          <TableColumn>{secondProduct?.shop?.name ?? "N/A"}</TableColumn>
          <TableColumn>{thirdProduct?.shop?.name ?? "N/A"}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Name</TableCell>
            <TableCell>{firstProduct?.name ?? "N/A"}</TableCell>
            <TableCell>{secondProduct?.name ?? "N/A"}</TableCell>
            <TableCell>{thirdProduct?.name ?? "N/A"}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Price</TableCell>
            <TableCell>{firstProduct?.price ?? "N/A"}</TableCell>
            <TableCell>{secondProduct?.price ?? "N/A"}</TableCell>
            <TableCell>{thirdProduct?.price ?? "N/A"}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Discount</TableCell>
            <TableCell>{firstProduct?.discount ?? "N/A"}</TableCell>
            <TableCell>{secondProduct?.discount ?? "N/A"}</TableCell>
            <TableCell>{thirdProduct?.discount ?? "N/A"}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Rating</TableCell>
            <TableCell>
              {(firstProduct &&
                `${Number(averageRating(firstProduct?.rating ?? [])).toFixed(1)}/5`) ||
                "N/A"}
            </TableCell>
            <TableCell>
              {(secondProduct &&
                `${Number(averageRating(secondProduct?.rating ?? [])).toFixed(1)}/5`) ||
                "N/A"}
            </TableCell>
            <TableCell>
              {(thirdProduct &&
                `${Number(averageRating(thirdProduct?.rating ?? [])).toFixed(1)}/5`) ||
                "N/A"}
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Description</TableCell>
            <TableCell>{firstProduct?.description ?? "N/A"}</TableCell>
            <TableCell>{secondProduct?.description ?? "N/A"}</TableCell>
            <TableCell>{thirdProduct?.description ?? "N/A"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompareTableCard;
