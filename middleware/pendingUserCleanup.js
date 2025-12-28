// This file is responsible for cleaning up pending users who have not verified their email within a certain timeframe.
// Fron the pending_user table at a fixed interval (e.g., every hour).

// Why ? 
// - Email verification tokens expires after 15 minutes 
// - Exprired tokens must be removed so our server is not overloaded with unecessary data

module.exports = function startPendingUserCleanup(db) {
    // Cleanup interval : 1h 
    const CLEANUP_INTERVAL = 60*60*1000; // 1h in milliseconds

    setInterval(()=>{
        console.log("⏳ Running DB cleanup for expired pending users...");

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
    }, CLEANUP_INTERVAL)
}
