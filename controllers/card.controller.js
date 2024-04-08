const Stripe_Key = "sk_test_51IbKw1SDT8qHV0VCRdJ8lvnMZfvw5xYUxspmshCETvUIbtGKFFAtVb7Yu5NNKLdstRKN7pUkoRLYkZeV2mJjMsTp00i5kLkD1i";
const stripe = require("stripe")(Stripe_Key);
const { UserRegister } = require("../model");

exports.CreateCard = async (req, res) => {
    console.log("\n\n Body Passed:", req.body);
    try {
      const customer = await stripe.customers.create(
        {
          email: req.body.email,
        }
        // {
        //   // If you are using your own api then you can add your organization account here. So it will link the customer with your organization
        //   stripeAccount: process.env.StripeAccountId,
        //}
      );
      return res.status(200).send({
        //   customerDetails: customer,
        customerId: customer.id,
        customerEmail: customer.email,
      });
    } catch (error) {
      return res.status(400).send({ error:error});
    }
  };

exports.newCardCreate = async (req, res) => {
  console.log("\n\n Body Passed:", req.body);
  const {
    cardNumber,
    cardExpMonth,
    cardExpYear,
    cardCVC,
    cardName,
    country,
    postal_code,
    customerId
  } = req.body;

  if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
    return res.status(400).send({
      Error: "Please Provide All Necessary Details to save the card",
    });
  }
  try {
    const customer = await stripe.customers.create(
      {
        email: req.body.email
      }
      // {
      //   // If you are using your own api then you can add your organization account here. So it will link the customer with your organization
      //   stripeAccount: process.env.StripeAccountId,
      //}
    );    
    req.body.userId = customer.id; 
    const cardToken = await stripe.tokens.create({
      card: {
        name: cardName,
        number: cardNumber,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        cvc: cardCVC,
        address_country: country,
        address_zip: postal_code,
      },
      // customer: customer.stripe_id,
      // stripe_account: StripeAccountId,
    });
    const card = await stripe.customers.createSource(customer.id, {
      source: `${cardToken.id}`,
    });
    console.log(card)

      return res.status(200).send({
      card: card.id,
      message:"card created succesfully",
      });
  
  } catch (error) {
    return res.send(error)
  }
  };
// Get List of all saved card of the customers
exports.getAllCardDetail=async (req, res) => {
    let cards = [];
    try {
      const savedCards = await stripe.customers.listSources(req.body.userId, {
        object: "card",
      });
      const cardDetails = Object.values(savedCards.data);
  
      cardDetails.forEach((cardData) => {
        let obj = {
          cardId: cardData.id,
          cardType: cardData.brand,
          cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
          cardLast4: cardData.last4,
        };
        cards.push(obj);
      });
      return res.status(200).send({
        cardDetails: cards,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  };

exports.updateCardDetail = async (req, res) => {
    const { cardName, cardExpMonth, cardExpYear, cardId } = req.body;
  
    if (!cardId) {
      return res.status(400).send({
        Error: "CardID is Required to update",
      });
    }
    try {
      const card = await stripe.customers.updateSource(customerId, cardId, {
        name: cardName,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        feedback: cardFeedback,
      });
      return res.status(200).send({
        updatedCard: card,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  };
  // Delete a saved card of the customer
exports.deleteCardDetail = async (req, res) => {
    console.log("\n\n Body Passed:", req.body);
    const { cardId } = req.body;
    if (!cardId) {
      return res.status(400).send({
        Error: "CardId is required to delete Card",
      });
    }
    try {
      const deleteCard = await stripe.customers.deleteSource(customerId, cardId);
      return res.status(200).send(deleteCard);
    } catch (error) {
      return res.status(400).send(error)

    }
  };
  
  // Create a payment charge
exports.createPayment = async (req, res) => {
    console.log("\n\n Body Passed:", req.body);
    const { amount, cardId, oneTime, email } = req.body;
    if (oneTime) {
      const {
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCVC,
        country,
        postalCode,
      } = req.body;
  
      if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
        return res.status(400).send({
          Error: "Necessary Card Details are required for One Time Payment",
        });
      }
      try {
        const cardToken = await stripe.tokens.create({
          card: {
            number: cardNumber,
            exp_month: cardExpMonth,
            exp_year: cardExpYear,
            cvc: cardCVC,
            address_state: country,
            address_zip: postalCode,
          },
        });
        console.log(cardToken);
        const charge = await stripe.charges.create({
          amount: req.body.amount,
          currency: "inr",
          source: cardToken.id,
        //   receipt_email: email,
          description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
            
          
        });
  
        if (charge.status === "succeeded") {
          return res.status(200).send({ Success: charge });
        } else {
          return res
            .status(400)
            .send({ Error: "Please try again later for One Time Payment" });
        }
      } catch (error) {
        return res.status(400).send({
          error:error
        });
      }
    } else {
      try {
        const createCharge = await stripe.charges.create({
          amount: amount,
          currency: "usd",
          receipt_email: email,
          customer: customerId,
          card: cardId,
          description: `Stripe Charge Of Amount ${amount} for Payment`,
        });
        console.log("\n\n Start 2");
        if (createCharge.status === "succeeded") {
          return res.status(200).send({ Success: createCharge });
        } else {
          return res
            .status(400)
            .send({ Error: "Please try again later for payment" });
        }
      } catch (error) {
        return res.status(400).send({
          error: error,
        });
      }
    }
  };
  

  