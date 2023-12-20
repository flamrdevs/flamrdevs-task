import { defer } from "@defer/client";

const status = async () => {
  try {
    await fetch("https://status.flamrdevs.vercel.app/api/health", {
      method: "PUT",
    });
    console.error("[status] ok");
  } catch (error) {
    console.error("[status] failed");
  }
};

export default defer.cron(status, "0 0 * * *");
