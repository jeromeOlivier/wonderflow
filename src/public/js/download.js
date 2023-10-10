document.querySelector("#download").addEventListener("click", function() {
        const link = document.createElement("a");
        link.href = "../pdf/WonderflowPrésentation.pdf";
        link.download = "WonderflowPrésentation.pdf";
        link.style.display = "none";
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })