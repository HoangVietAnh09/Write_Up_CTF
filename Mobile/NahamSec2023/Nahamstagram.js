Java.perform(function(){
    var Shared = Java.use("com.nahamcon2023.nahamstagram.Shared");
    console.log(Shared.firebase.value);
    console.log(Shared.firebase.value.uids.value);

    var Firebase = Java.use("com.nahamcon2023.nahamstagram.Firebase");
    Firebase.getDBValues.overload("java.lang.String", "java.util.HashMap", "kotlin.jvm.functions.Function1").implementation = function(path, draftList, callback) {
        path = "3977zevTdcQLu9nPV2LZY7sAWzF3/drafts";
        this.getDBValues(path, draftList, callback);
        
    }


})
