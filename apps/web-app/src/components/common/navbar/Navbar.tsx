import styles from "./navbar.module.css";
import "../../../styles/globals.css";
import { Binoculars, House, Luggage, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <button className={`${styles.button} ${styles.navButton}`}>
          <div>
            <House size={26} strokeWidth={1.75} />
          </div>
          <span>Home</span>
        </button>
        <button className={`${styles.button} ${styles.navButton}`}>
          <div>
            <Binoculars size={25} strokeWidth={1.75} />
          </div>
          <span>Explore</span>
        </button>
      </div>
      <div className={styles.navbarRight}>
        <form className={styles.searchbar}>
          <input type="text" />
          <button className={`${styles.button} ${styles.searchButton}`} type="submit">
            <Search size={24} strokeWidth={3} />
          </button>
        </form>
        <button className={`${styles.button} ${styles.accountButton}`}>
          <div>
            <Luggage size={44} strokeWidth={2} />
          </div>
        </button>
      </div>
    </nav>
  );
}
