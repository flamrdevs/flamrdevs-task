import { defer } from "@defer/client";

const health = async () => {
  const action = async (name: string, host: string) => {
    let status: number = 0;

    const now = Date.now();

    try {
      status = (await fetch(`https://${host}/health`)).status;
    } catch (error) {
    } finally {
      console.log(`[${name}] ${status} ${Date.now() - now}`);
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
};

export default defer.cron(health, "*/15 * * * *");
