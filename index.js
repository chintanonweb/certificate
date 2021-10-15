

console.log("Chintan Dhokai")
const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;

submitBtn.addEventListener("click", () => {
  const val = userName.value;
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});
const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("Certificate1.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);


  //get font
  const fontBytes = await fetch("KaushanScript-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );
  // Embed our custom font in the document
  const KaushanScript = await pdfDoc.embedFont(fontBytes);
  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const textSize = 54;
  const textWidth = KaushanScript.widthOfTextAtSize(name, textSize);
  const textHeight = KaushanScript.heightAtSize(textSize);

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: firstPage.getWidth() / 2 - textWidth / 2,
    y: firstPage.getHeight() / 2.05 - textHeight / 2,
    size: textSize,
    font: KaushanScript,
    color: rgb(0.83, 0.67, 0.31),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(pdfDataUri, name + "-Certificate.pdf")
};

