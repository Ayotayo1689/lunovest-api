const cron = require("node-cron")
const investmentController = require("../controllers/investmentController")

class CronService {
  static initializeCronJobs() {
    console.log("🕐 Initializing cron jobs...")

    // Daily profit calculation at 00:00 (midnight) every day
    cron.schedule(
      "0 0 * * *",
      async () => {
        console.log("🕐 Running daily profit calculation at:", new Date().toISOString())
        try {
          await investmentController.calculateDailyProfits()
          console.log("✅ Daily profit calculation completed successfully")
        } catch (error) {
          console.error("❌ Daily profit calculation failed:", error)
        }
      },
      {
        scheduled: true,
        timezone: "UTC", // You can change this to your preferred timezone
      },
    )

    console.log("✅ Cron jobs initialized successfully")
    console.log("📅 Daily profit calculation scheduled for 00:00 UTC every day")
  }
}

module.exports = CronService
