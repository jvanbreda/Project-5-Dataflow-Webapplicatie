// Defineert de 'Pdf klasse'
var PdfGenerator = {
    // @reportName string "De naam van het rapport."
    // @renderElements string[] "Array van de element namen die gegenereerd moeten worden."
    // Method binnen de 'Pdf klasse', neemt een string als naam voor het rapport en de id namen van html elementen die gegenereerd moeten worden.
    // Genereert een pdf rapport van html met een naam.
    GenerateFromHtml: function (reportName, renderElements) {

        // jsPDF gebruikt zo genaamde 'data urls' voor images. Deze zijn te maken op: "http://dataurl.net/#dataurlmaker".
        var logoImgData = 'data:image/png;base64,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';

        // Instantieerd een nieuw 'Date' object, deze bevat de datum van het punt dat het geïnstantieerd word.
        var date = new Date();

        // Maakt een nieuw pdf document aan.
        // De 'p' staat voor portrait en geeft aan dat dit de oriëntatie is van het document.
        // De 'mm' staat voor millimeter, dit geeft aan dat de opgegeven maten in millimeters zijn.
        // 'A4' staat voor een grootte, namelijk A4. Het pdf document is een A4.
        var pdfDocument = new jsPDF('p', 'mm', 'a4'); //a4 210 x 297 mm

        // Hoort het lettertype te veranderen, maar dit doet het niet >:(
        //pdfDocument.setFont('helvetica', 'normal');

        // Zet de vul kleur van getekende vormen naar een RoodGroenBlauw kleur, in dit geval staat (0, 191, 255) voor lucht blauw.
        pdfDocument.setFillColor(0, 191, 255);

        // Print een vierkant vanuit punt (2mm,0mm) met een breedte van 5mm en een lengte van 297mm.
        // De 'F' staat voor "filled", dit betekend dat het vierkant gevult is met een kleur en geen omtrek heeft.
        pdfDocument.rect(2, 0, 5, 297, 'F');
        pdfDocument.rect(8, 0, 2, 297, 'F');

        // Voegt een afbeelding toe aan het document met het imgdataurl gegenereerd op: "http://dataurl.net/#dataurlmaker".
        pdfDocument.addImage(logoImgData, 'PNG', 130, 15, 65, 12);

        // Veranderd de letter grootte naar 36px.
        pdfDocument.setFontSize(36);
        // Tekent de rapport naam in de vorm van tekst op 30mm vanaf links en 102mm vanaf de top, de twee getallen kunnen dus gezien worden als de margin left en top.
        pdfDocument.text(30, 102, reportName);
        pdfDocument.setFontSize(12);
        pdfDocument.text(30, 112, date.toLocaleDateString());
        pdfDocument.text(30, 117, date.toLocaleTimeString());
        // De "concat" methode voegt 2 strings samen tot 1.
        pdfDocument.text(185, 290, "Pages: ".concat(renderElements.length));

        for (i = 0; i < renderElements.length; i++) {
            // Voegt een extra pagina toe aan het pdf document.
            pdfDocument.addPage();
            // Maakt pdf elementen van html elementen, 15mm left margin, 15mm top margin.
            // Heeft als 'options' de width ingesteld op 170mm, dit betekend dat tekst maar tot 15+170=185mm gaat.
            pdfDocument.fromHTML($('#'.concat(renderElements[i])).get(0), 15, 15, {
                'width': 170
            });
            pdfDocument.text(195, 290, (i + 1).toString());
        }

        // Slaat het pdf document op en download het.
        // De "concat" methode voegt 2 strings samen tot 1.
        pdfDocument.save(reportName.concat(".pdf"));
    },

    GenerateFromHtmlFancy: function (reportName, renderElements) {
        // jsPDF gebruikt zo genaamde 'data urls' voor images. Deze zijn te maken op: "http://dataurl.net/#dataurlmaker".
        var logoImgData = 'data:image/png;base64,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';

        // Instantieerd een nieuw 'Date' object, deze bevat de datum van het punt dat het geïnstantieerd word.
        var date = new Date();

        // Maakt een nieuw pdf document aan.
        // De 'p' staat voor portrait en geeft aan dat dit de oriëntatie is van het document.
        // De 'mm' staat voor millimeter, dit geeft aan dat de opgegeven maten in millimeters zijn.
        // 'A4' staat voor een grootte, namelijk A4. Het pdf document is een A4.
        var pdfDocument = new jsPDF('p', 'mm', 'a4'); //a4 210 x 297 mm

        // Hoort het lettertype te veranderen, maar dit doet het niet >:(
        //pdfDocument.setFont('helvetica', 'normal');

        // Zet de vul kleur van getekende vormen naar een RoodGroenBlauw kleur, in dit geval staat (0, 191, 255) voor lucht blauw.
        pdfDocument.setFillColor(0, 191, 255);

        // Print een vierkant vanuit punt (2mm,0mm) met een breedte van 5mm en een lengte van 297mm.
        // De 'F' staat voor "filled", dit betekend dat het vierkant gevult is met een kleur en geen omtrek heeft.
        pdfDocument.rect(2, 0, 5, 297, 'F');
        pdfDocument.rect(8, 0, 2, 297, 'F');

        // Voegt een afbeelding toe aan het document met het imgdataurl gegenereerd op: "http://dataurl.net/#dataurlmaker".
        pdfDocument.addImage(logoImgData, 'PNG', 130, 15, 65, 12);

        // Veranderd de letter grootte naar 36px.
        pdfDocument.setFontSize(36);
        // Tekent de rapport naam in de vorm van tekst op 30mm vanaf links en 102mm vanaf de top, de twee getallen kunnen dus gezien worden als de margin left en top.
        pdfDocument.text(30, 102, reportName);
        pdfDocument.setFontSize(12);
        pdfDocument.text(30, 112, date.toLocaleDateString());
        pdfDocument.text(30, 117, date.toLocaleTimeString());
        // De "concat" methode voegt 2 strings samen tot 1.
        pdfDocument.text(185, 290, "Pages: ".concat(renderElements.length));
        //var i = 0;
        function recursiveAddHtml(i) {
            // Voegt een extra pagina toe aan het pdf document.
            pdfDocument.addPage();
            // Maakt van het opgegeven html element een canvas, dit canvas wordt in het pdf gezet. Dit zorgt ervoor dat grafieken en afbeeldingen mee genomen worden.
            // 15mm left margin, 15mm top margin.
            pdfDocument.addHTML($('#'.concat(renderElements[i]))[0], 15, 15, {
                //'width': 482,
                pagesplit: true
            },
            // De callback van de "addHTML" methode, deze wordt pas aangeroepen zodra het canvas gerendered en in de pdf is gezet.
            function () {
                pdfDocument.text(195, 290, (i + 1).toString());

                if (i < renderElements.length - 1) {
                    //i++;
                    recursiveAddHtml(i + 1);
                }  // Als elk element in het pdf staat wordt het pdf document opgeslagen.
                else {
                    // Slaat het pdf document op en download het.
                    // De "concat" methode voegt 2 strings samen tot 1.
                    pdfDocument.save(reportName.concat(".pdf"));
                }
            });
        }

        recursiveAddHtml(0);
    }
}