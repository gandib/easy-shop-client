import { z } from "zod";

const createShopValidationSchema = z.object({
  name: z.string({ required_error: "Please enter a name!" }).trim(),
  description: z.string({ required_error: "Please enter a description!" }),
  image: z.string({ required_error: "Please choose an image!" }),
});

export default createShopValidationSchema;
