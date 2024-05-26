const { Seller } =  require('../../models/seller');
const { generateSellerToken }  =  require('../../services/jsonWebToken');

const register  = async(req , res)=> {
    const { sellername, email, password } = req.body;
    try {
      const seller = await Seller.create({ sellername, email, password });
      const token = generateSellerToken(seller);
      res.status(201).send({ error: 0  , data : token , message: 'register sucessfull' });
    } catch (error) {
      res.status(400).send({ message: error.message, error: 1, data: null });
    }
}

const login  = async(req , res)=> {
    const { email, password } = req.body;

    try {
      const seller = await Seller.findOne({ where: { email } });
      if (!seller) {
        return res.status(400).send({ message: 'Invalid email or password', error: 1, data: null });
      }
  
      const isMatch = await seller.comparePassword(password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid email or password', error: 1, data: null });
      }
  
      const token = generateSellerToken(seller);
      res.status(200).send({ error: 0  , data : token , message: 'login sucessfull' });
    } catch (error) {
      res.status(400).send({ message: error.message, error: 1, data: null });
    }
}





module.exports =  { login , register };