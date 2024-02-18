import { loadStripe } from "@stripe/stripe-js";
export const makePayment = async (id) => {
  console.log("FFF");
  const stripe = await loadStripe(
    "pk_test_51Ol9JaSAxHusqFRuXAbIei3XN8zG5bc2kvNzScC3D5qoFRqnWBRh8vfaYsCjFzzMnurTl9m0vLAduIG3VTRcvrjl00R50ljJZ8"
  );

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let delId = "65d20160013ab03326fdc5aa";
  try {
    const response = await fetch(
      "http://localhost:3000/api/bookings/" + delId,
      requestOptions
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  } catch (err) {
    console.log(err);
  }
};
