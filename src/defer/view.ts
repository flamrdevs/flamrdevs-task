import { defer } from "@defer/client";

const view = async () => {
  const slice = async (name: string) => {
    try {
      await fetch(`https://view.flamrdevs.workers.dev/${name}/slice`, {
        method: "PUT",
        body: new FormData(),
      });
      console.error(`[slice:${name}] ok`);
    } catch (error) {
      console.error(`[slice:${name}] failed`);
    }
  };

  await Promise.all([slice("github"), slice("gitlab")]);
};

export default defer.cron(view, "0 0 * * *");
