let accounts = require("../../accounts");
const Account = require("../db/models/Account");

exports.accountCreate = (req, res) => {

  try{
    const foundAccount = await Account.create({ ...req.body, funds: 0 });
    res.status(201).json(foundAccount);
  }catch(error){
    res.status(500).json({ message: error });
  }
};

exports.accountDelete = (req, res) => {
  const { accountId } = req.params;
try{
  const foundAccount = await Account.findById(accountId);
  if(foundAccount){
    await foundAccount.remove();
    res.status(204).end();
  }else{
    res.status(404).json({ message: "Account not found" });

  }
  
}catch(error){
  res.status(500).json({ message: error });

}
};

exports.accountUpdate = (req, res) => {
  const { accountId } = req.params;
try{
  const foundAccount= await Account.findById(accountId);
  if(foundAccount){
    await Account.findByIdAndUpdate(accountId, req.body, {new:true});
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }

}catch(error){
  res.status(500).json({ message: error });

}
};

exports.accountsGet = async (req, res) => {
  try {
    const account = await Account.find({}, "-createdAt -updatedAt");
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};

exports.getVipAccounts = async (req, res) => {
  const { amount } = req.params;
  try {
    const vipAccounts = await Account.find({ funds: { $gt: amount } }).exec();
    res.json(vipAccounts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
