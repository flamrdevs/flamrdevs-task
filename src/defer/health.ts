import { defer } from "@defer/client";

const health = async () => {
  const now = Date.now();

  const DATA: {
    t: number;
    r: Record<string, [number, number]>;
  } = {
    t: now,
    r: {},
  };

  const action = async (name: string, host: string) => {
    let status: number = 500;

    try {
      status = (await fetch(`https://${host}/health`)).status;
    } catch (error) {
    } finally {
      const ms = Date.now() - now;
      DATA.r[name] = [status, ms];
      console.log(`[${name}] ${status} ${ms}`);
    }
  };

  await Promise.all([
    action("API", "flamrdevs.deno.dev"),
    action("Image", "flamrdevs.cyclic.app"),
    action("View", "view.flamrdevs.workers.dev"),
  ]);

  try {
    await fetch("https://status.flamrdevs.vercel.app/api/health", {
      method: "POST",
      body: JSON.stringify(DATA),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.error("[status] ok");
  } catch (error) {
    console.error("[status] failed");
  }
};

export default defer.cron(health, "*/15 * * * *");
