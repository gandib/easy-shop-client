import { handleReplaceCart } from "@/src/utils/handleReplaceCart";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const ShowPopup = ({
  setShowPopup,
  setWarning,
  warning,
}: {
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  setWarning: Dispatch<
    SetStateAction<{
      message: string;
      productId: string;
      shopId: string;
    } | null>
  >;
  warning: { productId: string; shopId: string; message: string } | null;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <p className="text-red-700 text-lg font-semibold text-center">
          The product belongs to a different shop. Do you want to replace the
          current cart with the new product?
        </p>
        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={() => {
              handleReplaceCart(warning);
              setShowPopup(false);
              setWarning(null);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast("Cart remains unchanged.");
              setWarning(null);
              setShowPopup(false);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPopup;
