const router = require("express").Router()
const pool = require("../db/index")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../jwt/jJwtGenerator")
const validInfo = require("../middleware/validInfo")
const  authorization = require("../middleware/authorization")
const app = require("../crud")

router.post("/register", validInfo, async (req, res) => {
    try {
        //1.destructure req.body
        const {name, email, password} = req.body
        //2.check if user exist 
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        if (user.rows.length) {
            return res.status(401).send("user already exist")
            console.log("registerif");
        }
        //.3 bcrypt the user password
        const salt = await bcrypt.genSalt(10)
        const bcryptPassword = await bcrypt.hash(password, salt)
        //4. enter the new user inside our db
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        )
        //5.generating jwt token
        const token = jwtGenerator(newUser.rows[0].user_id)
        console.log("register");
        const response = res.send({token})
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
)

router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure body
        const {email, password} = req.body
        //2. check if user exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        if (!user.rows.length) {return res.status(401).send("user doesnt exist")}
        //3. check password if same as db
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
        if (!validPassword) {return res.status(401).json("password is incorrect")}
        //4. give jwt token
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
})


router.get("/is-verify", authorization,  async (req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.log(error)
        res.status(500).send("not authorized")
    }
})



module.exports = router