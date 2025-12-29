# E-Commerce Backend

Node.js + Express backend for the E-Commerce project.  
Database: PostgreSQL with Prisma ORM.

---

## Tech Stack

- Node.js, Express
- Prisma ORM
- PostgreSQL (via Docker)
- ngrok for temporary public access

---

## Setup

1. Clone the repo:

```bash
git clone https://github.com/md-tawhid-khan/E_Commerce_Project
cd backend

2. Install dependencies :
npm install

3. Run Docker (Postgres + Backend):
docker-compose up -d --build

4. Expose backend via ngrok (optional for public access):

ngrok http 3001

5. Environment Variables :
 Create .env file in backend root :

DATABASE_URL=postgresql://username:password@localhost:5432/dbname
PORT=3001

TOKEN_SECRET = ****************************************

STRIPE_SECRET_KEY=sk_test_*********************************
STRIPE_WEBHOOK_SECRET= whsec_************************************

POSTGRES_USER=******
POSTGRES_PASSWORD=***********
POSTGRES_DB=**************

6.  Running Backend :

npm run dev


7.   API Documentation (Postman)

Due to Postman public documentation limitations, the API is documented
using a Postman Collection.

### How to Use
1. Open Postman
2. Click **Import**
3. Select `/docs/postman_collection.json`
4. All API endpoints with request/response examples will be available

### Coverage
- Authentication APIs
- User APIs
- Order APIs
- Payment APIs

8.  Payment Flow Documentation

### Stripe Payment Flow
The application uses **Stripe PaymentIntent** for secure online payments.

Client (Next.js)
   |
   | 1. Create Order
   v
Backend (Node.js / Express)
   |
   | 2. Create PaymentIntent (Stripe API)
   v
Stripe
   |
   | 3. Return client_secret
   v
Backend
   |
   | 4. Send client_secret to client
   v
Client
   |
   | 5. Confirm payment (Stripe.js)
   v
Stripe
   |
   | 6. Payment success / failure
   v
Backend (Webhook)
   |
   | 7. Verify event & update order status
   v
Database (Order = PAID)


9. Seed Database

To populate the database with an admin user and sample products:

```bash
npm run seed

Default Admin info 

Email: md.tawhid.khan1998@gmail.com
Password: admin1234

default User info

Email: userExample@gmail.com
Password: user1234


1. sample products


{
        name: "Mobile Model A",
        sku: "mobile100001",
        description: "This is a high-quality mobile device Model A",
        price: 21000,
        stock: 25,
        status: "ACTIVE",
      },
      {
        name: "Mobile Model B",
        sku: "mobile100002",
        description: "This is a high-quality mobile device Model B",
        price: 22000,
        stock: 30,
        status: "ACTIVE",
      },
       {
        name: "Mobile Model C",
        sku: "mobile100003",
        description: "This is a high-quality mobile device Model C",
        price: 25000,
        stock: 20,
        status: "ACTIVE",
      },
      {
        name: "Mobile Model D",
        sku: "mobile100004",
        description: "This is a high-quality mobile device Model D",
        price: 27000,
        stock: 15,
        status: "ACTIVE",
      },
   

10.  Payment Integrations

### Stripe
- Integration with Stripe PaymentIntent
- Supports test mode (live mode configurable with your Stripe keys)
- Webhook implemented to verify payment and update order status
- Use Stripe test cards to test payment flow

### bKash
- Not implemented in this project
- Payment flow can be added if required

### Webhooks
- Stripe webhook: updates order/payment status on successful payment
- bKash webhook: not implemented


### Unit Tests

- Jest used to test models (User, Product, Order,Payment)
- Run:
```bash
npm run test

API Tests

Authentication, Orders, Payments endpoints tested
Run automated tests:

Webhook Tests :

Stripe webhook tested using Stripe CLI test events
Handles payment success/failure

## 🌐 Frontend

The frontend is deployed on Vercel and can be accessed here:  
" https://ecommerceclient-rosy.vercel.app "


Author
Md. Touhed Sorker
