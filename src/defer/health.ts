import { defer } from "@defer/client";

const health = async () => {
  const targets = [
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
  ];

  const action = async ({ name, host }: (typeof targets)[number]) => {
    const data = {
      name,
      ok: false,
    };

    try {
      console.time(name);
      data.ok = (await fetch(`https://${host}/health`)).ok;
      console.timeEnd(name);
    } catch (error) {}

    console.log(data);
  };

  await Promise.all(targets.map((target) => action(target)));
};

export default defer.cron(health, "*/10 * * * *");
