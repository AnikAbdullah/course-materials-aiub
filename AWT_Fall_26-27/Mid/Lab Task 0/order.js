function processOrder() {
  return new Promise((resolve, reject) => {
    console.log("Processing order... ");

    setTimeout(() => {
      const success = true;

      if (success) {
        resolve({
          orderid: "22-42028-2",
          customer: "Anik",
          item: "chicken burger",
          quantity: 1,
          total: 349,
        });
      } else {
        reject("Failed to process the order!");
      }
    }, 3000);
  });
}

processOrder()
  .then((order) => {
    console.log("Order details: ");
    console.log("ID       : ", order.orderid);
    console.log("Name     : ", order.customer);
    console.log("Item     : ", order.item);
    console.log("Quantity : ", order.quantity);
    console.log("Total    : ", order.total);
  })
  .catch((error) => {
    console.log("error", error);
  })

  .finally(() => {
    console.log("Order process completed");
  });
