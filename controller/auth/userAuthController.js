const { User } =  require('../../models/user');
const { generateUserToken }  =  require('../../services/jsonWebToken');

const register  = async(req , res)=> {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({ username, email, password });
      const token = generateUserToken(user);
      res.status(201).send({ error: 0  , data : token , message: 'register sucessfull' });
    } catch (error) {
      res.status(400).send({ message: error.message, error: 1, data: null });
    }
}

const login  = async(req , res)=> {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send({ message: 'Invalid email or password', error: 1, data: null });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Invalid email or password', error: 1, data: null });
      }
  
      const token = generateUserToken(user);
      res.status(200).send({ error: 0  , data : token , message: 'login sucessfull' });
    } catch (error) {
      res.status(400).send({ message: error.message, error: 1, data: null });
    }
}





module.exports =  { login , register };