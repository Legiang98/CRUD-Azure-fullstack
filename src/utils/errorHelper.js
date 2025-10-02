import message from "./messages/en.js";
import { StatusCodes } from "http-status-codes";

export function ErrorHelper(code, fallbackMessage) { // ← Changed parameter name
    let key = code;
    console.log("ErrorHelper key:", key);
    let errorMessage = message[key]; // ← Now this uses the imported message file
    
    if (!errorMessage) {
        errorMessage = fallbackMessage || message["5000"] || "Internal server error";
    }

    const error = new Error(errorMessage);
    error.code = key;
    error.detail = errorMessage; 
    
    console.log("ErrorHelper returning error:", error.code); // ← Fixed: error.code not error.key
    return error;
}