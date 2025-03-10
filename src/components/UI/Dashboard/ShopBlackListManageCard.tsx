"use client";

import { IShop } from "@/src/types";
import { Button, Chip } from "@nextui-org/react";
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
import { useUpdateShopBlackList } from "@/src/hooks/shop.hook";

const ShopBlackListManageCard = ({ shops }: { shops: IShop[] }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { mutate: updateBlackListStatus } = useUpdateShopBlackList();

  const onSubmit = (data: FieldValues) => {
    const statusData = {
      id,
      data: {
        isBlackListed: data.isBlackListed === "true" ? true : false,
      },
    };

    updateBlackListStatus(statusData);
    setOpen(true);
  };

  type BlacklistStatus = "false" | "true";

  const statusColorMap: Record<BlacklistStatus, any> = {
    false: "success",
    true: "danger",
  };
  return (
    <div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>Vendor Name</TableColumn>
          <TableColumn>ISBLACKLISTED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {shops?.map((shop: IShop) => (
            <TableRow key={shop?.id}>
              <TableCell>{shop?.name}</TableCell>
              <TableCell>{shop?.vendor?.name}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize border-none gap-1 text-default-600"
                  color={
                    statusColorMap[
                      shop?.isBlackListed === false
                        ? "false"
                        : ("true" as BlacklistStatus)
                    ]
                  }
                  size="sm"
                  variant="dot"
                >
                  {shop?.isBlackListed === false ? "false" : "true"}
                </Chip>
              </TableCell>
              <TableCell>
                <Popover
                  showArrow
                  offset={10}
                  onOpenChange={() => setOpen(false)}
                  placement="bottom"
                >
                  <PopoverTrigger>
                    <Button color="primary" size="sm" variant="flat">
                      Change Status
                    </Button>
                  </PopoverTrigger>
                  {!open && (
                    <PopoverContent className="w-[240px]">
                      {(titleProps) => (
                        <div className="px-1 py-2 w-full">
                          <p
                            className="text-small font-bold text-foreground"
                            {...titleProps}
                          >
                            Shop Restriction
                          </p>
                          <div className="mt-2 flex flex-col gap-2 w-full">
                            <ESForm
                              onSubmit={onSubmit}
                              //   resolver={zodResolver(registerValidationSchema)}
                            >
                              <div className="py-3">
                                <ESSelect
                                  name="isBlackListed"
                                  label="isBlackListed"
                                  options={[
                                    { key: "true", label: "TRUE" },
                                    { key: "false", label: "FALSE" },
                                  ]}
                                  size="sm"
                                />
                              </div>
                              <Button
                                onPress={() => setId(shop?.id)}
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

export default ShopBlackListManageCard;
