"use client";

import { IUser } from "@/src/types";
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
import ESForm from "../form/ESForm";
import ESSelect from "../form/ESSelect";
import { FieldValues } from "react-hook-form";
import { useUpdateUserStatus } from "@/src/hooks/user.hook";

const UserManagementCard = ({ users }: { users: IUser[] }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { mutate: updateStatus } = useUpdateUserStatus();

  const onSubmit = (data: FieldValues) => {
    const statusData = {
      id,
      status: data.status,
    };

    updateStatus(statusData);
    setOpen(true);
  };

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map((user: IUser) => (
            <TableRow key={user?.id}>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.status}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
                <Popover
                  showArrow
                  offset={10}
                  onOpenChange={() => setOpen(false)}
                  placement="bottom"
                >
                  <PopoverTrigger>
                    <Button color="primary">Change Status</Button>
                  </PopoverTrigger>
                  {!open && (
                    <PopoverContent className="w-[240px]">
                      {(titleProps) => (
                        <div className="px-1 py-2 w-full">
                          <p
                            className="text-small font-bold text-foreground"
                            {...titleProps}
                          >
                            User Status Change
                          </p>
                          <div className="mt-2 flex flex-col gap-2 w-full">
                            <ESForm
                              onSubmit={onSubmit}
                              //   resolver={zodResolver(registerValidationSchema)}
                            >
                              <div className="py-3">
                                <ESSelect
                                  name="status"
                                  label="Status"
                                  options={[
                                    { key: "ACTIVE", label: "ACTIVE" },
                                    { key: "SUSPENDED", label: "SUSPENDED" },
                                    { key: "DELETED", label: "DELETED" },
                                  ]}
                                  size="sm"
                                />
                              </div>
                              <Button
                                onPress={() => setId(user?.id)}
                                type="submit"
                                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                                size="lg"
                              >
                                Update
                              </Button>
                            </ESForm>
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  )}
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagementCard;
