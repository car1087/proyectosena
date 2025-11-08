document.addEventListener("DOMContentLoaded", () => {
  const idUnico = document.getElementById("idUnico").textContent.trim();
  const qrContainer = document.getElementById("qrContainer");

  new QRCode(qrContainer, {
    text: `https://pild.com/device/${idUnico}`,
    width: 160,
    height: 160,
    colorDark: "#000000",
    colorLight: "#ffffff",
  });

  document.getElementById("btnDescargar").addEventListener("click", () => {
    const qrImg = qrContainer.querySelector("img") || qrContainer.querySelector("canvas");
    if (qrImg) {
      const link = document.createElement("a");
      link.href = qrImg.src || qrImg.toDataURL("image/png");
      link.download = `${idUnico}_QR.png`;
      link.click();
    }
  });

  document.getElementById("btnEnviar").addEventListener("click", () => {
    const correo = document.getElementById("correo").value.trim();
    if (correo === "") {
      alert("Por favor, ingrese un correo electrónico.");
      return;
    }
    alert(`El código QR ha sido enviado a ${correo}`);
  });
});

