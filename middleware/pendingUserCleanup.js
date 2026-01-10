// This file is responsible for cleaning up pending users who have not verified their email within a certain timeframe.
// From the pending_user table at a fixed interval (e.g., every hour).
// FROM otp_codes (Login OTP)

// Why ? 
// - Email verification tokens expires after 15 minutes 
// - Exprired tokens must be removed so our server is not overloaded with unecessary data

module.exports = function startPendingUserCleanup(db) {
    // Cleanup interval : 1h 
    const CLEANUP_INTERVAL = 40*60*1000; // For Now, 20 mins  in milliseconds

    setInterval(()=>{
        console.log("⏳ Running DB cleanup for expired Auth user's token...");

       // SQL query to delete pending users whose email verification token has expired
        const cleanupQuery =`DELETE FROM pending_users WHERE token_expires_at < NOW()`;
        db.query(cleanupQuery, (err, result)=>{
            if(err){
                // Log the error without crashing the app
                console.error("❌ Error during pending user cleanup:", err);
                return;
            }
          
            if(result.affectedRows > 0){
                console.log(`✅ Cleanup success: ${result.affectedRows} expired pending users removed from the database.`);
            }else{
                console.log("✅ Cleanup executed: No expired pending users to clean up at this time.");
            }
        })

        // CLEANUP OTP CODES
        // Delete OTPs that are expired OR already used

        const otpCleanupQuery = `DELETE FROM otp_codes WHERE expires_at < NOW()`;
        db.query(otpCleanupQuery, (err, result)=>{
            if(err){
                console.log("❌ Error cleaning otp_codes:", err);
                return;
            }
            if(result.affectedRows > 0){
                console.log(  `✅ Cleanup Success: ${result.affectedRows} expired/used OTP codes removed.`)
            }else{
                console.log("✅ Cleanup executed: No expired or used OTP codes to clean up at this time.")
            }
        })

    }, CLEANUP_INTERVAL)
}
