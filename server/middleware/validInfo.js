module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
    console.log("validinfo");
    console.log(req.path);
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      if (![email, name, password].every(Boolean)) {
        console.log("validinfoifregistercredential");
      } else if (!validEmail(email)) {
        console.log("validinfoifregisteremail");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }
  
    next();
  };