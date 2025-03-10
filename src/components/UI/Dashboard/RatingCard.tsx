"use client";
import { IRating } from "@/src/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const RatingCard = ({ ratings }: { ratings: IRating[] }) => {
  return (
    <div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>PRODUCT NAME</TableColumn>
          <TableColumn>USER NAME</TableColumn>
          <TableColumn>RATING</TableColumn>
        </TableHeader>
        <TableBody>
          {ratings?.map((rating: IRating) => (
            <TableRow key={rating?.id}>
              <TableCell>{rating?.product?.name}</TableCell>
              <TableCell>{rating?.user?.name}</TableCell>
              <TableCell>{rating?.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RatingCard;
