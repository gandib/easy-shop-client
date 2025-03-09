import { toast } from "sonner";

export const handleProductSelect = (
  id: string,
  catId: string,
  validateProductSelection: (catId: string) => boolean,
  setProductId: React.Dispatch<
    React.SetStateAction<{ id: string; catId: string }>
  >
) => {
  if (!validateProductSelection(catId)) {
    toast("Product must be from the same category as other selected products");
    return;
  }
  setProductId({ id, catId });
};
