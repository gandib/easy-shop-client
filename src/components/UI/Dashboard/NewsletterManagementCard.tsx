"use client";

import { INewsletter, IUser } from "@/src/types";
import { Button } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useState } from "react";
import ESForm from "../../form/ESForm";
import ESSelect from "../../form/ESSelect";
import { FieldValues } from "react-hook-form";
import { useUpdateUserStatus } from "@/src/hooks/user.hook";
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
      <Table aria-label="Example static collection table">
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
                  className="my-3  rounded-md bg-danger-500 font-semibold text-default"
                  size="sm"
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
