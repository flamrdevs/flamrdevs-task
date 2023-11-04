import { defer } from "@defer/client";

const health = async () => {
  const targets = [
    {
      name: "API",
      base: "https://flamrdevs.deno.dev",
    },
    {
      name: "Image",
      base: "https://flamrdevs.cyclic.app",
    },
    {
      name: "View",
      base: "https://flamrdevs.workers.dev",
    },
  ];

  const action = async ({ name, base }: (typeof targets)[number]) => {
    const data = {
      name,
      ok: false,
    };

    try {
      console.time(name);
      data.ok = (await fetch(`${base}/health`)).ok;
      console.timeEnd(name);
    } catch (error) {}

    console.log(data);
  };

  await Promise.all(targets.map((target) => action(target)));
};

export default defer.cron(health, "*/10 * * * *");
