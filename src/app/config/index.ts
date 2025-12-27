import "dotenv/config";

export default {
    secret : process.env.TOKEN_SECRET,
    stripe_secret:process.env.STRIPE_SECRET_KEY,
    stripe_webhooks_secret:process.env.STRIPE_WEBHOOK_SECRET
}