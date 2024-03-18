// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51Ovca8SGodqakyTi9JzFMhC9igweF3M9FfiaOIkLuwHssaKWRnKgAAA8y6W4GKwB82AKKKaKalfbCGsBqAxB5Wxz00ber56Y3M"
);
const express = require("express");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  const price = await stripe.prices.create({
    currency: "usd",
    unit_amount: 1000,
    product_data: {
      name: "Gold Plan",
    },
  });

  console.log({ price });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: `https://example.com/success`,
    cancel_url: `https://google.com`,
  });

  res.redirect(303, session.url);
  //   return;
});

app.listen(4242, () => console.log("Running on port 4242"));
