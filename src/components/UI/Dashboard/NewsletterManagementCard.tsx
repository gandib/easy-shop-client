"use client";

import { INewsletter } from "@/src/types";
import { Button } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useDeleteNewsletter } from "@/src/hooks/newsletter.hook";

const NewsletterManagementCard = ({
  newsletter,
}: {
  newsletter: INewsletter[];
}) => {
  const { mutate: deleteNewsletter } = useDeleteNewsletter();

  const handleDelete = (email: string) => {
    deleteNewsletter(email);
  };

  return (
    <div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {newsletter?.map((subscriber: INewsletter, index: number) => (
            <TableRow key={index}>
              <TableCell>{subscriber?.email}</TableCell>
              <TableCell>
                <Button
                  onPress={() => handleDelete(subscriber.email)}
                  type="submit"
                  color="danger"
                  // className="my-3  rounded-md bg-danger-500 font-semibold text-default"
                  size="sm"
                  variant="flat"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NewsletterManagementCard;
