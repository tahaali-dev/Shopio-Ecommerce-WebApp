import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const salt = 10;
    const HashedPass = await bcrypt.hash(password, salt);
    return HashedPass;
  } catch (error) {
    console.log(error, "error in hash");
    return res.json({ error: error.message }, { status: 500 });
  }
};

export const ComparePass = async (password, HashedPass) => {
  return bcrypt.compare(password, HashedPass);
};
