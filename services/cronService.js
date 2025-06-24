// const cron = require("node-cron")
// const investmentController = require("../controllers/investmentController")

// class CronService {
//   static initializeCronJobs() {
//     console.log("🕐 Initializing cron jobs...")

//     // Daily profit calculation at 00:00 (midnight) every day
//     cron.schedule(
//       "0 0 * * *",
//       async () => {
//         console.log("🕐 Running daily profit calculation at:", new Date().toISOString())
//         try {
//           await investmentController.calculateDailyProfits()
//           console.log("✅ Daily profit calculation completed successfully")
//         } catch (error) {
//           console.error("❌ Daily profit calculation failed:", error)
//         }
//       },
//       {
//         scheduled: true,
//         timezone: "UTC", // You can change this to your preferred timezone
//       },
//     )

//     console.log("✅ Cron jobs initialized successfully")
//     console.log("📅 Daily profit calculation scheduled for 00:00 UTC every day")
//   }
// }

// module.exports = CronService









// const cron = require("node-cron")
// const investmentController = require("../controllers/investmentController")

// class CronService {
//   static initializeCronJobs() {
//     console.log("🕐 Initializing cron jobs...")

//     // CHANGED: Daily profit calculation every 2 minutes for testing
//     // Format: "*/2 * * * *" means every 2 minutes
//     cron.schedule(
//       "0 0 * * *", // Every 2 minutes for testing
//       async () => {
//         console.log("🕐 Running profit calculation at:", new Date().toISOString())
//         try {
//           await investmentController.calculateDailyProfits()
//           console.log("✅ Profit calculation completed successfully")
//         } catch (error) {
//           console.error("❌ Profit calculation failed:", error)
//         }
//       },
//       {
//         scheduled: true,
//         timezone: "UTC",
//       },
//     )

//     console.log("✅ Cron jobs initialized successfully")
//     console.log("📅 Profit calculation scheduled for every 2 minutes (testing mode)")
//     console.log("💡 Change to '0 0 * * *' for daily production schedule")
//   }
// }

// module.exports = CronService




















const investmentController = require("../controllers/investmentController");

class CronService {
  static initializeCronJobs() {
    console.log("🕐 Initializing interval-based job (every 23h 59m)...");

    // 23 hours and 59 minutes in milliseconds
    // const intervalMs = (23 * 60 + 59) * 60 * 1000;

    const intervalMs =   2 * 60 * 1000

    setInterval(async () => {
      console.log("🕐 Running profit calculation at:", new Date().toISOString());
      try {
        await investmentController.calculateDailyProfits();
        console.log("✅ Profit calculation completed successfully");
      } catch (error) {
        console.error("❌ Profit calculation failed:", error);
      }
    }, intervalMs);

    console.log("✅ Interval-based job initialized successfully");
    console.log("⏱ Will run every 23 hours and 59 minutes");
  }
}

module.exports = CronService;

