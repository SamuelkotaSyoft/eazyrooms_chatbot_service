import { Response404 } from "./error-reponse.js";

const validator = (allowedArgs) => {
  return (req, res, next) => {
    console.log(req.body);

    // Get the keys of the request body
    const requestKeys = Object.keys(req.body);

    // Filter out any keys that are not in the allowed arguments list
    const unwantedKeys = requestKeys.filter(
      (key) => !allowedArgs.includes(key)
    );

    // Delete the unwanted keys from the request body
    unwantedKeys.forEach((key) => {
      delete req.body[key];
    });

    // Check if all the required arguments are present
    const missingArgs = allowedArgs.filter((arg) => !requestKeys.includes(arg));

    if (missingArgs.length > 0) {
      return Response404(
        res,
        `Missing required arguments: ${missingArgs.join(", ")}`
      );
    }

    next();
  };
};

export default validator;
