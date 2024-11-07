if (navigator.serviceWorker) {
  window.addEventListener("load", async () => {
    // register service workder
    navigator.serviceWorker
      .register("./service-woker.js")
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("service worker error", error));
  });
}
