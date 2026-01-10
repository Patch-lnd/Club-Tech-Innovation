// We import jsonwebtoken to be able to verify the JWT token 
const jwt = require("jsonwebtoken");

/* 
    AUTHENTIFICATION MIDDLEWARE 
    This middleware will: 
    1. Check if a token exists in the cookies
    2. Verify the token 
    3. Extract user data from te token 
    4. Attach user data to req.user for further use in protected routes
    5. Allow access of everything is valid 
*/

exports.protect = (req, res, next) => {
    /* 
        STEP 1: Check if the token exists in cookies 

        Wwhen the user logs in, we store the JWT inside a cookie: 
        res.cooki("token", token, {...})

        That cookie becomes available in: 
        req.cookies 
    */
   const token = req.cookies.token; 

   // If there is NO token, the user is not authenticated
   if (!token){
    return res.redirect("/login");
   }
   /* 
    STEP 2: Verify the token 

    jwt.verify will: 
    - Check if the token is valid 
    - Check if it was signed with the correct secret key 
    - Decode the payload (id, role, etc)

    If the token is invalid or expired, it will throw an error 
   */
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    /* 
        STEP 3: Attach decoded data to the req.user 

        decoded data contains what we put in jwt.sing():
        { id: user.id,
         role: user.role,
         iat: ...,
         exp:...
        }
         We attach it to req.user so it can be used in controllers and views later 
    */ 
   req.user = decoded;
   /* 
    STEP 4: Allow the request to continue 
    next() tells Express: 
    "Everything is OK, go to the next midlleware or controller"
   */
  next();
  }catch (error){
    /* 
        If toekn is :
        - Invalid 
        - Expired
        - Modified
        jwt.verify will fail and we redirect to login 
    */
   console.log("JWT Error: ", error);
   return res.redirect("login");
  }
};
