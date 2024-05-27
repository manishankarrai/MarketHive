const { Admin } =  require('../../models/admin');
const { generateAdminToken }  =  require('../../services/jsonWebToken');

const register  = async(req , res)=> {
    const { adminname, email, password } = req.body;
    try {
      const admin = await Admin.create({ adminname, email, password });
      const token = generateAdminToken(admin);
      res.status(201).send({ error: 0  , data : token , message: 'register sucessfull' });
    } catch (error) {
      res.status(400).send({ message: error.message, error: 1, data: null });
    }
}

const login  = async(req , res)=> {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res.status(400).send({ message: 'Invalid email or password', error: 1, data: null });
      }
  
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid email or password', error: 1, data: null });
      }
  
      const token = generateAdminToken(admin);
      res.status(200).send({ error: 0  , data : token , message: 'login sucessfull' });
    } catch (error) {
      res.status(400).send({ message: error.message, error: 1, data: null });
    }
}





module.exports =  { login , register };