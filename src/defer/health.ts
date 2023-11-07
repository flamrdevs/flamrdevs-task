import { defer } from "@defer/client";

const health = async () => {
  const now = Date.now();

  const DATA: {
    time: number;
    items: [string, number, number][];
  } = {
    time: now,
    items: [],
  };

  const action = async (name: string, host: string) => {
    let status: number = 0;

    try {
      status = (await fetch(`https://${host}/health`)).status;
    } catch (error) {
    } finally {
      const ms = Date.now() - now;
      console.log(`[${name}] ${status} ${ms}`);
      DATA.items.push([name, status, ms]);
    }
  };

  await Promise.all(
    [
      {
        name: "API",
        host: "flamrdevs.deno.dev",
      },
      {
        name: "Image",
        host: "flamrdevs.cyclic.app",
      },
      {
        name: "View",
        host: "view.flamrdevs.workers.dev",
      },
    ].map(({ name, host }) => action(name, host))
  );

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
