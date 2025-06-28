const cron = require("node-cron");
const investmentController = require("../controllers/investmentController");

class CronService {
  static initializeCronJobs() {
    console.log("🕐 Initializing cron jobs...");

    cron.schedule(
      "0 0 * * *",
      async () => {
        console.log(
          "🕐 Running profit calculation at:",
          new Date().toISOString()
        );
        try {
          await investmentController.calculateDailyProfits();
          console.log("✅ Profit calculation completed successfully");
        } catch (error) {
          console.error("❌ Profit calculation failed:", error);
        }
      },
      {
        scheduled: true,
        timezone: "UTC",
      }
    );

    // Health check ping every 2 minutes to keep app awake
    cron.schedule(
      "*/2 * * * *", // Every 2 minutes
      async () => {
        console.log(
          "🏥 Running health check ping at:",
          new Date().toISOString()
        );
        try {
          const baseUrl =
            process.env.APP_URL || "https://lunovest-api.onrender.com";
          const healthUrl = `${baseUrl}/health`;

          console.log(`📡 Pinging: ${healthUrl}`);

          const response = await fetch(healthUrl);
          const data = await response.json();

          if (response.ok) {
            console.log("✅ Health check successful:", data.message);
            console.log("⏰ Server timestamp:", data.timestamp);
          } else {
            console.error(
              "❌ Health check failed with status:",
              response.status
            );
          }
        } catch (error) {
          console.error("❌ Health check ping failed:", error.message);
        }
      },
      {
        scheduled: true,
        timezone: "UTC",
      }
    );

    console.log("✅ Cron jobs initialized successfully");
    console.log("📅 Profit calculation scheduled for daily at midnight UTC");
    console.log("🏥 Health check ping scheduled for every 2 minutes");
    console.log(
      "💡 Health check helps keep the app awake on free hosting tiers"
    );
  }
}
