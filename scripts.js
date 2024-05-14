document.addEventListener("DOMContentLoaded", function() {
    // Function to encode a letter to 6-bit binary based on its position in the alphabet
    function letterToBinary(letter) {
        return (letter.charCodeAt(0) - 65).toString(2).padStart(5, "0");
    }

    // Function to convert a decimal number to 8-bit binary
    function decimalToBinary(number) {
        return parseInt(number).toString(2).padStart(8, "0");
    }
    function twinToBinary(number) {
        return parseInt(number).toString(2).padStart(2, "0");
    }
	// Function to convert binary string to base 32
    function binaryToBase32(binaryString) {
        const base32Table = "0123456789ABCEFGHJKLMNPQRSTVWXYZ";
        let base32Value = "";

        // Pad binary string with zeroes to ensure length is multiple of 5
        //binaryString = binaryString.padStart(Math.ceil(binaryString.length / 5) * 5, "0");

        for (let i = 0; i < binaryString.length; i += 5) {
            const chunk = binaryString.slice(i, i + 5);
            const decimalValue = parseInt(chunk, 2);
			const base32Digit = base32Table[decimalValue];
        	base32Value += base32Digit;
        }

        return base32Value;
    }
	// Function to decode base 32 string to binary
    function base32ToBinary(base32String) {
        const base32Table = "0123456789ABCEFGHJKLMNPQRSTVWXYZ";
        let binaryString = "";

        for (let i = 0; i < base32String.length; i++) {
            const base32Digit = base32String[i];
            const decimalValue = base32Table.indexOf(base32Digit);
            const binaryChunk = decimalValue.toString(2).padStart(5, "0");
            binaryString += binaryChunk;
        }

        return binaryString;
    }
    // Event listener for the button click
    document.querySelector('[bencode]').addEventListener("click", function() {
        // Get the input values
        var calfId = document.getElementById("calf_id").value;
        var calfYearLetter = document.getElementById("calf_yr").value.toUpperCase();
        var calfTwin = document.getElementById("calf_twin").value;
        var cowId = document.getElementById("cow_id").value;
        var cowYearLetter = document.getElementById("cow_yr").value.toUpperCase();
        var cowTwin = document.getElementById("cow_twin").value;

        // Convert values to binary
        var calfIdBinary = decimalToBinary(calfId);
        var calfYearBinary = letterToBinary(calfYearLetter);
        var calfTwinBinary = twinToBinary(calfTwin);
        var cowIdBinary = decimalToBinary(cowId);
        var cowYearBinary = letterToBinary(cowYearLetter);
        var cowTwinBinary = twinToBinary(cowTwin);

		var binstring = calfIdBinary + calfYearBinary + calfTwinBinary + cowIdBinary + cowYearBinary + cowTwinBinary;

		var base32Value = binaryToBase32(binstring)

        // Display the encoded values in the output section
        var encodedValues = "Encoded Tag:<br>" + base32Value + "<br>";

        document.getElementById("encoded_values").innerHTML = encodedValues;
    });
    // Event listener for the button click
    document.querySelector('[bdecode]').addEventListener("click", function() {
		// Get the input base 32 value
        const base32Value = document.getElementById("tag_code").value.toUpperCase();

        // Convert base 32 value to binary
        const binaryString = base32ToBinary(base32Value);

        // Split binary string into fields
        const calfIdBinary = binaryString.slice(0, 8);
        const calfYearBinary = binaryString.slice(8, 13);
        const calfTwinBinary = binaryString.slice(13, 15);
        const cowIdBinary = binaryString.slice(15, 23);
        const cowYearBinary = binaryString.slice(23, 28);
        const cowTwinBinary = binaryString.slice(28, 30);

        // Convert binary fields to decimal or letter
        const calfId = parseInt(calfIdBinary, 2);
        const calfYearLetter = String.fromCharCode(parseInt(calfYearBinary, 2) + 65);
        const calfTwin = parseInt(calfTwinBinary, 2);
        const cowId = parseInt(cowIdBinary, 2);
        const cowYearLetter = String.fromCharCode(parseInt(cowYearBinary, 2) + 65);
        const cowTwin = parseInt(cowTwinBinary, 2);
        
		var decodedValues = "Calf Info:<br>";
		decodedValues += "Calf ID: " + calfId + ", ";
		decodedValues += "Calf Year: " + calfYearLetter + ", ";
		decodedValues += "Calf Twin ID:" + calfTwin + "<br>";
		decodedValues += "Cow Info:<br>";
		decodedValues += "Cow ID: " + cowId + ", ";
		decodedValues += "Cow Year: " + cowYearLetter + ", ";
		decodedValues += "Cow Twin ID:" + cowTwin + "<br>";

        document.getElementById("decoded_values").innerHTML = decodedValues;

    });

});

