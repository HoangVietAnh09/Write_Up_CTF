Java.perform(function() {
    var MainActivity = Java.use("com.nahamcon2023.fortuneteller.MainActivity");
    MainActivity.setCorrectString.overload('java.lang.String').implementation = function(str) {
        console.log("setCorrectString called with: " + str);
        this.setCorrectString(str);
    }
    
});
