const verifyUser = async (req, _, next) => {
  req.user = {
    id: "NJ89C0DN898UC",
    org: "DKJNI9C0EI990900",
  };
  console.log({ body: req.body });
  if (req.body.org) {
    req.user.org = req.body.org;
  }

  next();
};

export default verifyUser;
