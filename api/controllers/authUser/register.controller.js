import User from "../../model/user.model.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
  const {name, email, password, phone} = req.body;

  if(name && email && password && phone){
      User.findByEmail(email, (err, user) => {
          if(err || user){
             return res.status(409).json(email + " đã tồn tại");
          }
      })

      bcrypt.hash(password, 10).then((hashedPassword) => {
          const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
              phone: phone
          })

          User.create(user, (err, user) => {
              if(!err ){
                  console.log(user);
                  res.status(200).json(user);
              }
          })
      })
  }else{
    res.status(409).json("Các trường không để rỗng!");
  }
  
};
