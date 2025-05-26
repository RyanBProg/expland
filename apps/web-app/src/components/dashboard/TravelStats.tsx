import ProgressBar from "../common/ProgressBar";
import styles from "./travelStats.module.css";
import "../../styles/globals.css";

export default function TravelStats() {
  return (
    <section className={styles.stats}>
      <div className={styles.progressBox}>
        <ProgressBar val={35} maxVal={195} detail="/195" label="Countries visted" />
        <ProgressBar val={6} maxVal={7} detail="/7" label="Continents visited" />
      </div>
      <div className={styles.miniStatContainer}>
        <p className={styles.title}>Days Travelled</p>
        <div className={styles.miniStatBox}>
          <div className={styles.miniStat}>
            <p className={styles.label}>This Year</p>
            <p className={styles.stat}>{25}</p>
          </div>
          <div className={styles.miniStat}>
            <p className={styles.label}>Total</p>
            <p className={styles.stat}>{142}</p>
          </div>
        </div>
        <span className={styles.percentage}>+ 22%</span>
      </div>
    </section>
  );
}
