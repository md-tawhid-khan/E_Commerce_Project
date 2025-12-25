import "dotenv/config";

export default {
    secret : process.env.TOKEN_SECRET,
    stripe_secret:process.env.STRIPE_SECRET_KEY
}