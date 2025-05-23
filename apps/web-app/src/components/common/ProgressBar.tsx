import styles from "./progressBar.module.css";
import "../../styles/globals.css";

type Props = {
  val: number;
  maxVal: number;
  detail: string;
  label: string;
};

export default function ProgressBar({ val, maxVal, detail, label }: Props) {
  const percentage = val / maxVal;
  const maxWidth = 240;
  const width = maxWidth * percentage;

  return (
    <div>
      <p className={styles.label}>{label}</p>
      <div className={styles.progress} style={{ width: maxWidth + 10 }}>
        <div className={styles.bar} style={{ width }}></div>
        <div className={styles.value}>
          {val}
          <span>{detail}</span>
        </div>
      </div>
    </div>
  );
}
