import { Button } from "@fatherhood-companion/ui";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.kicker}>pnpm monorepo</p>
        <h1>Next.js in `apps/web`, Storybook in `packages/ui`.</h1>
        <p className={styles.copy}>
          The web app is already consuming the shared UI package, so you can
          build components once and test them in Storybook before shipping them
          in Next.js.
        </p>
        <div className={styles.actions}>
          <Button>Shared UI button</Button>
          <span className={styles.hint}>
            Start Storybook from `packages/ui`.
          </span>
        </div>
      </section>
    </main>
  );
}
