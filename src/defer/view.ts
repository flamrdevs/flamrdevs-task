import { defer } from "@defer/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly VIEW_SECRET: string;
    }
  }
}

const view = async () => {
  const slice = async (name: string) => {
    const body = new FormData();
    body.append("secret", process.env.VIEW_SECRET);
    try {
      await fetch(`https://view.flamrdevs.workers.dev/${name}/slice`, { method: "PUT", body });
      console.error(`[slice:${name}] ok`);
    } catch (error) {
      console.error(`[slice:${name}] failed`);
    }
  };

  await Promise.all([slice("github"), slice("gitlab")]);
};

export default defer.cron(view, "0 0 * * *");
